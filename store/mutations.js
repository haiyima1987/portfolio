import Project from "~/models/Project";

export const SET_PROJECTS = 'setProjects';
export const SET_FORM_DATA = 'setFormData';
export const REMOVE_FORM_DATA_BY_NAME = 'removeFormDataByName';
export const CLEAR_FORM_DATA = 'clearFormData';

export default {
  setProjects: function (state, projects) {
    state.projects = projects.map(project => Project.parseFromDataObject(project))
  },
  // form related mutations
  setFormData(state, {fieldName, data, groupIndex, groupName}) {
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
  },
  removeFormDataByName(state, {groupName, index}) {
    if (state.formData && state.formData[groupName]) {
      state.formData[groupName].splice(index, 1)
    }
  },
  clearFormData(state) {
    state.formData = {}
  }
}
