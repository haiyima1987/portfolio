<template>
  <div>
    <Form :send-form-data="createSkill" class="update-skill-form">
      <div class="skill-wrapper">
        <div class="input-wrapper">
          <InputField
            class="name-wrapper"
            :field-title="'Name'"
            :field-name="`name`"
            :rule="'required'"
            :type="'text'"
            :placeholder="'Enter your skill'">
          </InputField>
          <NumberField
            class="level-wrapper"
            :field-title="'Level'"
            :field-width="'150px'"
            :field-name="`level`"
            :rule="'required'"
            :min="0"
            :max="100"
            :placeholder="'Level'">
          </NumberField>
          <RadioGroup
            :field-title="'Scope'"
            :field-name="'scopeId'"
            :options="scopeOptions"
            :rule="'required'">
          </RadioGroup>
        </div>
      </div>
      <div class="button-submit-wrapper">
        <button type="submit" class="button-green button-save">
          SAVE
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
  import Form from "../../../components/form/Form";
  import InputField from "../../../components/form/InputField";
  import NumberField from "../../../components/form/NumberField";
  import {CREATE_SKILL, GET_SCOPES} from "../../../store/admin/actions";
  import RadioGroup from "../../../components/form/RadioGroup";
  import CheckBoxGroup from "../../../components/form/CheckBoxGroup";

  export default {
    name: "create",
    components: {
      Form, InputField, NumberField, RadioGroup, CheckBoxGroup
    },
    data: () => ({
      scopeOptions: []
    }),
    methods: {
      async createSkill (data) {
        console.log(data)
        let response = await this.$store.dispatch(CREATE_SKILL, data)
        if (response) {
          this.$router.push({path: '/admin/skill'})
        }
      }
    },
    async asyncData({store}) {
      let scopes = await store.dispatch(GET_SCOPES);
      if (scopes) {
        let options = scopes.map(scope => {
          // console.log(scope);
          let option = {}
          option.value = scope.id;
          option.text = scope.name;
          return option
        })
        // console.log(options)
        return {
          // scopeOptions: [{
          //   value: 1,
          //   text: 'test'
          // }, {
          //   value: 2,
          //   text: 'test2'
          // }]
          scopeOptions: scopes.map(scope => ({
            value: scope.id,
            text: scope.name
          }))
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/base.variables";
  @import "../../../assets/css/base.mixins";

  .button-submit-wrapper {
    padding-top: 40px;
    text-align: right;
  }

  .button-save {
    padding: 0 40px;
  }
</style>
