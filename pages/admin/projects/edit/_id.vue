<template>
  <div>
    <FormWrapper :send-form-data="editProject" class="edit-project-form">
      <div class="image-wrapper" :class="{ 'image-wrapper-margin': isPreviewShown }">
        <img v-if="isPreviewShown" :src="previewSource" :alt="project.name"
             class="image-preview">
        <p v-else class="text-no-preview">No preview image</p>
      </div>
      <FileUploader
        :field-title="''"
        :field-name="`mediaLink`"
        :placeholder="'Select preview'"
        :type="'image'"
        :callback="setPreview"
        :allowedTypes="['png', 'jpg']">
      </FileUploader>
      <InputField
        :value="project.name"
        :field-title="'Name'"
        :field-name="`name`"
        :rule="'required'"
        :type="'text'"
        :placeholder="'Enter project name'">
      </InputField>
      <TextField
        :value="project.description"
        :field-title="'Description'"
        :field-name="'description'"
        :rule="'required'"
        :placeholder="'Enter project description'">
      </TextField>
      <InputField
        :value="project.year"
        :field-title="'Year'"
        :field-name="`year`"
        :rule="'required|integer'"
        :type="'text'"
        :placeholder="'Enter project year'">
      </InputField>
      <CheckField
        class="single-check-wrapper"
        :value="project.published"
        :field-title="'Published'"
        :field-name="`published`"
        :placeholder="'Publish this project?'">
      </CheckField>
      <CheckField
        class="single-check-wrapper"
        :value="project.internal"
        :field-title="'Internal'"
        :field-name="`internal`"
        :placeholder="'Internal project?'">
      </CheckField>
      <InputField
        :value="project.repository"
        :field-title="'Repository'"
        :field-name="`repository`"
        :rule="''"
        :type="'text'"
        :placeholder="'Enter project repository'">
      </InputField>
      <InputField
        :value="project.link"
        :field-title="'Link'"
        :field-name="`link`"
        :rule="'required'"
        :type="'text'"
        :placeholder="'Enter project link'">
      </InputField>
      <CheckBoxGroup
        :value="project.skills.map(skill => skill.id)"
        :field-title="'Skills'"
        :field-name="'skills'"
        :options="skillOptions"
        :rule="'required'">
      </CheckBoxGroup>
      <RadioGroup
        :value="project.category.id"
        :field-title="'Category'"
        :field-name="'categoryId'"
        :options="categoryOptions"
        :rule="'required'">
      </RadioGroup>
      <RadioGroup
        :value="project.type.id"
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
  import {GET_PROJECT_BY_ID, UPDATE_PROJECT, UPDATE_PROJECT_IMAGE} from "../../../../store/admin/actions";
  import FormWrapper from "../../../../components/form/FormWrapper";
  import InputField from "../../../../components/form/InputField";
  import NumberField from "../../../../components/form/NumberField";
  import RadioGroup from "../../../../components/form/RadioGroup";
  import CheckBoxGroup from "../../../../components/form/CheckBoxGroup";
  import TextField from "../../../../components/form/TextField";
  import FileUploader from "../../../../components/form/FileUploader";
  import CheckField from "../../../../components/form/CheckField";

  export default {
    name: 'edit',
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
        project: 'getSelectedProject',
        skills: 'getSkills',
        scopes: 'getScopes',
        types: 'getTypes',
      }),
      isPreviewShown: function () {
        return this.project.previewLink || this.imagePreview
      },
      previewSource: function () {
        if (this.imagePreview) {
          return this.imagePreview
        } else if (this.project.previewLink) {
          return this.project.previewLink
        }
        return undefined
      }
    },
    methods: {
      async editProject(data) {
        // assign the id
        data.id = this.project.id
        // check if the image should be uploaded
        if (this.imagePreview) {
          let link = await this.$store.dispatch(UPDATE_PROJECT_IMAGE, {
            id: this.project.id,
            data: data.mediaLink
          })
          // update project basic info on success
          if (link) {
            this.updateProject(data)
          }
        } else {
          this.updateProject(data)
        }
      },
      async updateProject(data) {
        let response = await this.$store.dispatch(UPDATE_PROJECT, data)
        if (response) {
          return this.$router.push({path: '/admin/projects'})
        }
      },
      setPreview: function (file) {
        let URL = window.URL || window.webkitURL
        this.imagePreview = URL.createObjectURL(file)
      }
    },
    async asyncData({store, params}) {
      let response = await store.dispatch(GET_PROJECT_BY_ID, params.id);
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
  @import "../../../../assets/css/base.variables";
  @import "../../../../assets/css/base.mixins";

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
    margin-bottom: 1.6rem;
  }
</style>
