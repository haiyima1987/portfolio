<template>
  <div>
    <FormWrapper :send-form-data="createHeading" class="create-heading-form">
      <InputField
        :field-title="'Name'"
        :field-name="`title`"
        :rule="''"
        :type="'text'"
        :placeholder="'Enter heading name'">
      </InputField>
      <TextField
        :field-title="'Content'"
        :field-name="`text`"
        :rule="''"
        :type="'text'"
        :placeholder="'Enter heading content'">
      </TextField>
      <RadioGroup
        :field-title="'Heading type'"
        :field-name="'headingTypeId'"
        :options="headingTypeOptions"
        :rule="'required'">
      </RadioGroup>
      <CheckField
        class="published-wrapper"
        :field-title="'Published'"
        :field-name="`published`"
        :placeholder="'Publish this heading?'">
      </CheckField>
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
  import {CREATE_HEADING, GET_HEADING_TYPES} from "../../../store/home/actions";
  import RadioGroup from "../../../components/form/RadioGroup";
  import CheckField from "../../../components/form/CheckField";
  import TextField from "../../../components/form/TextField";

  export default {
    name: "create",
    layout: 'detail',
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField, TextField, RadioGroup, CheckField
    },
    data: () => ({
      headingTypeOptions: []
    }),
    methods: {
      async createHeading(data) {
        let response = await this.$store.dispatch(CREATE_HEADING, data)
        if (response) {
          return this.$router.push({path: '/admin/headings'})
        }
      }
    },
    async asyncData({store}) {
      let response = await store.dispatch(GET_HEADING_TYPES);
      if (response) {
        let headingTypeOptions = store.state.home.headingTypes.map(type => ({value: type.id, text: type.name}))
        return {headingTypeOptions}
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
