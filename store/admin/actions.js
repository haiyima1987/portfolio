import apiHandler from "~/utils/ApiHandler";
import {REMOVE_SKILL_BY_ID, SET_SCOPES, SET_SKILLS} from "~/store/admin/mutations";
import {SET_ERROR_MESSAGE, SET_SUCCESS_MESSAGE} from "~/store/mutations";

export const GET_SKILLS = 'admin/getSkills';
export const CREATE_SKILL = 'admin/createSkill';
export const UPDATE_SKILLS = 'admin/updateSkills';
export const DELETE_SKILL = 'admin/deleteSkill';
export const GET_SCOPES = 'admin/getScopes';

export default {
  async getSkills({commit, state}) {
    try {
      let response = await this.$axios.get('/skills')
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SKILLS, response.data.data);
        // return response.data.data
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
      return !!apiHandler.isSuccess(response.status);
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
        return response.data.data
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
        return state.skills
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async getScopes({commit, state}, id) {
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
  }
}
