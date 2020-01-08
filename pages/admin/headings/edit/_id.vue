<template>
  <div>
    <FormWrapper :send-form-data="editHeading" class="edit-heading-form">
      <InputField
        :field-title="'Name'"
        :field-name="`title`"
        :rule="''"
        :type="'text'"
        :value="heading.title"
        :placeholder="'Enter heading name'">
      </InputField>
      <TextField
        :field-title="'Content'"
        :field-name="`text`"
        :rule="''"
        :type="'text'"
        :value="heading.text"
        :placeholder="'Enter heading content'">
      </TextField>
      <RadioGroup
        :field-title="'Heading type'"
        :field-name="'headingTypeId'"
        :options="headingTypeOptions"
        :value="heading.headingTypeId"
        :rule="'required'">
      </RadioGroup>
      <CheckField
        class="published-wrapper"
        :field-title="'Published'"
        :field-name="`published`"
        :value="heading.published"
        :placeholder="'Publish this heading?'">
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
  import {GET_HEADING_BY_ID, UPDATE_HEADING} from "../../../../store/home/actions";
  import RadioGroup from "../../../../components/form/RadioGroup";
  import CheckField from "../../../../components/form/CheckField";
  import TextField from "../../../../components/form/TextField";

  export default {
    name: "edit",
    layout: 'detail',
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField, TextField, RadioGroup, CheckField
    },
    data: () => ({
      headingTypeOptions: []
    }),
    computed: {
      ...mapGetters('home', {
        heading: 'getSelectedHeading'
      })
    },
    methods: {
      async editHeading(data) {
        data.id = this.heading.id
        let response = await this.$store.dispatch(UPDATE_HEADING, data)
        if (response) {
          return this.$router.push({path: '/admin/headings'})
        }
      }
    },
    async asyncData({store, params}) {
      let response = await store.dispatch(GET_HEADING_BY_ID, params.id);
      if (response) {
        let headingTypeOptions = store.state.home.headingTypes.map(type => ({value: type.id, text: type.name}))
        return {headingTypeOptions}
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
