<template>
  <div>
    <FormWrapper :send-form-data="createHeadingType" class="create-heading-type-form">
      <InputField
        :field-title="'Name'"
        :field-name="`name`"
        :rule="'required'"
        :type="'text'"
        :placeholder="'Enter heading type name'">
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
  import {CREATE_HEADING_TYPE} from "../../../store/home/actions";

  export default {
    name: "create",
    layout: 'detail',
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField
    },
    methods: {
      async createHeadingType(data) {
        let response = await this.$store.dispatch(CREATE_HEADING_TYPE, data)
        if (response) {
          return this.$router.push({path: '/admin/heading-types'})
        }
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
