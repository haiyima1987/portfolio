export default {
  isLoading: function (state) {
    return state.isLoading
  },
  getPublished: function (state) {
    return state.publishedProjects
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
