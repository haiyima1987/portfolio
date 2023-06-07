<template>
  <div>
    <FormWrapper :send-form-data="createEducation" class="create-education-form">
      <DateField
        :field-title="'Start date'"
        :field-name="`start`"
        :minimum-view="'month'"
        :placeholder="'MM/YYYY'"
        :required="true">
      </DateField>
      <DateField
        :field-title="'End date'"
        :field-name="`end`"
        :placeholder="'MM/YYYY'"
        :minimum-view="'month'">
      </DateField>
      <InputField
        :field-title="'College'"
        :field-name="`college`"
        :rule="'required'"
        :type="'text'"
        :placeholder="'Enter your college'">
      </InputField>
      <InputField
        :field-title="'Major'"
        :field-name="`major`"
        :rule="'required'"
        :type="'text'"
        :placeholder="'Enter your major'">
      </InputField>
      <InputField
        :field-title="'City'"
        :field-name="`city`"
        :rule="'required'"
        :type="'text'"
        :placeholder="'Enter your city'">
      </InputField>
      <InputField
        :field-title="'Country'"
        :field-name="`country`"
        :rule="'required'"
        :type="'text'"
        :placeholder="'Enter your country'">
      </InputField>
      <TextField
        :field-title="'Explanation'"
        :field-name="'explanation'"
        :rule="''"
        :placeholder="'Enter your explanation'">
      </TextField>
      <CheckField
        class="published-wrapper"
        :field-title="'Published'"
        :field-name="`published`"
        :placeholder="'Publish this education?'">
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
  import CheckField from "../../../components/form/CheckField";
  import {CREATE_EDUCATION} from "../../../store/resume/actions";
  import DateField from "../../../components/form/DateField";
  import TextField from "../../../components/form/TextField";

  export default {
    name: "create",
    layout: 'detail',
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField, CheckField, DateField, TextField
    },
    methods: {
      async createEducation(data) {
        let response = await this.$store.dispatch(CREATE_EDUCATION, data)
        if (response) {
          return this.$router.push({path: '/admin/educations'})
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .published-wrapper {
    margin-bottom: 2.6rem;
  }
</style>
