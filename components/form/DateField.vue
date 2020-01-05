<template>
  <div class="form-group date-picker-field" :style="{'width': fieldWidth}">
    <ValidationProvider :rules="getRule" v-slot="{ errors }">
      <h3 v-if="!!fieldTitle" class="form-input-title" :class="{ 'text-error': errors[0] }">
        {{ fieldTitle }}
      </h3>
      <div :for="fieldName" class="label-picker">
        <date-picker v-if="isMounted"
                     ref="datePicker"
                     v-model="input"
                     @selected="onPanelSelected"
                     :required="required"
                     :input-class="errors[0] ? 'form-input-picker field-error' : 'form-input-picker'"
                     :placeholder="'DD/MM/YYYY'"
                     :id="fieldName"
                     :name="fieldName"
                     :minimum-view="minimumView"/>
        <span v-if="input"
              @click="onClearClick"
              class="button-clear">
          <font-awesome-icon :icon="['fas', 'times']"
                             class="icon-menu"/>
        </span>
      </div>
      <p v-show="errors[0]" class="text-error">{{ errors[0] }}</p>
    </ValidationProvider>
  </div>
</template>

<script>
  import {ValidationProvider} from "vee-validate";
  import {SET_FORM_DATA} from "../../store/mutations";

  export default {
    name: "DateField",
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
      // not required
      minimumView: {
        default: 'day'
      },
      value: {
        required: false
      },
      required: {
        default: true
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
      input: undefined,
      isMounted: false
    }),
    computed: {
      getRule: function () {
        return this.$props.required ? 'required' : ''
      }
    },
    methods: {
      onPanelSelected: function () {
        this.$refs.datePicker.close()
      },
      onClearClick: function (event) {
        this.input = ''
      },
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
        this.input = this.$props.value
      }
    },
    mounted() {
      this.isMounted = true
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

  .date-picker-field {
    margin-bottom: 1.5rem;
  }

  .label-picker {
    position: relative;
  }

  .button-clear {
    @include position(absolute, $top: 50%, $right: 16px);
    @include translate(0, -50%);
    font-size: 1.2rem;
    font-weight: bold;
    color: $red-main;
  }
</style>
