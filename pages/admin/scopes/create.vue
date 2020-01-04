<template>
  <div>
    <FormWrapper :send-form-data="createScope" class="create-scope-form">
      <InputField
        class="name-wrapper"
        :field-title="'Name'"
        :field-name="`name`"
        :rule="'required'"
        :type="'text'"
        :placeholder="'Enter scope skill'">
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
  import {CREATE_SCOPE} from "../../../store/admin/actions";

  export default {
    name: "create",
    components: {
      FormWrapper, InputField
    },
    methods: {
      async createScope(data) {
        let response = await this.$store.dispatch(CREATE_SCOPE, data)
        if (response) {
          return this.$router.push({path: '/admin/scopes'})
        }
      }
    }
  }
</script>

<style scoped>
</style>
