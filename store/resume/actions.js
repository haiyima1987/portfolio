import apiHandler from "~/utils/ApiHandler";
import {SET_ERROR_MESSAGE, SET_SUCCESS_MESSAGE} from "~/store/mutations";
import {
  REMOVE_EDUCATION_BY_ID,
  REMOVE_EXPERIENCE_BY_ID,
  SET_EDUCATIONS,
  SET_EXPERIENCES,
  SET_SELECTED_EDUCATION,
  SET_SELECTED_EXPERIENCE
} from "~/store/resume/mutations";

export const GET_EXPERIENCES = 'resume/getExperiences';
export const GET_EXPERIENCE_BY_ID = 'resume/getExperienceById';
export const CREATE_EXPERIENCE = 'resume/createExperience';
export const UPDATE_EXPERIENCE = 'resume/updateExperience';
export const UPDATE_EXPERIENCE_DISPLAY_INDEX = 'resume/updateExperienceDisplayIndex';
export const DELETE_EXPERIENCE = 'resume/deleteExperience';
export const GET_EDUCATIONS = 'resume/getEducations';
export const GET_EDUCATION_BY_ID = 'resume/getEducationById';
export const CREATE_EDUCATION = 'resume/createEducation';
export const UPDATE_EDUCATION = 'resume/updateEducation';
export const UPDATE_EDUCATION_DISPLAY_INDEX = 'resume/updateEducationDisplayIndex';
export const DELETE_EDUCATION = 'resume/deleteEducation';

export default {
  /** experiences **/
  async getExperiences({commit, state}) {
    try {
      let response = await this.$axios.get('/resume/experiences')
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_EXPERIENCES, response.data.data);
        return state.experiences
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async getExperienceById({commit}, id) {
    try {
      let response = await this.$axios.get(`/resume/experiences/${id}`)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SELECTED_EXPERIENCE, response.data.data);
        return true
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async createExperience({commit}, data) {
    try {
      let response = await this.$axios.post('/resume/experiences/create', data)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        return true
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async updateExperience({commit}, data) {
    try {
      let response = await this.$axios.post('/resume/experiences/update', data)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        return true
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async updateExperienceDisplayIndex({commit}, experiences) {
    try {
      let response = await this.$axios.post('/resume/experiences/update/display-index', experiences)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        return true
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async deleteExperience({commit, state}, id) {
    try {
      let response = await this.$axios.delete(`/resume/experiences/delete/${id}`)
      if (apiHandler.isSuccess(response.status)) {
        commit(REMOVE_EXPERIENCE_BY_ID, id);
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        return state.experiences
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  /** educations **/
  async getEducations({commit, state}) {
    try {
      let response = await this.$axios.get('/resume/educations')
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_EDUCATIONS, response.data.data);
        return state.educations
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async getEducationById({commit}, id) {
    try {
      let response = await this.$axios.get(`/resume/educations/${id}`)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SELECTED_EDUCATION, response.data.data);
        return true
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async createEducation({commit}, data) {
    try {
      let response = await this.$axios.post('/resume/educations/create', data)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        return true
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async updateEducation({commit}, data) {
    try {
      let response = await this.$axios.post('/resume/educations/update', data)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        return true
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async updateEducationDisplayIndex({commit}, educations) {
    try {
      let response = await this.$axios.post('/resume/educations/update/display-index', educations)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        return true
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async deleteEducation({commit, state}, id) {
    try {
      let response = await this.$axios.delete(`/resume/educations/delete/${id}`)
      if (apiHandler.isSuccess(response.status)) {
        commit(REMOVE_EDUCATION_BY_ID, id);
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        return state.educations
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
}
