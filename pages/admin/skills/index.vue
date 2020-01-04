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
                :on-delete-click="showDeleteModal">
        <template v-slot:item="{ item }">
          <div class="input-wrapper">
            <InputField
              class="name-wrapper"
              :field-title="''"
              :field-name="`name-${item.id}`"
              :rule="'required'"
              :type="'text'"
              :value="item.skill.name"
              :placeholder="'Enter your skill'">
            </InputField>
            <NumberField
              class="level-wrapper"
              :field-title="''"
              :field-width="'150px'"
              :field-name="`level-${item.id}`"
              :rule="'required'"
              :value="item.skill.level"
              :min="0"
              :max="100"
              :placeholder="'Level'">
            </NumberField>
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
  import {DELETE_SKILL, GET_SKILLS, UPDATE_SKILLS} from "../../../store/admin/actions";
  import InputField from "../../../components/form/InputField";
  import FormWrapper from "../../../components/form/FormWrapper";
  import NumberField from "../../../components/form/NumberField";
  import DomSkill from "../../../models/DomSkill";
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
        let updatedSkills = this.domSkills.map((domSkill, index) => {
          // assign a new object to avoid mutating outside vuex store
          let skill = Object.assign({}, domSkill.skill)
          skill.name = data[`name-${skill.id}`]
          skill.level = data[`level-${skill.id}`]
          skill.displayIndex = index + 1
          return skill
        })
        // send request
        let skills = await this.$store.dispatch(UPDATE_SKILLS, updatedSkills)
        if (skills) {
          // update local skills
          this.domSkills = skills.map(skill => new DomSkill(skill.id, skill))
        }
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

  .title-wrapper {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }

  .title-page {
    margin: 0;
    flex-grow: 1;
  }

  .input-wrapper {
    display: flex;
    align-items: center;
  }

  .name-wrapper {
    margin: 0;
  }

  .level-wrapper {
    margin: 0 0 0 15px;
  }
</style>
