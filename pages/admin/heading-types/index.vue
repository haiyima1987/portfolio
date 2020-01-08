<template>
  <div class="heading-type-list-wrapper">
    <div class="title-wrapper">
      <h4 class="title-page">Information types</h4>
      <nuxt-link to="/admin/heading-types/create" class="button button-green">
        <font-awesome-icon :icon="['fa', 'plus']"/>
      </nuxt-link>
    </div>
    <FormWrapper :send-form-data="updateHeadingTypes" class="update-heading-type-form">
      <DragList :drag-items="domHeadingTypes"
                :header-height="60"
                :on-edit-click="editHeadingType"
                :on-delete-click="showDeleteModal">
        <template v-slot:item="{ item }">
          <h5 class="title-item title-heading-type">{{ item.headingType.name }}</h5>
          <div class="heading-wrapper">
            <div v-for="heading in item.headingType.headings" :key="heading.id" class="heading">
              <template v-if="heading.title">
                <h5 class="title-item">{{ heading.title }}</h5>
                <div class="text-item">{{ heading.text }}</div>
              </template>
              <template v-else>
                <div class="text-item">{{ heading.text }}</div>
              </template>
            </div>
          </div>
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
  import {mapGetters} from "vuex";
  import InputField from "../../../components/form/InputField";
  import FormWrapper from "../../../components/form/FormWrapper";
  import NumberField from "../../../components/form/NumberField";
  import DomHeadingType from "../../../models/dom/DomHeadingType";
  import {RESET_MODAL_DATA, SET_MODAL_DATA} from "../../../store/mutations";
  import DynamicModal from "../../../components/element/DynamicModal";
  import DragList from "../../../components/element/DragList";
  import {DELETE_HEADING_TYPE, GET_HEADING_TYPES, UPDATE_HEADING_TYPE_DISPLAY_INDEX} from "../../../store/home/actions";

  export default {
    name: 'index',
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField, NumberField, DragList, DynamicModal
    },
    data: () => ({
      domHeadingTypes: []
    }),
    computed: {
      ...mapGetters('headingType', {
        headingTypes: 'getHeadingTypes'
      })
    },
    methods: {
      async updateHeadingTypes() {
        // update display indexes
        let updatedHeadingTypes = this.domHeadingTypes.map((domHeadingType, index) => ({
          id: domHeadingType.id,
          displayIndex: index + 1
        }))
        // send request
        await this.$store.dispatch(UPDATE_HEADING_TYPE_DISPLAY_INDEX, updatedHeadingTypes)
      },
      editHeadingType: function (id) {
        return this.$router.push({path: `/admin/heading-types/edit/${id}`})
      },
      showDeleteModal: function (id) {
        this.$store.commit(SET_MODAL_DATA, {
          modalContent: 'heading type',
          data: id,
          callback: this.deleteHeadingType
        })
      },
      async deleteHeadingType(id) {
        let headingTypes = await this.$store.dispatch(DELETE_HEADING_TYPE, id)
        if (headingTypes) {
          // update local headingTypes
          this.domHeadingTypes = headingTypes.map(headingType => new DomHeadingType(headingType.id, headingType))
          // close the modal and reset the options
          this.$store.commit(RESET_MODAL_DATA)
        }
      }
    },
    async asyncData({store}) {
      let headingTypes = await store.dispatch(GET_HEADING_TYPES);
      if (headingTypes) {
        return {domHeadingTypes: headingTypes.map(headingType => new DomHeadingType(headingType.id, headingType))}
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

  .title-heading-type {
    padding-left: 10px;
  }

  /* tags */
  .heading-wrapper {
    border-top: 2px solid $green-main;
    padding: 10px;
  }
</style>
