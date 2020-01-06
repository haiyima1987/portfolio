<template>
  <div>
    <div class="title-wrapper">
      <h4 class="title-page">My projects</h4>
      <nuxt-link to="/admin/projects/create" class="button button-green">
        <font-awesome-icon :icon="['fa', 'plus']"/>
      </nuxt-link>
    </div>
    <FormWrapper :send-form-data="updateDisplayIndex" class="project-list-form">
      <DragList :drag-items="domProjects"
                :header-height="60"
                :on-edit-click="editProject"
                :on-delete-click="showDeleteModal">
        <template v-slot:item="{ item }">
          <h5 class="title-item">{{ item.project.name }}</h5>
          <p class="text-project">Year {{ item.project.year }}</p>
          <p class="text-project">{{ item.project.link }}</p>
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
  import {DELETE_PROJECT, GET_PROJECTS, UPDATE_PROJECT_DISPLAY_INDEX} from "../../../store/admin/actions";
  import {RESET_MODAL_DATA, SET_MODAL_DATA} from "../../../store/mutations";
  import DynamicModal from "../../../components/element/DynamicModal";
  import DragList from "../../../components/element/DragList";
  import DomProject from "../../../models/dom/DomProject";
  import FormWrapper from "../../../components/form/FormWrapper";

  export default {
    name: 'create',
    middleware: 'authenticated',
    components: {
      DragList, FormWrapper, DynamicModal
    },
    data: () => ({
      domProjects: []
    }),
    computed: {
      ...mapGetters('admin', {
        projects: 'getProjects'
      })
    },
    methods: {
      async updateDisplayIndex () {
        // update display indexes
        let updatedIndexes = this.domProjects.map((domProject, index) => ({id: domProject.id, displayIndex: index + 1}))
        // send request
        await this.$store.dispatch(UPDATE_PROJECT_DISPLAY_INDEX, updatedIndexes)
      },
      editProject: function (id) {
        return this.$router.push({path: `/admin/projects/edit/${id}`})
      },
      showDeleteModal: function (id) {
        this.$store.commit(SET_MODAL_DATA, {
          modalContent: 'project',
          data: id,
          callback: this.deleteProject
        })
      },
      async deleteProject(id) {
        let projects = await this.$store.dispatch(DELETE_PROJECT, id)
        if (projects) {
          // close the modal and reset the options
          this.$store.commit(RESET_MODAL_DATA)
        }
      }
    },
    async asyncData({store}) {
      let projects = await store.dispatch(GET_PROJECTS);
      if (projects) {
        return {domProjects: projects.map(project => new DomProject(project.id, project))}
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

  .item-project {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }

  .title-item {
    font-weight: bold;
  }

  .text-project {
    margin-bottom: 5px;
  }

  /* buttons */
  .button {
    display: flex;
    align-items: center;
  }

  .button-wrapper {
    padding-left: 15px;
    display: flex;
    justify-content: flex-end;
  }
</style>
