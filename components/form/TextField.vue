<template>
  <div class="form-group" :style="{'width': fieldWidth}">
    <ValidationProvider :rules="rule" v-slot="{ errors }">
      <h3 class="form-input-title" :class="{ 'text-error': errors[0] }">
        {{fieldTitle}}
      </h3>
      <label :for="fieldName">
        <textarea :id="fieldName"
                  class="form-input-textarea"
                  :class="{ 'field-error': errors[0] }"
                  :name="fieldName"
                  :placeholder="placeholder"
                  :rows="rows"
                  v-model="input"/>
      </label>
      <p v-show="errors[0]" class="text-error">{{ errors[0] }}</p>
    </ValidationProvider>
  </div>
</template>

<script>
  import {ValidationProvider} from "vee-validate";
  import {SET_FORM_DATA} from '../../store/mutations'

  export default {
    name: 'TextField',
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
    data: () => ({
      input: '',
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
        let data = {fieldName: this.$props.fieldName, data: this.input}
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
      if (this.$props.value) {
        this.input = this.$props.value;
      }
    },
    watch: {
      input: function () {
        this.setInputTimeout()
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
