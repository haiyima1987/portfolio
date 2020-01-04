<template>
  <div>
    <FormWrapper :send-form-data="createCategory" class="create-category-form">
      <InputField
        class="name-wrapper"
        :field-title="'Name'"
        :field-name="`name`"
        :rule="'required'"
        :type="'text'"
        :placeholder="'Enter your category'">
      </InputField>
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
  import {CREATE_CATEGORY} from "../../../store/admin/actions";

  export default {
    name: "create",
    components: {
      FormWrapper, InputField
    },
    methods: {
      async createCategory(data) {
        let response = await this.$store.dispatch(CREATE_CATEGORY, data)
        if (response) {
          return this.$router.push({path: '/admin/categories'})
        }
      }
    }
  }
</script>

<style scoped>
</style>
