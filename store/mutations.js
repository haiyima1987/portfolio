import Project from "~/models/Project";
import AppMessage from "~/models/AppMessage";

export const SET_PUBLISHED = 'setPublished';
export const SET_FORM_DATA = 'setFormData';
export const SET_MODAL_DATA = 'setModalData';
export const RESET_MODAL_DATA = 'resetModalData';
export const REMOVE_FORM_DATA_BY_NAME = 'removeFormDataByName';
export const CLEAR_FORM_DATA = 'clearFormData';
export const SET_ERROR_MESSAGE = 'setErrorMessage';
export const SET_SUCCESS_MESSAGE = 'setSuccessMessage';
export const CLEAR_APP_MESSAGE = 'clearAppMessage';

export default {
  setLoading: function (state, isLoading) {
    state.isLoading = isLoading
  },
  increaseActiveCalls: function (state) {
    state.activeCalls++
  },
  decreaseActiveCalls: function (state) {
    state.activeCalls--
  },
  setPublished: function (state, projects) {
    state.publishedProjects = projects.map(project => Project.parseFromDataObject(project))
  },
  setModalData: function (state, data) {
    state.modalOptions = data
    state.isModalShown = true
  },
  resetModalData: function (state) {
    state.modalOptions = {}
    state.isModalShown = false
  },
  // form related mutations
  setFormData: function (state, {fieldName, data, groupIndex, groupName}) {
    // add group field
    if (groupName) {
      // if the key is not there yet, add it with an array value
      if (!state.formData[groupName]) {
        state.formData[groupName] = []
      }
      let childData = state.formData[groupName].find((data) => data.id == groupIndex)
      if (!childData) {
        // define the child data
        state.formData[groupName].push({
          /** here the ID is the group index, so your item has and ID you can set it as group index as a prop **/
          id: groupIndex,
          [fieldName]: data
        })
      } else {
        // update key and value or assign key value pair
        childData[fieldName] = data
      }
    } else {
      // add regular field
      state.formData[fieldName] = data
    }
    // console.log(state.formData)
  },
  removeFormDataByName: function (state, {groupName, index}) {
    if (state.formData && state.formData[groupName]) {
      state.formData[groupName].splice(index, 1)
    }
  },
  clearFormData: function (state) {
    state.formData = {}
  },
  // for app messages
  setErrorMessage(state, errorData) {
    state.appMessage = new AppMessage(errorData.error, false, true)
  },
  setSuccessMessage(state, message = null) {
    state.appMessage = new AppMessage(message ? message : 'Success')
  },
  clearAppMessage(state) {
    state.appMessage = null
  }
}
