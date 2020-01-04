import apiHandler from "~/utils/ApiHandler";
import {
  REMOVE_PROJECT_BY_ID,
  REMOVE_SCOPE_BY_ID,
  REMOVE_SKILL_BY_ID,
  SET_SELECTED_PROJECT,
  SET_PROJECT_DATA,
  SET_PROJECTS,
  SET_SCOPES,
  SET_SKILLS, REMOVE_CATEGORY_BY_ID, SET_CATEGORIES, SET_TYPES, REMOVE_TYPE_BY_ID
} from "~/store/admin/mutations";
import {SET_ERROR_MESSAGE, SET_SUCCESS_MESSAGE} from "~/store/mutations";

export const GET_SKILLS = 'admin/getSkills';
export const CREATE_SKILL = 'admin/createSkill';
export const UPDATE_SKILLS = 'admin/updateSkills';
export const DELETE_SKILL = 'admin/deleteSkill';
export const GET_SCOPES = 'admin/getScopes';
export const CREATE_SCOPE = 'admin/createScope';
export const UPDATE_SCOPES = 'admin/updateScopes';
export const DELETE_SCOPE = 'admin/deleteScope';
export const GET_CATEGORIES = 'admin/getCategories';
export const CREATE_CATEGORY = 'admin/createCategory';
export const UPDATE_CATEGORIES = 'admin/updateCategories';
export const DELETE_CATEGORY = 'admin/deleteCategory';
export const GET_TYPES = 'admin/getTypes';
export const CREATE_TYPE = 'admin/createType';
export const UPDATE_TYPES = 'admin/updateTypes';
export const DELETE_TYPE = 'admin/deleteType';
export const GET_PROJECT_DATA = 'admin/getProjectData';
export const UPLOAD_PROJECT_IMAGE = 'admin/uploadProjectImage';
export const CREATE_PROJECT = 'admin/createProject';
export const GET_PROJECT_BY_ID = 'admin/getProjectById';
export const GET_PROJECTS = 'admin/getProjects';
export const UPDATE_PROJECT_IMAGE = 'admin/updateProjectImage';
export const UPDATE_PROJECT = 'admin/updateProject';
export const UPDATE_DISPLAY_INDEX = 'admin/updateDisplayIndex';
export const DELETE_PROJECT = 'admin/deleteProject';

export default {
  /** project list **/
  async getProjects({commit, state}) {
    try {
      let response = await this.$axios.get('/projects')
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_PROJECTS, response.data.data)
        return state.projects
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  /** create project **/
  async getProjectData({commit}) {
    try {
      let response = await this.$axios.get(`/projects/data`)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_PROJECT_DATA, response.data.data)
        return true
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async uploadProjectImage({commit}, data) {
    try {
      let formData = new FormData()
      formData.append('id', data.id)
      formData.append('image', data.mediaLink)
      let response = await this.$axios.post(`/projects/upload-image`, formData)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        return response.data.data
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async createProject({commit}, data) {
    try {
      let response = await this.$axios.post(`/projects/create`, data)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        return response.data.data
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  /** update project **/
  async getProjectById({commit}, id) {
    try {
      let response = await this.$axios.get(`/projects/${id}`)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SELECTED_PROJECT, response.data.data)
        commit(SET_PROJECT_DATA, response.data.data)
        return true
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async updateProjectImage({commit}, {id, data}) {
    try {
      let formData = new FormData()
      formData.append('image', data)
      let response = await this.$axios.post(`/projects/update-image/${id}`, formData)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        return response.data.data
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async updateProject({commit}, data) {
    try {
      let response = await this.$axios.post(`/projects/update`, data)
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
  async updateDisplayIndex({commit, state}, data) {
    try {
      let response = await this.$axios.post(`/projects/update/display-index`, data)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        commit(SET_PROJECTS, response.data.data)
        return state.projects
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  /** delete project **/
  async deleteProject({commit}, id) {
    try {
      let response = await this.$axios.delete(`/projects/delete/${id}`)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        commit(REMOVE_PROJECT_BY_ID, id);
        return true
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  /** skills **/
  async getSkills({commit, state}) {
    try {
      let response = await this.$axios.get('/skills')
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SKILLS, response.data.data);
        return state.skills
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async createSkill({commit, state}, data) {
    try {
      let response = await this.$axios.post('/skills/create', data)
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
  async updateSkills({commit, state}, skills) {
    try {
      let response = await this.$axios.post('/skills/update', skills)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SKILLS, response.data.data);
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        return state.skills
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async deleteSkill({commit, state}, id) {
    try {
      let response = await this.$axios.delete(`/skills/delete/${id}`)
      if (apiHandler.isSuccess(response.status)) {
        commit(REMOVE_SKILL_BY_ID, id);
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        return state.skills
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  /** scopes **/
  async getScopes({commit, state}) {
    try {
      let response = await this.$axios.get(`/scopes`)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SCOPES, response.data.data);
        return state.scopes
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async createScope({commit}, data) {
    try {
      let response = await this.$axios.post(`/scopes/create`, data)
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
  async updateScopes({commit, state}, data) {
    try {
      let response = await this.$axios.post(`/scopes/update`, data)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SCOPES, response.data.data);
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        return state.scopes
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async deleteScope({commit, state}, id) {
    try {
      let response = await this.$axios.delete(`/scopes/delete/${id}`)
      if (apiHandler.isSuccess(response.status)) {
        commit(REMOVE_SCOPE_BY_ID, id);
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        return state.scopes
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  /** categories **/
  async getCategories({commit, state}) {
    try {
      let response = await this.$axios.get(`/categories`)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_CATEGORIES, response.data.data);
        return state.categories
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async createCategory({commit}, data) {
    try {
      let response = await this.$axios.post(`/categories/create`, data)
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
  async updateCategories({commit, state}, data) {
    try {
      let response = await this.$axios.post(`/categories/update`, data)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_CATEGORIES, response.data.data);
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        return state.categories
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async deleteCategory({commit, state}, id) {
    try {
      let response = await this.$axios.delete(`/categories/delete/${id}`)
      if (apiHandler.isSuccess(response.status)) {
        commit(REMOVE_CATEGORY_BY_ID, id);
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        return state.categories
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  /** types **/
  async getTypes({commit, state}) {
    try {
      let response = await this.$axios.get(`/types`)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_TYPES, response.data.data);
        return state.types
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async createType({commit}, data) {
    try {
      let response = await this.$axios.post(`/types/create`, data)
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
  async updateTypes({commit, state}, data) {
    try {
      let response = await this.$axios.post(`/types/update`, data)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_TYPES, response.data.data);
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        return state.types
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async deleteType({commit, state}, id) {
    try {
      let response = await this.$axios.delete(`/types/delete/${id}`)
      if (apiHandler.isSuccess(response.status)) {
        commit(REMOVE_TYPE_BY_ID, id);
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        return state.types
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  }
}
