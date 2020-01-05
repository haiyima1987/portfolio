<template>
  <div>
    <FormWrapper :send-form-data="editEducation" class="edit-education-form">
      <DateField
        :field-title="'Start date'"
        :field-name="`start`"
        :minimum-view="'month'"
        :value="education.start"
        :required="true">
      </DateField>
      <DateField
        :field-title="'End date'"
        :field-name="`end`"
        :value="education.end"
        :minimum-view="'month'">
      </DateField>
      <InputField
        :field-title="'College'"
        :field-name="`college`"
        :rule="'required'"
        :type="'text'"
        :value="education.college"
        :placeholder="'Enter your college'">
      </InputField>
      <InputField
        :field-title="'Major'"
        :field-name="`major`"
        :rule="'required'"
        :type="'text'"
        :value="education.major"
        :placeholder="'Enter your major'">
      </InputField>
      <InputField
        :field-title="'City'"
        :field-name="`city`"
        :rule="'required'"
        :type="'text'"
        :value="education.city"
        :placeholder="'Enter your city'">
      </InputField>
      <InputField
        :field-title="'Country'"
        :field-name="`country`"
        :rule="'required'"
        :type="'text'"
        :value="education.country"
        :placeholder="'Enter your country'">
      </InputField>
      <InputField
        :field-title="'Explanation'"
        :field-name="`explanation`"
        :rule="''"
        :type="'text'"
        :value="education.explanation"
        :placeholder="'Enter your explanation'">
      </InputField>
      <CheckField
        class="published-wrapper"
        :field-title="'Published'"
        :field-name="`published`"
        :is-value-numeric="true"
        :value="education.published"
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
  import {mapGetters} from "vuex";
  import FormWrapper from "../../../../components/form/FormWrapper";
  import InputField from "../../../../components/form/InputField";
  import CheckField from "../../../../components/form/CheckField";
  import DateField from "../../../../components/form/DateField";
  import {GET_EDUCATION_BY_ID, UPDATE_EDUCATION} from "../../../../store/resume/actions";

  export default {
    name: 'edit',
    layout: 'detail',
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField, CheckField, DateField
    },
    computed: {
      ...mapGetters('resume', {
        education: 'getSelectedEducation'
      })
    },
    methods: {
      async editEducation(data) {
        data.id = this.education.id
        let response = await this.$store.dispatch(UPDATE_EDUCATION, data)
        if (response) {
          return this.$router.push({path: '/admin/educations'})
        }
      }
    },
    async asyncData({store, params}) {
      await store.dispatch(GET_EDUCATION_BY_ID, params.id);
    }
  }
</script>

<style scoped>
</style>
