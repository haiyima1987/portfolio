<template>
  <div class="form-group"
       :style="getWrapperClass()">
    <h3 :class="titleClass">{{fieldTitle}}</h3>
    <label class="check-label-radio"
           :style="{ 'padding-left': padding }"
           v-for="(option, index) in options" :key="index">
      <input type="radio"
             class="radio-input"
             :class="getInputClass()"
             :id="fieldName"
             :name="fieldName"
             v-validate="rule"
             :value="option.value"
             v-model="input"
             @click="emitValue(option)">
      <span class="check-mark-round"></span>
      <span class="option-text">{{option.text}}</span>
    </label>
    <p class="error-text-right" v-show="errors.has(fieldName)">{{ errors.first(fieldName) }}</p>
  </div>
</template>

<script>
  import {SET_FORM_DATA} from '../../store/mutations'

  export default {
    name: 'RadioInput',
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
      margin: {
        default: '0 0 0 0'
      },
      padding: {
        default: '0'
      },
      rule: {
        default: 'required'
      },
      fieldWidth: {
        default: '100%'
      },
      titleClass: {
        default: 'form-input-title'
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
    inject: ['$validator'],
    data: () => ({
      input: '',
    }),
    methods: {
      getInputClass: function () {
        let className = this.$props.inputClass
        if (this.errors.has(this.$props.fieldName)) {
          className = `${className} error-field`
        }
        return className
      },
      getWrapperClass: function () {
        let style = {}
        // add width
        if (this.$props.fieldWidth) {
          style.width = this.$props.fieldWidth
        }
        // add margin
        if (this.$props.margin) {
          style.margin = this.$props.margin
        }
        return style
      },
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
          this.setFormData()
        } else {
          this.input = this.$props.options[0].value
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
  @import "../../assets/css/base.variables";
  @import "../../assets/css/base.mixins";

  .radio-input {
    width: 50px;
  }

  .option-text {
    padding-left: 15px;
    @include position(relative, $top: 1px);
  }

  .check-label-radio {
    @include radio-button(16px, 16px);

    .title-logo {
      margin-left: 2em;
      height: 2em;
    }

    .mark-title {
      margin-left: 2em;
      font-weight: 900;
      font-size: 1.2em;
    }

    img {
      width: auto;
      height: 50px;
    }

    &:hover {
      cursor: pointer;
    }
  }
</style>
