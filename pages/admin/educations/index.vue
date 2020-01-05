<template>
  <div class="education-list-wrapper">
    <div class="title-wrapper">
      <h4 class="title-page">My educations</h4>
      <nuxt-link to="/admin/educations/create" class="button button-green">
        <font-awesome-icon :icon="['fa', 'plus']"/>
      </nuxt-link>
    </div>
    <FormWrapper :send-form-data="updateEducations" class="update-education-form">
      <DragList :drag-items="domEducations"
                :header-height="60"
                :on-edit-click="editEducation"
                :on-delete-click="showDeleteModal">
        <template v-slot:item="{ item }">
          <h5 class="title-item">{{ item.education.major }}</h5>
          <div class="text-item">
            {{ formatDate(item.education.start) }}&nbsp;&nbsp;to&nbsp;&nbsp;{{ formatDate(item.education.end) }}
          </div>
          <div class="text-item">{{ item.education.college }}</div>
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
  import DomEducation from "../../../models/DomEducation";
  import {RESET_MODAL_DATA, SET_MODAL_DATA} from "../../../store/mutations";
  import DynamicModal from "../../../components/element/DynamicModal";
  import DragList from "../../../components/element/DragList";
  import {DELETE_EDUCATION, GET_EDUCATIONS, UPDATE_EDUCATION_DISPLAY_INDEX} from "../../../store/resume/actions";
  import {SHORT_MONTHS} from "../../../utils/DomHandler";

  export default {
    name: 'index',
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField, NumberField, DragList, DynamicModal
    },
    data: () => ({
      domEducations: []
    }),
    computed: {
      ...mapGetters('admin', {
        educations: 'getEducations'
      })
    },
    methods: {
      async updateEducations() {
        // update display indexes
        let updatedEducations = this.domEducations.map((domEducation, index) => ({
          id: domEducation.id,
          displayIndex: index + 1
        }))
        // send request
        await this.$store.dispatch(UPDATE_EDUCATION_DISPLAY_INDEX, updatedEducations)
      },
      editEducation: function (id) {
        return this.$router.push({path: `/admin/educations/edit/${id}`})
      },
      showDeleteModal: function (id) {
        this.$store.commit(SET_MODAL_DATA, {
          modalContent: 'education',
          data: id,
          callback: this.deleteEducation
        })
      },
      async deleteEducation(id) {
        let educations = await this.$store.dispatch(DELETE_EDUCATION, id)
        if (educations) {
          // update local educations
          this.domEducations = educations.map(education => new DomEducation(education.id, education))
          // close the modal and reset the options
          this.$store.commit(RESET_MODAL_DATA)
        }
      },
      formatDate: function (date) {
        let temp = new Date(date)
        let year = temp.getFullYear()
        let month = temp.getMonth()
        return `${SHORT_MONTHS[month]} - ${year}`
      }
    },
    async asyncData({store}) {
      let educations = await store.dispatch(GET_EDUCATIONS);
      if (educations) {
        return {domEducations: educations.map(education => new DomEducation(education.id, education))}
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
</style>
