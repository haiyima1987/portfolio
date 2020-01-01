export default {
  isLoading: function (state) {
    return state.isLoading
  },
  getProjects: function (state) {
    return state.projects
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
