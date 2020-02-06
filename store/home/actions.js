import apiHandler from "~/utils/ApiHandler";
import {SET_ERROR_MESSAGE, SET_SUCCESS_MESSAGE} from "~/store/mutations";
import {
  REMOVE_HEADING_BY_ID,
  REMOVE_HEADING_TYPE_BY_ID,
  SET_HEADING_TYPES,
  SET_HEADINGS,
  SET_SELECTED_HEADING,
  SET_SELECTED_HEADING_TYPE
} from "~/store/home/mutations";

export const GET_HEADINGS = 'home/getHeadings';
export const GET_HEADING_BY_ID = 'home/getHeadingById';
export const CREATE_HEADING = 'home/createHeading';
export const UPDATE_HEADING = 'home/updateHeading';
export const UPDATE_HEADING_DISPLAY_INDEX = 'home/updateHeadingDisplayIndex';
export const DELETE_HEADING = 'home/deleteHeading';
export const GET_HEADING_TYPES = 'home/getHeadingTypes';
export const GET_HEADING_TYPE_BY_ID = 'home/getHeadingTypeById';
export const CREATE_HEADING_TYPE = 'home/createHeadingType';
export const UPDATE_HEADING_TYPE = 'home/updateHeadingType';
export const UPDATE_HEADING_TYPE_DISPLAY_INDEX = 'home/updateHeadingTypeDisplayIndex';
export const DELETE_HEADING_TYPE = 'home/deleteHeadingType';

export default {
  /** headings **/
  async getHeadings({commit, state}) {
    try {
      let response = await this.$axios.get('/home/headings')
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_HEADING_TYPES, response.data.data);
        return state.headingTypes
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async getHeadingById({commit}, id) {
    try {
      let response = await this.$axios.get(`/home/headings/${id}`)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SELECTED_HEADING, response.data.data.heading);
        commit(SET_HEADING_TYPES, response.data.data.headingTypes);
        return true
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async createHeading({commit}, data) {
    try {
      let response = await this.$axios.post('/home/headings/create', data)
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
  async updateHeading({commit}, data) {
    try {
      let response = await this.$axios.post('/home/headings/update', data)
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
  async updateHeadingDisplayIndex({commit}, headings) {
    try {
      let response = await this.$axios.post('/home/headings/update/display-index', headings)
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
  async deleteHeading({commit, state}, id) {
    try {
      let response = await this.$axios.delete(`/home/headings/delete/${id}`)
      if (apiHandler.isSuccess(response.status)) {
        commit(REMOVE_HEADING_BY_ID, id);
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        return state.headingTypes
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  /** heading types **/
  async getHeadingTypes({commit, state}) {
    try {
      let response = await this.$axios.get('/home/types')
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_HEADING_TYPES, response.data.data);
        return state.headingTypes
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async getHeadingTypeById({commit}, id) {
    try {
      let response = await this.$axios.get(`/home/types/${id}`)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SELECTED_HEADING_TYPE, response.data.data);
        return true
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async createHeadingType({commit}, data) {
    try {
      let response = await this.$axios.post('/home/types/create', data)
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
  async updateHeadingType({commit}, data) {
    try {
      let response = await this.$axios.post('/home/types/update', data)
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
  async updateHeadingTypeDisplayIndex({commit}, headingTypes) {
    try {
      let response = await this.$axios.post('/home/types/update/display-index', headingTypes)
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
  async deleteHeadingType({commit, state}, id) {
    try {
      let response = await this.$axios.delete(`/home/types/delete/${id}`)
      if (apiHandler.isSuccess(response.status)) {
        commit(REMOVE_HEADING_TYPE_BY_ID, id);
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        return state.headingTypes
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  }
}
