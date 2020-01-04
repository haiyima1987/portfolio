<template>
  <div>
    <FormWrapper :send-form-data="createType" class="create-type-form">
      <InputField
        class="name-wrapper"
        :field-title="'Name'"
        :field-name="`name`"
        :rule="'required'"
        :type="'text'"
        :placeholder="'Enter project type'">
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
  import {CREATE_TYPE} from "../../../store/admin/actions";

  export default {
    name: "create",
    components: {
      FormWrapper, InputField
    },
    methods: {
      async createType(data) {
        let response = await this.$store.dispatch(CREATE_TYPE, data)
        if (response) {
          return this.$router.push({path: '/admin/types'})
        }
      }
    }
  }
</script>

<style scoped>
</style>
