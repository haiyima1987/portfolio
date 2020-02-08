<template>
  <div>
    <FormWrapper :send-form-data="createProject" class="create-project-form">
      <div class="image-wrapper" :class="{ 'image-wrapper-margin': imagePreview }">
        <img v-if="imagePreview" :src="imagePreview" alt="preview"
             class="image-preview">
        <p v-else class="text-no-preview">No preview image</p>
      </div>
      <FileUploader
        :field-title="''"
        :field-name="`mediaLink`"
        :placeholder="'Select preview'"
        :type="'image'"
        :required="true"
        :callback="setPreview"
        :allowedTypes="['png', 'jpg']">
      </FileUploader>
      <InputField
        :field-title="'Name'"
        :field-name="`name`"
        :rule="'required'"
        :type="'text'"
        :placeholder="'Enter project name'">
      </InputField>
      <TextField
        :field-title="'Description'"
        :field-name="'description'"
        :rule="'required'"
        :placeholder="'Enter project description'">
      </TextField>
      <InputField
        :field-title="'Year'"
        :field-name="`year`"
        :rule="'required|integer'"
        :type="'text'"
        :placeholder="'Enter project year'">
      </InputField>
      <CheckField
        class="single-check-wrapper"
        :field-title="'Published'"
        :field-name="`published`"
        :placeholder="'Publish this project?'">
      </CheckField>
      <CheckField
        class="single-check-wrapper"
        :field-title="'Internal'"
        :field-name="`internal`"
        :placeholder="'Internal project?'">
      </CheckField>
      <InputField
        :field-title="'Repository'"
        :field-name="`repository`"
        :rule="''"
        :type="'text'"
        :placeholder="'Enter project repository'">
      </InputField>
      <InputField
        :field-title="'Link'"
        :field-name="`link`"
        :rule="'required'"
        :type="'text'"
        :placeholder="'Enter project link'">
      </InputField>
      <CheckBoxGroup
        :field-title="'Skills'"
        :field-name="'skills'"
        :options="skillOptions"
        :rule="'required'">
      </CheckBoxGroup>
      <RadioGroup
        :field-title="'Category'"
        :field-name="'categoryId'"
        :options="categoryOptions"
        :rule="'required'">
      </RadioGroup>
      <RadioGroup
        :field-title="'Type'"
        :field-name="'typeId'"
        :options="typeOptions"
        :rule="'required'">
      </RadioGroup>
      <div class="button-submit-wrapper">
        <button type="submit" class="button-green button-save">
          SAVE
        </button>
      </div>
    </FormWrapper>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {CREATE_PROJECT, GET_PROJECT_DATA, UPLOAD_PROJECT_IMAGE} from "../../../store/admin/actions";
  import FormWrapper from "../../../components/form/FormWrapper";
  import InputField from "../../../components/form/InputField";
  import NumberField from "../../../components/form/NumberField";
  import RadioGroup from "../../../components/form/RadioGroup";
  import CheckBoxGroup from "../../../components/form/CheckBoxGroup";
  import TextField from "../../../components/form/TextField";
  import FileUploader from "../../../components/form/FileUploader";
  import CheckField from "../../../components/form/CheckField";

  export default {
    name: 'create',
    layout: 'detail',
    middleware: 'authenticated',
    components: {
      FormWrapper, FileUploader, InputField, NumberField, RadioGroup, CheckBoxGroup, TextField, CheckField
    },
    data: () => ({
      skillOptions: [],
      categoryOptions: [],
      typeOptions: [],
      imagePreview: undefined
    }),
    computed: {
      ...mapGetters('admin', {
        skills: 'getSkills',
        scopes: 'getScopes',
        types: 'getTypes',
      })
    },
    methods: {
      async createProject(data) {
        // first create the project to get the id
        let project = await this.$store.dispatch(CREATE_PROJECT, data)
        if (project) {
          data.id = project.id
          // then upload the image
          this.uploadPreviewImage(data)
        }
      },
      async uploadPreviewImage(data) {
        // check if the image is uploaded, it's checked already by vee-validate
        if (this.imagePreview) {
          // the mediaLink now is a File
          let link = await this.$store.dispatch(UPLOAD_PROJECT_IMAGE, data)
          // redirect on success
          if (link) {
            return this.$router.push({path: '/admin/projects'})
          }
        }
      },
      setPreview: function (file) {
        let URL = window.URL || window.webkitURL
        this.imagePreview = URL.createObjectURL(file)
      }
    },
    async asyncData({store}) {
      let response = await store.dispatch(GET_PROJECT_DATA);
      if (response) {
        let skillOptions = store.state.admin.skills.map(skill => ({value: skill.id, text: skill.name}))
        let categoryOptions = store.state.admin.categories.map(category => ({value: category.id, text: category.name}))
        let typeOptions = store.state.admin.types.map(type => ({value: type.id, text: type.name}))
        return {categoryOptions, typeOptions, skillOptions}
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/base.variables";
  @import "../../../assets/css/base.mixins";

  /* image content */
  .image-wrapper {
    position: relative;
    max-width: 900px;
  }

  .image-wrapper-margin {
    margin-bottom: 15px;
  }

  .image-preview {
    width: 100%;
    @include border-radius(10px);
  }

  .text-no-preview {
    padding-left: 15px;
  }

  .single-check-wrapper {
    margin-bottom: 1rem;
  }
</style>
