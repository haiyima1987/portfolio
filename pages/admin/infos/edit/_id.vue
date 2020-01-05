<template>
  <div>
    <FormWrapper :send-form-data="editInfo" class="edit-info-form">
      <InputField
        :field-title="'Name'"
        :field-name="`key`"
        :rule="'required'"
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
        :field-title="'Category'"
        :field-name="'categoryId'"
        :options="infoTypeOptions"
        :value="info.infoTypeId"
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
  import {mapGetters} from "vuex";
  import FormWrapper from "../../../../components/form/FormWrapper";
  import InputField from "../../../../components/form/InputField";
  import {UPDATE_INFO, GET_INFO_BY_ID} from "../../../../store/info/actions";
  import RadioGroup from "../../../../components/form/RadioGroup";

  export default {
    name: "edit",
    layout: 'detail',
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField, RadioGroup
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
