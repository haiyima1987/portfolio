export default {
  isLoading: function (state) {
    return state.isLoading
  },
  getPublished: function (state) {
    return state.publishedProjects
  },
  getScopes: function (state) {
    return state.scopes
  },
  getExperiences: function (state) {
    return state.experiences
  },
  getEducations: function (state) {
    return state.educations
  },
  getInfoTypes: function (state) {
    return state.infoTypes
  },
  getHeadingTypes: function (state) {
    return state.headingTypes
  },
  getFormData: function (state) {
    return state.formData
  },
  isModalShown: function (state) {
    return state.isModalShown
  },
  getModalOptions: function (state) {
    return state.modalOptions
  },
  getPreviewProject: function (state) {
    return state.previewProject
  },
  getWindowHeight: function (state) {
    return state.windowHeight
  },
  getAppMessage: function (state) {
    return state.appMessage;
  },
  getSelectedMenuId: function (state) {
    return state.selectedMenuId
  }
}
