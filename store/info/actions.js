import apiHandler from "~/utils/ApiHandler";
import {SET_ERROR_MESSAGE, SET_SUCCESS_MESSAGE} from "~/store/mutations";
import {
  REMOVE_INFO_TYPE_BY_ID,
  SET_INFO_TYPES,
  SET_SELECTED_INFO,
  SET_SELECTED_INFO_TYPE
} from "~/store/info/mutations";

export const GET_INFOS = 'info/getInfos';
export const GET_INFO_BY_ID = 'info/getInfoById';
export const CREATE_INFO = 'info/createInfo';
export const UPDATE_INFO = 'info/updateInfo';
export const UPDATE_INFO_DISPLAY_INDEX = 'info/updateInfoDisplayIndex';
export const DELETE_INFO = 'info/deleteInfo';
export const GET_INFO_TYPES = 'info/getInfoTypes';
export const GET_INFO_TYPE_BY_ID = 'info/getInfoTypeById';
export const CREATE_INFO_TYPE = 'info/createInfoType';
export const UPDATE_INFO_TYPE = 'info/updateInfoType';
export const UPDATE_INFO_TYPE_DISPLAY_INDEX = 'info/updateInfoTypeDisplayIndex';
export const DELETE_INFO_TYPE = 'info/deleteInfoType';

export default {
  /** personal information **/
  async getInfos({commit, state}) {
    try {
      let response = await this.$axios.get('/info/infos')
      if (apiHandler.isSuccess(response.status)) {
        // here set info types due to the rendering of categorized infos (categorized by info types)
        commit(SET_INFO_TYPES, response.data.data)
        return state.infoTypes
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async getInfoById({commit}, id) {
    try {
      let response = await this.$axios.get(`/info/infos/${id}`)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SELECTED_INFO, response.data.data.info);
        commit(SET_INFO_TYPES, response.data.data.infoTypes);
        return true
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async createInfo({commit}, data) {
    try {
      let response = await this.$axios.post('/info/infos/create', data)
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
  async updateInfo({commit}, data) {
    try {
      let response = await this.$axios.post('/info/infos/update', data)
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
  async updateInfoDisplayIndex({commit}, infos) {
    try {
      let response = await this.$axios.post('/info/infos/update/display-index', infos)
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
  async deleteInfo({commit, state}, id) {
    try {
      let response = await this.$axios.delete(`/info/infos/delete/${id}`)
      if (apiHandler.isSuccess(response.status)) {
        // commit(REMOVE_INFO_BY_ID, id);
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        return true
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  /** personal info types **/
  async getInfoTypes({commit, state}) {
    try {
      let response = await this.$axios.get('/info/types')
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_INFO_TYPES, response.data.data);
        return state.infoTypes
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async getInfoTypeById({commit}, id) {
    try {
      let response = await this.$axios.get(`/info/types/${id}`)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SELECTED_INFO_TYPE, response.data.data);
        return true
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  },
  async createInfoType({commit}, data) {
    try {
      let response = await this.$axios.post('/info/types/create', data)
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
  async updateInfoType({commit}, data) {
    try {
      let response = await this.$axios.post('/info/types/update', data)
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
  async updateInfoTypeDisplayIndex({commit}, infoTypes) {
    try {
      let response = await this.$axios.post('/info/types/update/display-index', infoTypes)
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
  async deleteInfoType({commit, state}, id) {
    try {
      let response = await this.$axios.delete(`/info/types/delete/${id}`)
      if (apiHandler.isSuccess(response.status)) {
        commit(REMOVE_INFO_TYPE_BY_ID, id);
        commit(SET_SUCCESS_MESSAGE, undefined, {root: true})
        return state.infoTypes
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data, {root: true})
      return false
    }
  }
}
