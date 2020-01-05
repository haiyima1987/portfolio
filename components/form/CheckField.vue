<template>
  <div class="check-wrapper">
    <label :for="fieldName" class="check-label label-checkbox">
      <input type="checkbox"
             :id="fieldName"
             :name="fieldName"
             v-model="input">
      {{placeholder}}
      <span class="check-mark"/>
    </label>
  </div>
</template>

<script>
  import {SET_FORM_DATA} from '../../store/mutations'

  export default {
    name: 'CheckField',
    props: {
      // required
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
      isValueNumeric: {
        default: false
      },
      fieldWidth: {
        default: '100%'
      },
      groupIndex: {
        required: false
      },
      groupName: {
        required: false
      },
      callback: {
        required: false
      }
    },
    data: () => ({
      input: undefined
    }),
    methods: {
      setInputTimeout: function () {
        clearTimeout(this.timeOut)
        this.timeOut = setTimeout(() => {
          this.setFormData()
        }, 500)
      },
      // send the form data to the store
      setFormData: function () {
        let input = this.input
        // parse the value to numeric if necessary
        if (this.$props.isValueNumeric) {
          input = this.input ? 1 : 0
        }
        let data = {fieldName: this.$props.fieldName, data: input}
        // if it's a group value, we need to send the value with index (id in form data) and field name
        if (this.$props.groupIndex) {
          data.groupIndex = this.$props.groupIndex
          data.groupName = this.$props.groupName
          // add field name, the name is name-{index}, so get the first value from array
          let name = this.$props.fieldName
          data.fieldName = name.split('-')[0]
        }
        this.$store.commit(SET_FORM_DATA, data)
      },
    },
    created() {
      if (this.$props.value != undefined) {
        this.input = this.$props.value
      } else {
        this.input = false
      }
    },
    watch: {
      input: function () {
        this.setInputTimeout()
      }
    }
  }
</script>

<style scoped>
  .label-checkbox {
    margin-left: 15px;
  }
</style>
