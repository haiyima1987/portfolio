<template>
  <div>
    <FormWrapper :send-form-data="editExperience" class="edit-experience-form">
      <DateField
        :field-title="'Start date'"
        :field-name="`start`"
        :minimum-view="'month'"
        :placeholder="'MM/YYYY'"
        :value="experience.start"
        :required="true">
      </DateField>
      <DateField
        :field-title="'End date'"
        :field-name="`end`"
        :placeholder="'MM/YYYY'"
        :value="experience.end"
        :minimum-view="'month'">
      </DateField>
      <InputField
        :field-title="'Company'"
        :field-name="`company`"
        :rule="''"
        :type="'text'"
        :value="experience.company"
        :placeholder="'Enter your company'">
      </InputField>
      <InputField
        :field-title="'Position'"
        :field-name="`position`"
        :rule="'required'"
        :type="'text'"
        :value="experience.position"
        :placeholder="'Enter your position'">
      </InputField>
      <InputField
        :field-title="'City'"
        :field-name="`city`"
        :rule="''"
        :type="'text'"
        :value="experience.city"
        :placeholder="'Enter your city'">
      </InputField>
      <InputField
        :field-title="'Country'"
        :field-name="`country`"
        :rule="''"
        :type="'text'"
        :value="experience.country"
        :placeholder="'Enter your country'">
      </InputField>
      <InputField
        :field-title="'Explanation'"
        :field-name="`explanation`"
        :rule="''"
        :type="'text'"
        :value="experience.explanation"
        :placeholder="'Enter your explanation'">
      </InputField>
      <CheckField
        class="published-wrapper"
        :field-title="'Published'"
        :field-name="`published`"
        :value="experience.published"
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
  import {mapGetters} from "vuex";
  import FormWrapper from "../../../../components/form/FormWrapper";
  import InputField from "../../../../components/form/InputField";
  import CheckField from "../../../../components/form/CheckField";
  import DateField from "../../../../components/form/DateField";
  import {GET_EXPERIENCE_BY_ID, UPDATE_EXPERIENCE} from "../../../../store/resume/actions";

  export default {
    name: 'edit',
    layout: 'detail',
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField, CheckField, DateField
    },
    computed: {
      ...mapGetters('resume', {
        experience: 'getSelectedExperience'
      })
    },
    methods: {
      async editExperience(data) {
        data.id = this.experience.id
        let response = await this.$store.dispatch(UPDATE_EXPERIENCE, data)
        if (response) {
          return this.$router.push({path: '/admin/experiences'})
        }
      }
    },
    async asyncData({store, params}) {
      await store.dispatch(GET_EXPERIENCE_BY_ID, params.id);
    }
  }
</script>

<style scoped>
</style>
