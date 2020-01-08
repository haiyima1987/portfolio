<template>
  <div>
    <FormWrapper :send-form-data="editHeadingType" class="edit-heading-type-form">
      <InputField
        :field-title="'Name'"
        :field-name="`name`"
        :rule="'required'"
        :type="'text'"
        :value="headingType.name"
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
  import {mapGetters} from "vuex";
  import FormWrapper from "../../../../components/form/FormWrapper";
  import InputField from "../../../../components/form/InputField";
  import {GET_HEADING_TYPE_BY_ID, UPDATE_HEADING_TYPE} from "../../../../store/home/actions";

  export default {
    name: "edit",
    layout: 'detail',
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField
    },
    computed: {
      ...mapGetters('home', {
        headingType: 'getSelectedHeadingType'
      })
    },
    methods: {
      async editHeadingType(data) {
        data.id = this.headingType.id
        let response = await this.$store.dispatch(UPDATE_HEADING_TYPE, data)
        if (response) {
          return this.$router.push({path: '/admin/heading-types'})
        }
      }
    },
    async asyncData({store, params}) {
      await store.dispatch(GET_HEADING_TYPE_BY_ID, params.id);
    }
  }
</script>

<style scoped lang="scss">
</style>
