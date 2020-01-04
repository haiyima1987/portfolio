<template>
  <div>
    <FormWrapper :send-form-data="createSkill" class="update-skill-form">
      <InputField
        class="name-wrapper"
        :field-title="'Name'"
        :field-name="`name`"
        :rule="'required'"
        :type="'text'"
        :placeholder="'Enter your skill'">
      </InputField>
      <NumberField
        class="level-wrapper"
        :field-title="'Level'"
        :field-width="'150px'"
        :field-name="`level`"
        :rule="'required'"
        :min="0"
        :max="100"
        :placeholder="'Level'">
      </NumberField>
      <RadioGroup
        :field-title="'Scope'"
        :field-name="'scopeId'"
        :options="scopeOptions"
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
  import FormWrapper from "../../../components/form/FormWrapper";
  import InputField from "../../../components/form/InputField";
  import NumberField from "../../../components/form/NumberField";
  import {CREATE_SKILL, GET_SCOPES} from "../../../store/admin/actions";
  import RadioGroup from "../../../components/form/RadioGroup";

  export default {
    name: "create",
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField, NumberField, RadioGroup
    },
    data: () => ({
      scopeOptions: []
    }),
    methods: {
      async createSkill(data) {
        let response = await this.$store.dispatch(CREATE_SKILL, data)
        if (response) {
          return this.$router.push({path: '/admin/skills'})
        }
      }
    },
    async asyncData({store}) {
      let scopes = await store.dispatch(GET_SCOPES);
      if (scopes) {
        return {
          scopeOptions: scopes.map(scope => ({
            value: scope.id,
            text: scope.name
          }))
        }
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
