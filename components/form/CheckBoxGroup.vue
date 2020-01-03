<template>
  <div class="form-group">
    <h3 v-if="!!fieldTitle" class="form-input-title">{{fieldTitle}}</h3>
    <ValidationProvider :rules="rule" v-slot="{ errors }">
      <label v-for="(option, index) in options" :key="index"
             :for="`${fieldName}-${option.value}`"
             class="check-label label-checkbox">
        <input type="checkbox"
               class="input-check"
               :id="`${fieldName}-${option.value}`"
               :value="option.value"
               @change="emitValue(option)"
               v-model="input">
        <span class="check-mark"/>
        <span class="option-text">{{option.text}}</span>
      </label>
      <p v-show="errors[0]" class="text-error">{{ errors[0] }}</p>
    </ValidationProvider>
  </div>
</template>

<script>
  import {ValidationProvider} from "vee-validate";
  import {SET_FORM_DATA} from "../../store/mutations";

  export default {
    name: 'CheckBoxGroup',
    components: {
      ValidationProvider
    },
    props: {
      // required
      fieldTitle: {
        required: true
      },
      fieldName: {
        required: true
      },
      options: {
        required: true
      },
      // not required
      rule: {
        default: 'required'
      },
      bindValue: {
        default: true
      },
      value: {
        required: false
      },
      callback: {
        required: false
      }
    },
    data: () => ({
      input: [],
    }),
    methods: {
      emitValue: function (option) {
        // if callback is passed, it means the radio is not a form value, it's just a helper to trigger another action
        if (this.$props.callback) {
          this.$props.callback(option.value)
        }
        // if the bind value is true, bind the value to the form data in store
        if (this.$props.bindValue) {
          this.setFormData()
        }
      },
      setFormData: function () {
        let data = {fieldName: this.$props.fieldName, data: this.input}
        this.$store.commit(SET_FORM_DATA, data, {root: true})
      },
      assignValue: function () {
        if (this.$props.value) {
          this.input = this.$props.value
        }
        this.setFormData()
      }
    },
    created() {
      this.assignValue()
    }
  }
</script>

<style scoped lang="scss">
  .label-checkbox {
    margin-left: 15px;
  }
</style>
