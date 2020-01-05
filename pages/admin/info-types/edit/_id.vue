<template>
  <div>
    <FormWrapper :send-form-data="editInfoType" class="edit-info-type-form">
      <InputField
        :field-title="'Name'"
        :field-name="`name`"
        :rule="'required'"
        :type="'text'"
        :value="infoType.name"
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
  import {mapGetters} from "vuex";
  import FormWrapper from "../../../../components/form/FormWrapper";
  import InputField from "../../../../components/form/InputField";
  import {GET_INFO_TYPE_BY_ID, UPDATE_INFO_TYPE} from "../../../../store/info/actions";

  export default {
    name: "edit",
    layout: 'detail',
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField
    },
    computed: {
      ...mapGetters('info', {
        infoType: 'getSelectedInfoType'
      })
    },
    methods: {
      async editInfoType(data) {
        data.id = this.infoType.id
        console.log(data)
        let response = await this.$store.dispatch(UPDATE_INFO_TYPE, data)
        if (response) {
          return this.$router.push({path: '/admin/info-types'})
        }
      }
    },
    async asyncData({store, params}) {
      await store.dispatch(GET_INFO_TYPE_BY_ID, params.id);
    }
  }
</script>

<style scoped lang="scss">
</style>
