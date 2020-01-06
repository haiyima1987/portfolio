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
  getFormData: function (state) {
    return state.formData
  },
  isModalShown (state) {
    return state.isModalShown
  },
  getModalOptions (state) {
    return state.modalOptions
  },
  getAppMessage(state) {
    return state.appMessage;
  }
}
