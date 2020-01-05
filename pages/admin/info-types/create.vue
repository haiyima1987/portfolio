<template>
  <div>
    <FormWrapper :send-form-data="createInfoType" class="create-info-type-form">
      <InputField
        :field-title="'Name'"
        :field-name="`name`"
        :rule="'required'"
        :type="'text'"
        :placeholder="'Enter information type name'">
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
  import {CREATE_INFO_TYPE} from "../../../store/info/actions";

  export default {
    name: "create",
    layout: 'detail',
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField
    },
    methods: {
      async createInfoType(data) {
        let response = await this.$store.dispatch(CREATE_INFO_TYPE, data)
        if (response) {
          return this.$router.push({path: '/admin/info-types'})
        }
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
