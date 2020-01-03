<template>
  <div class="form-group" :style="{'width': fieldWidth}">
    <ValidationProvider ref="validationFile"
                        :rules="getValidationRule()"
                        v-slot="{ errors }">
      <h3 v-if="!!fieldTitle" class="form-input-title">{{fieldTitle}}</h3>
      <label class="button-green form-label-file" ref="btnFile" :for="fieldName">
        <span class="placeholder">{{ placeholder }}</span>
        <input type="file"
               class="form-input-file"
               :accept="getFileExtensionString()"
               @change="loadFile($event)"
               @click="clearFile($event)"
               :id="fieldName"
               :name="fieldName">
      </label>
      <p v-show="errors[0]" class="text-error">{{ errors[0] }}</p>
    </ValidationProvider>
  </div>
</template>

<script>
  import {ValidationProvider} from "vee-validate";
  import {SET_FORM_DATA} from '../../store/mutations'

  const FILE_TYPES = {
    jpg: {
      extensions: ['jpg', 'jpeg'],
      format: [`image/jpg`, `image/jpeg`]
    },
    png: {
      extensions: ['png'],
      format: [`image/x-png`, `image/png`]
    },
    pdf: {
      extensions: ['pdf'],
      format: [`application/pdf`]
    },
    mp4: {
      extensions: ['mp4', 'm4v'],
      format: [`video/mp4`, `video/mpeg-4`, `video/m4v`]
    }
  }

  export default {
    name: 'FileUploader',
    components: {
      ValidationProvider
    },
    props: {
      /** required **/
      fieldTitle: {
        required: true
      },
      fieldName: {
        required: true
      },
      /** not required **/
      required: {
        default: false
      },
      // max size in MB
      max: {
        default: 5
      },
      allowedTypes: {
        default: ['png', 'jpg']
      },
      // the general wrapper's width
      fieldWidth: {
        default: '100%'
      },
      placeholder: {
        default: 'Select file'
      },
      groupIndex: {
        required: false
      },
      groupName: {
        required: false
      },
      value: {
        required: false
      },
      callback: {
        required: false
      }
    },
    data: () => ({
      // uploaded file
      input: undefined
    }),
    methods: {
      async loadFile(event) {
        // validate the image
        let {valid} = await this.$refs.validationFile.validate(event)
        if (valid) {
          this.input = event.target.files[0]
          // update form data
          this.setFormData()
          // call the parent if needed
          this.updateParent()
        }
      },
      setFormData: function () {
        let data = {fieldName: this.$props.fieldName, data: this.input}
        // if it's a group value, we need to send the value with index (id in form data) and field name
        if (this.$props.groupIndex != undefined) {
          data.groupIndex = this.$props.groupIndex
          data.groupName = this.$props.groupName
          // add field name, the name is name-{index}, so get the first value from array
          let name = this.$props.fieldName
          data.fieldName = name.split('-')[0]
        }
        this.$store.commit(SET_FORM_DATA, data)
      },
      updateParent: function () {
        if (this.$props.callback) {
          this.$props.callback(this.input)
        }
      },
      clearFile(event) {
        // clear the value to trigger change event for uploading the same image
        event.target.value = null
        // reset errors
        this.$refs.validationFile.reset()
      },
      getFileExtensionString: function () {
        let types = this.$props.allowedTypes.map(type => {
          return FILE_TYPES[type.toLowerCase()].format.join(',')
        })
        types = types.join(',')
        return types
      },
      getValidationRule: function () {
        // add required
        let rule = this.$props.required ? `required` : ``;
        // add extensions
        rule = `${rule}|ext:`
        let extensions = this.$props.allowedTypes.map(type => FILE_TYPES[type.toLowerCase()].extensions.join(','))
        rule = `${rule}${extensions.join(',')}`
        // add max size
        rule = `${rule}|size:${this.$props.max * 1024}`
        return rule
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/base.variables";
  @import "../../assets/css/base.mixins";

  .form-label-file {
    width: auto;

    .placeholder {
      color: white;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .form-input-file {
    display: none;
  }
</style>
