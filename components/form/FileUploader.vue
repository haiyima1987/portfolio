<template>
  <div class="form-group"
       :style="{'width': fieldWidth}">
    <template v-if="!hideTitle">
      <h3 :class="titleClass">{{fieldTitle}}</h3>
      <p class="text-indicator-file">{{getIndicatorText()}}</p>
    </template>
    <label class="btn form-file-select"
           @load="getRatioPercentage"
           v-show="!isFileValid"
           ref="btnFile"
           :for="fieldName"
           :class="labelClass"
           :style="labelStyle">
      <span>{{uploaderText}}</span>
      <input type="file"
             :accept="getFileExtensionString()"
             @change="loadFile($event)"
             @click="clearFile($event)"
             :id="fieldName"
             :name="fieldName"
             v-validate="getValidationRule()">
    </label>
    <template v-if="type == 'image'">
      <div v-show="isFileValid"
           @click="reloadFile($event)"
           :style="labelStyle"
           class="image-preview-wrapper">
        <img class="image-preview"
             ref="imagePreview"
             src=""
             alt="preview">
      </div>
    </template>
    <template v-if="type == 'video'">
      <div v-show="isFileValid"
           @click="reloadFile($event)"
           :style="labelStyle"
           class="video-preview-wrapper">
        <video class="video-preview"
               ref="videoPreview"
               autoplay
               controls>
        </video>
      </div>
    </template>
    <p v-if="fileError"
       class="error-text">{{ errorText }}</p>
    <p class="error-text"
       v-show="errors.has(fieldName)">{{ errors.first(fieldName) }}</p>
  </div>
</template>

<script>
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
        required: false
      },
      // label class, usually the label is rendered as a button
      labelClass: {
        default: 'button'
      },
      // define the width and height in px or %, can define only one and use ratio to render it
      dimensions: {
        required: false
      },
      // in combination with dimensions to render desired clickable label
      ratio: {
        default: false
      },
      // define the file's ratio limit (this is different from the label's ratio)
      fileRatio: {
        default: false
      },
      // max size in MB
      max: {
        default: 10
      },
      type: {
        default: 'image'
      },
      allowedTypes: {
        default: ['png', 'jpg']
      },
      // the general wrapper's width
      fieldWidth: {
        default: '100%'
      },
      uploaderText: {
        default: 'Select...'
      },
      titleClass: {
        default: 'form-input-title'
      },
      inputClass: {
        default: 'form-input'
      },
      hideTitle: {
        default: false
      },
      // for group of files
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
      },
    },
    inject: ['$validator'],
    data: () => ({
      labelStyle: {},
      // error text
      fileError: undefined,
      errorText: '',
      // uploaded file
      tempFile: undefined,
      input: undefined,
      fileName: undefined,
      isFileValid: false,
    }),
    methods: {
      loadFile: function (event) {
        // reset the error
        this.resetLocalError()
        // first get the file
        let file = event.target.files[0]
        // assign the file to local variable for the following steps
        this.tempFile = file
        // get the file name
        this.fileName = file.name
        if (this.checkFileValidity()) {
          // set up the preview on success
          if (this.$props.type == 'image') {
            // since image check is done with new Image(), here assign the value to preview
            let URL = window.URL || window.webkitURL
            this.$refs.imagePreview.src = URL.createObjectURL(this.tempFile)
          }
          // set the input for form data posting
          this.input = this.tempFile
          this.setFormData()
          // call the parent if needed
          this.parentCall()
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
      parentCall: function () {
        if (this.$props.callback) {
          this.$props.callback(this.input)
        }
      },
      reloadFile: function (event) {
        // stop the video from playing
        event.preventDefault()
        // trigger a click to re-upload
        this.$refs.btnFile.click()
      },
      clearFile(event) {
        // clear the value to trigger change event for uploading the same image
        event.target.value = null
      },
      checkFileValidity: function () {
        // check existence
        if (!this.tempFile) {
          this.setLocalError(`No file is found`)
          return false
        }
        // check type
        if (!this.checkTypes()) return false
        // check size
        if (!this.checkSize()) return false
        // check ratio
        return this.checkDimension()
      },
      checkTypes: function () {
        let types = []
        let extensions = []
        // get all allowed types in an array, e.g. ["image/x-png", "image/png", "image/jpg", "image/jpeg"]
        for (let type of this.$props.allowedTypes) {
          types = types.concat(FILE_TYPES[type.toLowerCase()].format)
          extensions = extensions.concat(FILE_TYPES[type.toLowerCase()].extensions)
        }
        // check if the input type is allowed
        if (types.indexOf(this.tempFile.type) == -1) {
          this.setLocalError(`File type is wrong, accepted types: ${extensions.join(', ')}`)
          return false
        }
        return true
      },
      checkSize: function () {
        // check size
        if (this.tempFile.size > Number(this.$props.max) * 1024 * 1024) {
          this.setLocalError(`Uploaded file cannot be large than ${this.$props.max} MB`)
          return false
        }
        return true
      },
      checkDimension: function () {
        // for image and video dimensions need to be checked
        if (this.$props.type == 'image') {
          this.readImage()
        } else if (this.$props.type == 'video') {
          this.readVideo()
        }
        return true
      },
      readImage: function () {
        let URL = window.URL || window.webkitURL
        // create a temp image to check ratio
        let image = new Image()
        let self = this
        // check the dimension on image load
        image.onload = function () {
          self.checkRatio(this.width, this.height)
        }
        // error call back
        image.onerror = () => {
          this.setLocalError('Invalid file')
        }
        // assign the src to trigger onload
        image.src = URL.createObjectURL(this.tempFile)
      },
      readVideo: function () {
        let video = this.$refs.videoPreview
        // let video = new Video()
        let URL = window.URL || window.webkitURL
        let self = this
        // check the video dimension and enable or disable preview accordingly
        video.onloadedmetadata = function () {
          self.checkRatio(this.videoWidth, this.videoHeight)
        }
        // assign the src to trigger metadata check
        video.src = URL.createObjectURL(this.tempFile)
      },
      checkRatio: function (width, height) {
        if (this.$props.fileRatio) {
          let idealWidth = this.$props.fileRatio.width
          let idealHeight = this.$props.fileRatio.height
          if (width / height != idealWidth / idealHeight) {
            this.isFileValid = false
            this.setLocalError(`Wrong dimension, upload a file with a ratio ${idealHeight}:${idealWidth}`)
          } else {
            this.isFileValid = true
          }
        } else {
          this.isFileValid = true
        }
      },
      setLocalError: function (text) {
        this.fileError = true
        this.errorText = text
        this.isFileValid = false
      },
      resetLocalError: function () {
        this.fileError = false
        this.errorText = ''
      },
      getIndicatorText: function () {
        // get type text separated by comma
        let types = this.$props.allowedTypes.map(type => `.${type}`).join(', ')
        // get the full text
        let text = `Upload a ${types} file, (max ${this.$props.max} MB)`
        // add text about ratio
        if (this.$props.ratio) {
          text = `${text} with a ${this.$props.ratio.height}:${this.$props.ratio.width} ratio`
        }
        return text
      },
      getFileExtensionString: function () {
        let types = this.$props.allowedTypes.map(type => {
          return FILE_TYPES[type.toLowerCase()].format.join(', ')
        })
        types = types.join('')
        return types
      },
      getValidationRule: function () {
        let rule = ''
        if (this.$props.required) {
          rule = `required`
        }
        return rule
      },
      /** function to set the label's height and width, this doesn't require rendered DOM value **/
      assignDimensions: function () {
        // get the dimensions
        let dimensions = this.$props.dimensions
        if (dimensions) {
          // get the width if it's assigned
          if (dimensions.width) {
            this.labelStyle.width = dimensions.width.join('')
          }
          // get the height if it's assigned
          if (dimensions.height) {
            this.labelStyle.height = dimensions.height.join('')
          }
        }
      },
      /** function to set the ratio, this requires rendered DOM value, so it's inside mounted() **/
      getRatioPercentage: function () {
        if (this.$props.ratio) {
          // get the width, it must be passed from outside
          let width = this.$refs.btnFile.clientWidth
          let unit = 'px'
          // get the width and height in ratio also for the image preview
          this.labelStyle = {
            'width': `${width}${unit}`,
            'height': `${this.ratio.height / this.ratio.width * width}${unit}`
          }
        }
      },
      assignValue: function () {
        if (this.$props.value) {
          if (this.$props.type == 'image') {
            // assign src to show preview
            this.$refs.imagePreview.src = this.$props.value
          } else if (this.$props.type == 'video') {
            // assign src to show preview
            this.$refs.videoPreview.src = this.$props.value
          }
          // if it's from the API, that means the file was valid in the previous upload
          this.isFileValid = true
          // set the input to populate form data
          this.input = this.$props.value
          // then set the form data to prepare the editing call
          this.setFormData()
        }
      }
    },
    created() {
      // first assign dimensions
      this.assignDimensions()
    },
    mounted() {
      // on mounted, set up the upload dimensions according to ratio
      this.getRatioPercentage()
      // assign the value if it's passed
      this.assignValue()
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/base.variables";
  @import "../../assets/css/base.mixins";

  input[type='file'] {
    display: none;
  }

  .form-file-select {
    padding: 5px 15px;

    &:hover {
      cursor: pointer;
    }
  }

  /* image preview */
  .image-preview-wrapper {
    border-radius: 8px;

    &:hover {
      cursor: pointer;
    }
  }

  .image-preview {
    height: 100%;
    width: 100%;
    object-fit: cover;
    @include border-radius(8px);
  }

  .video-preview {
    &:focus {
      outline: none;
    }
  }

  /* video preview */
  .video-preview-wrapper {
    @extend .image-preview-wrapper;
  }

  .video-preview {
    @extend .image-preview;
  }
</style>
