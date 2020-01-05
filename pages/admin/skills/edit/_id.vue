<template>
  <div>
    <FormWrapper :send-form-data="updateSkill" class="edit-skill-form">
      <InputField
        class="name-wrapper"
        :field-title="''"
        :field-name="`name`"
        :rule="'required'"
        :type="'text'"
        :value="skill.name"
        :placeholder="'Enter your skill'">
      </InputField>
      <NumberField
        class="level-wrapper"
        :field-title="''"
        :field-width="'150px'"
        :field-name="`level`"
        :rule="'required'"
        :value="skill.level"
        :min="0"
        :max="100"
        :placeholder="'Level'">
      </NumberField>
      <RadioGroup
        :field-title="'Scope'"
        :field-name="'scopeId'"
        :options="scopeOptions"
        :value="skill.scopeId"
        :rule="'required'">
      </RadioGroup>
      <div class="button-submit-wrapper">
        <button type="submit" class="button-green button-save">
          SAVE
        </button>
      </div>
    </FormWrapper>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import FormWrapper from "../../../../components/form/FormWrapper";
  import InputField from "../../../../components/form/InputField";
  import NumberField from "../../../../components/form/NumberField";
  import RadioGroup from "../../../../components/form/RadioGroup";
  import {GET_SKILL_BY_ID, UPDATE_SKILL} from "../../../../store/admin/actions";

  export default {
    name: "edit",
    layout: 'detail',
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField, NumberField, RadioGroup
    },
    data: () => ({
      scopeOptions: []
    }),
    computed: {
      ...mapGetters('admin', {
        skill: 'getSelectedSkill'
      })
    },
    methods: {
      async updateSkill(data) {
        data.id = this.skill.id
        let response = await this.$store.dispatch(UPDATE_SKILL, data)
        if (response) {
          return this.$router.push({path: '/admin/skills'})
        }
      }
    },
    async asyncData({store, params}) {
      let response = await store.dispatch(GET_SKILL_BY_ID, params.id);
      if (response) {
        let scopeOptions = store.state.admin.scopes.map(scope => ({value: scope.id, text: scope.name}))
        return {scopeOptions}
      }
    }
  }
</script>

<style scoped>
</style>
