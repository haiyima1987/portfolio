<template>
  <div>
    <FormWrapper :send-form-data="createExperience" class="create-experience-form">
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
        :field-title="'Company'"
        :field-name="`company`"
        :rule="''"
        :type="'text'"
        :placeholder="'Enter your company'">
      </InputField>
      <InputField
        :field-title="'Position'"
        :field-name="`position`"
        :rule="'required'"
        :type="'text'"
        :placeholder="'Enter your position'">
      </InputField>
      <InputField
        :field-title="'City'"
        :field-name="`city`"
        :rule="''"
        :type="'text'"
        :placeholder="'Enter your city'">
      </InputField>
      <InputField
        :field-title="'Country'"
        :field-name="`country`"
        :rule="''"
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
        :placeholder="'Publish this experience?'">
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
  import {CREATE_EXPERIENCE} from "../../../store/resume/actions";
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
      async createExperience(data) {
        let response = await this.$store.dispatch(CREATE_EXPERIENCE, data)
        if (response) {
          return this.$router.push({path: '/admin/experiences'})
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .published-wrapper {
    margin-bottom: 1rem;
  }
</style>
