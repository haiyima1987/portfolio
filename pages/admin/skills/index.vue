<template>
  <div class="skill-list-wrapper">
    <div class="title-wrapper">
      <h4 class="title-page">My skills</h4>
      <nuxt-link to="/admin/skills/create" class="button button-green">
        <font-awesome-icon :icon="['fa', 'plus']"/>
      </nuxt-link>
    </div>
    <FormWrapper :send-form-data="updateSkills" class="update-skill-form">
      <DragList :drag-items="domSkills"
                :header-height="60"
                :on-edit-click="editSkill"
                :on-delete-click="showDeleteModal">
        <template v-slot:item="{ item }">
          <h5 class="title-item">{{ item.skill.name }}</h5>
          <div v-if="item.skill.projects.length > 0" class="tag-wrapper">
            <div class="tag" v-for="project in item.skill.projects" :key="project.id">
              {{ project.name }}
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
  import {DELETE_SKILL, GET_SKILLS, UPDATE_SKILL_DISPLAY_INDEX} from "../../../store/admin/actions";
  import InputField from "../../../components/form/InputField";
  import FormWrapper from "../../../components/form/FormWrapper";
  import NumberField from "../../../components/form/NumberField";
  import DomSkill from "../../../models/dom/DomSkill";
  import {RESET_MODAL_DATA, SET_MODAL_DATA} from "../../../store/mutations";
  import DynamicModal from "../../../components/element/DynamicModal";
  import DragList from "../../../components/element/DragList";

  export default {
    name: 'index',
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField, NumberField, DragList, DynamicModal
    },
    data: () => ({
      domSkills: []
    }),
    computed: {
      ...mapGetters('admin', {
        skills: 'getSkills'
      })
    },
    methods: {
      async updateSkills(data) {
        // update display indexes
        let updatedSkills = this.domSkills.map((domSkill, index) => ({id: domSkill.id, displayIndex: index + 1}))
        // send request
        await this.$store.dispatch(UPDATE_SKILL_DISPLAY_INDEX, updatedSkills)
      },
      editSkill: function (id) {
        return this.$router.push({path: `/admin/skills/edit/${id}`})
      },
      showDeleteModal: function (id) {
        this.$store.commit(SET_MODAL_DATA, {
          modalContent: 'skill',
          data: id,
          callback: this.deleteSkill
        })
      },
      async deleteSkill(id) {
        let skills = await this.$store.dispatch(DELETE_SKILL, id)
        if (skills) {
          // update local skills
          this.domSkills = skills.map(skill => new DomSkill(skill.id, skill))
          // close the modal and reset the options
          this.$store.commit(RESET_MODAL_DATA)
        }
      }
    },
    async asyncData({store}) {
      let skills = await store.dispatch(GET_SKILLS);
      if (skills) {
        return {domSkills: skills.map(skill => new DomSkill(skill.id, skill))}
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

  /* tags */
  .tag-wrapper {
    padding: 5px 0 10px 0;
  }

  .tag {
    margin: 0 8px 4px 0;
    padding: 2px 8px;
    display: inline-block;
    background-color: $green-main-1;
    color: white;
    @include border-radius(4px);
    font-size: 0.8rem;
    font-weight: 600;
  }
</style>
