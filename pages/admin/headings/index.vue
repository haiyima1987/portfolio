<template>
  <div class="heading-list-wrapper">
    <div class="title-wrapper">
      <h4 class="title-page">Home headings</h4>
      <nuxt-link to="/admin/headings/create" class="button button-green">
        <font-awesome-icon :icon="['fa', 'plus']"/>
      </nuxt-link>
    </div>
    <FormWrapper :send-form-data="updateHeadings" class="update-heading-form">
      <div v-for="(dataItem, index) in headingData" class="heading-data-wrapper">
        <button @click="showSelectedHeadingType(index)"
                type="button" class="button button-blue button-heading-type">
          {{ dataItem.name }}
        </button>
        <DragList v-if="index == selectedIndex && dataItem.headings.length > 0"
                  :drag-items="dataItem.headings"
                  :header-height="60"
                  :on-edit-click="editHeading"
                  :on-delete-click="showDeleteModal">
          <template v-slot:item="{ item }">
            <h5 class="title-item">{{ item.heading.title }}</h5>
            <div class="text-item">{{ item.heading.text }}</div>
          </template>
          <template v-slot:buttonUp>
            <button type="button" class="button-mobile button-blue">
              <font-awesome-icon :icon="['fa', 'arrow-up']"/>
            </button>
          </template>
          <template v-slot:buttonDown>
            <button type="button" class="button-mobile button-blue">
              <font-awesome-icon :icon="['fa', 'arrow-down']"/>
            </button>
          </template>
          <template v-slot:buttonDrag>
            <button type="button" class="button button-blue">
              <font-awesome-icon :icon="['fas', 'arrows-alt']"/>
            </button>
          </template>
          <template v-slot:buttonEdit>
            <button type="button" class="button button-green">
              <font-awesome-icon :icon="['fas', 'edit']"/>
            </button>
          </template>
          <template v-slot:buttonDelete>
            <button type="button" class="button button-red">
              <font-awesome-icon :icon="['fas', 'trash-alt']"/>
            </button>
          </template>
        </DragList>
        <div v-else-if="index == selectedIndex && dataItem.headings.length == 0"
             class="text-no-info">
          No information here
        </div>
      </div>
      <div class="button-submit-wrapper">
        <button type="submit" class="button-green button-save">
          SAVE
        </button>
      </div>
    </FormWrapper>
    <DynamicModal/>
  </div>
</template>

<script>
  import InputField from "../../../components/form/InputField";
  import FormWrapper from "../../../components/form/FormWrapper";
  import NumberField from "../../../components/form/NumberField";
  import DomHeading from "../../../models/dom/DomHeading";
  import {RESET_MODAL_DATA, SET_MODAL_DATA} from "../../../store/mutations";
  import DynamicModal from "../../../components/element/DynamicModal";
  import DragList from "../../../components/element/DragList";
  import {DELETE_HEADING, GET_HEADINGS, UPDATE_HEADING_DISPLAY_INDEX} from "../../../store/home/actions";

  export default {
    name: 'index',
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField, NumberField, DragList, DynamicModal
    },
    data: () => ({
      headingData: [],
      selectedIndex: 0
    }),
    methods: {
      showSelectedHeadingType: function (index) {
        this.selectedIndex = index
      },
      async updateHeadings() {
        // update display indexes
        let updatedHeadings = this.headingData[this.selectedIndex].headings.map((domHeading, index) => ({
          id: domHeading.id,
          displayIndex: index + 1
        }))
        // send request
        await this.$store.dispatch(UPDATE_HEADING_DISPLAY_INDEX, updatedHeadings)
      },
      editHeading: function (id) {
        return this.$router.push({path: `/admin/headings/edit/${id}`})
      },
      showDeleteModal: function (id) {
        this.$store.commit(SET_MODAL_DATA, {
          modalContent: 'heading',
          data: id,
          callback: this.deleteHeading
        })
      },
      async deleteHeading(id) {
        let response = await this.$store.dispatch(DELETE_HEADING, id)
        if (response) {
          // update local headings
          this.headingData[this.selectedIndex].headings = this.headingData[this.selectedIndex].headings
            .filter(domHeading => domHeading.id != id)
          // close the modal and reset the options
          this.$store.commit(RESET_MODAL_DATA)
        }
      }
    },
    async asyncData({store}) {
      let headingTypes = await store.dispatch(GET_HEADINGS);
      if (headingTypes) {
        let headingData = headingTypes.map(data => ({
          name: data.name,
          headings: data.headings.map(heading => new DomHeading(heading.id, heading))
        }))
        return {headingData}
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/base.variables";
  @import "../../../assets/css/base.mixins";

  .title-page {
    margin: 0;
    flex-grow: 1;
  }

  .title-item {
    font-weight: bold;
  }

  .text-item {
    margin-bottom: 5px;
  }

  .button-heading-type {
    margin: 10px 0;
    width: 100%;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .text-no-info {
    margin-bottom: 10px;
    padding-left: 15px;
    color: $red-main;
    font-weight: bold;
  }
</style>
