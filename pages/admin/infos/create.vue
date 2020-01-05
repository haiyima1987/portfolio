<template>
  <div>
    <FormWrapper :send-form-data="createInfo" class="create-info-form">
      <InputField
        :field-title="'Name'"
        :field-name="`key`"
        :rule="'required'"
        :type="'text'"
        :placeholder="'Enter information name'">
      </InputField>
      <InputField
        :field-title="'Content'"
        :field-name="`value`"
        :rule="'required'"
        :type="'text'"
        :placeholder="'Enter information content'">
      </InputField>
      <RadioGroup
        :field-title="'Category'"
        :field-name="'categoryId'"
        :options="infoTypeOptions"
        :rule="'required'">
      </RadioGroup>
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
  import {CREATE_INFO, GET_INFO_TYPES} from "../../../store/info/actions";
  import RadioGroup from "../../../components/form/RadioGroup";

  export default {
    name: "create",
    layout: 'detail',
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField, RadioGroup
    },
    data: () => ({
      infoTypeOptions: []
    }),
    methods: {
      async createInfo(data) {
        let response = await this.$store.dispatch(CREATE_INFO, data)
        if (response) {
          return this.$router.push({path: '/admin/infos'})
        }
      }
    },
    async asyncData({store}) {
      let response = await store.dispatch(GET_INFO_TYPES);
      if (response) {
        let infoTypeOptions = store.state.info.infoTypes.map(type => ({value: type.id, text: type.name}))
        return {infoTypeOptions}
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
