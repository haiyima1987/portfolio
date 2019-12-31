<template>
  <div class="form-group"
       :style="{'width': fieldWidth}">
    <h3 :class="titleClass">{{fieldTitle}}</h3>
    <label :for="fieldName">
      <textarea :id="fieldName"
                :class="getInputClass()"
                :name="fieldName"
                :placeholder="placeholder"
                :rows="rows"
                v-validate="rule"
                v-model="input"/>
    </label>
    <p class="error-text-right" v-show="errors.has(fieldName)">{{ errors.first(fieldName) }}</p>
  </div>
</template>

<script>
  import {SET_FORM_DATA} from '../../store/mutations'

  export default {
    name: 'TextField',
    props: {
      // required
      fieldTitle: {
        required: true
      },
      fieldName: {
        required: true
      },
      placeholder: {
        required: true
      },
      // not required
      value: {
        required: false
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
      inputClass: {
        default: 'form-input-textarea'
      },
      groupIndex: {
        required: false
      },
      groupName: {
        required: false
      },
      callback: {
        required: false
      },
      rows: {
        default: 4
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
          className = `${className} error-field error`
        }
        return className
      }
    },
    created() {
      if (this.$props.value) {
        this.input = this.$props.value;
      }
    },
    watch: {
      input: function (newVal) {
        clearTimeout(this.timeOut)
        this.timeOut = setTimeout(() => {
          let data = {fieldName: this.$props.fieldName, data: newVal}
          // if it's a group value, we need to send the value with index (id in form data) and field name
          if (this.$props.groupIndex != undefined) {
            data.groupIndex = this.$props.groupIndex
            data.groupName = this.$props.groupName
            // add field name, the name is name-{index}, so get the first value from array
            let name = this.$props.fieldName
            data.fieldName = name.split('-')[0]
          }
          this.$store.commit(SET_FORM_DATA, data)
        }, 500)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/base.variables";
  @import "../../assets/css/base.mixins";

  .error {
    background-color: $red-main;
  }
</style>
