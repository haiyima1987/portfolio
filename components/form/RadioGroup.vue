<template>
  <div class="form-group">
    <h3 v-if="!!fieldTitle" class="form-input-title">{{fieldTitle}}</h3>
    <ValidationProvider :rules="rule" v-slot="{ errors }">
      <label v-for="(option, index) in options" :key="index"
             :for="`${fieldName}-${option.value}`"
             class="check-label-round label-radio">
        <input type="radio"
               class="input-radio"
               :id="`${fieldName}-${option.value}`"
               :value="option.value"
               v-model="input"
               @click="emitValue(option)">
        <span class="check-mark"/>
        <span class="option-text">{{option.text}}</span>
      </label>
      <p v-show="errors[0]" class="text-error">{{ errors[0] }}</p>
    </ValidationProvider>
  </div>
</template>

<script>
  import {ValidationProvider} from "vee-validate";
  import {SET_FORM_DATA} from '../../store/mutations'

  export default {
    name: 'RadioGroup',
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
      value: {
        required: false
      },
      bindValue: {
        default: true
      },
      callback: {
        required: false
      }
    },
    data: () => ({
      input: '',
    }),
    methods: {
      emitValue: function (option) {
        // if callback is passed, it means the radio is not a form value, it's just a helper to trigger another action
        if (this.$props.callback) {
          this.$props.callback(option.value)
        }
        // if the bind value is true, bind the value to the form data in store
        if (this.$props.bindValue) {
          let data = {fieldName: this.$props.fieldName, data: option.value}
          this.$store.commit(SET_FORM_DATA, data)
        }
      },
      setFormData() {
        let data = {fieldName: this.$props.fieldName, data: this.input}
        this.$store.commit(SET_FORM_DATA, data)
      },
      assignValue: function () {
        if (this.$props.value) {
          this.input = this.$props.value
        } else {
          this.input = this.$props.options[0].value
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
  @import "../../assets/css/base.variables";
  @import "../../assets/css/base.mixins";

  .label-radio {
    margin-left: 15px;
  }
</style>
