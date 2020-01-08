<template>
  <div>
    <FormWrapper :send-form-data="editInfo" class="edit-info-form">
      <InputField
        :field-title="'Name'"
        :field-name="`key`"
        :rule="''"
        :type="'text'"
        :value="info.key"
        :placeholder="'Enter information name'">
      </InputField>
      <InputField
        :field-title="'Content'"
        :field-name="`value`"
        :rule="'required'"
        :type="'text'"
        :value="info.value"
        :placeholder="'Enter information content'">
      </InputField>
      <RadioGroup
        :field-title="'Information type'"
        :field-name="'infoTypeId'"
        :options="infoTypeOptions"
        :value="info.infoTypeId"
        :rule="'required'">
      </RadioGroup>
      <CheckField
        class="published-wrapper"
        :field-title="'Published'"
        :field-name="`published`"
        :value="info.published"
        :placeholder="'Publish this information?'">
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
  import {GET_INFO_BY_ID, UPDATE_INFO} from "../../../../store/info/actions";
  import RadioGroup from "../../../../components/form/RadioGroup";
  import CheckField from "../../../../components/form/CheckField";

  export default {
    name: "edit",
    layout: 'detail',
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField, RadioGroup, CheckField
    },
    data: () => ({
      infoTypeOptions: []
    }),
    computed: {
      ...mapGetters('info', {
        info: 'getSelectedInfo'
      })
    },
    methods: {
      async editInfo(data) {
        data.id = this.info.id
        let response = await this.$store.dispatch(UPDATE_INFO, data)
        if (response) {
          return this.$router.push({path: '/admin/infos'})
        }
      }
    },
    async asyncData({store, params}) {
      let response = await store.dispatch(GET_INFO_BY_ID, params.id);
      if (response) {
        let infoTypeOptions = store.state.info.infoTypes.map(type => ({value: type.id, text: type.name}))
        return {infoTypeOptions}
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
