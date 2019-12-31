<template>
  <div class="form-group"
       :style="{'width': fieldWidth}">
    <h3 :class="titleClass">{{fieldTitle}}</h3>
    <label class="check-label"
           v-for="(option, index) in options" :key="index"
           :for="option.value">
      <input
        type="checkbox"
        class="filter-option"
        :id="option.value"
        :value="option.value"
        :checked="input.includes(option.value)"
        @click="emitValue(option)"
        v-model="input">
      <span class="check-mark"/>
      <span class="option-text">{{option.text}}</span>
    </label>
    <p class="error-text-right" v-show="errors.has(fieldName)">{{ errors.first(fieldName) }}</p>
  </div>
</template>

<script>
  import {SET_FORM_DATA} from "../../store/mutations";

  export default {
    name: 'CheckBoxInput',
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
      fieldWidth: {
        default: '100%'
      },
      titleClass: {
        default: 'form-input-title'
      },
      bindValue: {
        default: true
      },
      value: {
        required: false
      },
      callback: {
        required: false
      },
    },
    inject: ['$validator'],
    data: () => ({
      input: [],
    }),
    methods: {
      emitValue: function (option) {
        this.addValue(option)
        // if callback is passed, it means the radio is not a form value, it's just a helper to trigger another action
        if (this.$props.callback) {
          this.$props.callback(option.value)
        }
        // if the bind value is true, bind the value to the form data in store
        if (this.$props.bindValue) {
          this.setFormData()
        }
      },
      addValue: function (option) {
        if (this.input.includes(option.value)) {
          this.input.splice(this.input.indexOf(option.value), 1)
        } else {
          this.input.push(option.value)
        }
      },
      setFormData: function () {
        let data = {fieldName: this.$props.fieldName, data: this.input}
        this.$store.commit(SET_FORM_DATA, data)
      },
      assignValue: function () {
        if (this.$props.value) {
          this.input = this.$props.value
        } else {
          this.input.push(this.$props.options[0].value)
          this.setFormData()
        }
      }
    },
    created() {
      this.assignValue()
    }
  }
</script>

<style scoped lang="scss">
</style>
