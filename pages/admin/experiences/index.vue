<template>
  <div class="experience-list-wrapper">
    <div class="title-wrapper">
      <h4 class="title-page">My experiences</h4>
      <nuxt-link to="/admin/experiences/create" class="button button-green">
        <font-awesome-icon :icon="['fa', 'plus']"/>
      </nuxt-link>
    </div>
    <FormWrapper :send-form-data="updateExperiences" class="update-experience-form">
      <DragList :drag-items="domExperiences"
                :header-height="60"
                :on-edit-click="editExperience"
                :on-delete-click="showDeleteModal">
        <template v-slot:item="{ item }">
          <h5 class="title-item">{{ item.experience.position }}</h5>
          <div class="text-item">
            {{ formatDate(item.experience.start) }}&nbsp;&nbsp;to&nbsp;&nbsp;{{ formatDate(item.experience.end) }}
          </div>
          <div class="text-item">{{ item.experience.company }}</div>
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
  import DomExperience from "../../../models/dom/DomExperience";
  import {RESET_MODAL_DATA, SET_MODAL_DATA} from "../../../store/mutations";
  import DynamicModal from "../../../components/element/DynamicModal";
  import DragList from "../../../components/element/DragList";
  import {DELETE_EXPERIENCE, GET_EXPERIENCES, UPDATE_EXPERIENCE_DISPLAY_INDEX} from "../../../store/resume/actions";
  import {SHORT_MONTHS} from "../../../utils/DomHandler";

  export default {
    name: 'index',
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField, NumberField, DragList, DynamicModal
    },
    data: () => ({
      domExperiences: []
    }),
    computed: {
      ...mapGetters('admin', {
        experiences: 'getExperiences'
      })
    },
    methods: {
      async updateExperiences() {
        // update display indexes
        let updatedExperiences = this.domExperiences.map((domExperience, index) => ({
          id: domExperience.id,
          displayIndex: index + 1
        }))
        // send request
        await this.$store.dispatch(UPDATE_EXPERIENCE_DISPLAY_INDEX, updatedExperiences)
      },
      editExperience: function (id) {
        return this.$router.push({path: `/admin/experiences/edit/${id}`})
      },
      showDeleteModal: function (id) {
        this.$store.commit(SET_MODAL_DATA, {
          modalContent: 'experience',
          data: id,
          callback: this.deleteExperience
        })
      },
      async deleteExperience(id) {
        let experiences = await this.$store.dispatch(DELETE_EXPERIENCE, id)
        if (experiences) {
          // update local experiences
          this.domExperiences = experiences.map(experience => new DomExperience(experience.id, experience))
          // close the modal and reset the options
          this.$store.commit(RESET_MODAL_DATA)
        }
      },
      formatDate: function (date) {
        if (!date) {
          return 'present'
        }
        let temp = new Date(date)
        let year = temp.getFullYear()
        let month = temp.getMonth()
        return `${SHORT_MONTHS[month]} - ${year}`
      }
    },
    async asyncData({store}) {
      let experiences = await store.dispatch(GET_EXPERIENCES);
      if (experiences) {
        return {domExperiences: experiences.map(experience => new DomExperience(experience.id, experience))}
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
