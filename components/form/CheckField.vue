<template>
  <div class="check-wrapper">
    <label :for="fieldName"
           :class="{ 'no-margin': noMargin }"
           class="check-label">
      <input type="checkbox"
             :id="fieldName"
             :name="fieldName"
             v-model="input">{{placeholder}}
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
      fieldWidth: {
        default: '100%'
      },
      noMargin: {
        default: false,
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
    },
    data: () => ({
      input: undefined
    }),
    inject: ['$validator'],
    created() {
      if (this.$props.value != undefined) {
        this.input = this.$props.value
      } else {
        this.input = false
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

<style scoped>
  .no-margin {
    margin: 0;
  }
</style>
