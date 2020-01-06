import apiHandler from "~/utils/ApiHandler";
import {SET_ERROR_MESSAGE, SET_INFO_TYPES, SET_PUBLISHED, SET_RESUME_DATA} from "~/store/mutations";
import LocalDataHandler from "~/utils/LocalDataHandler";
import {SET_ACCESS_TOKEN} from "~/store/auth/mutations";

export const GET_PUBLISHED = 'getPublished';
export const GET_RESUME_DATA = 'getResumeData';
export const GET_ABOUT_DATA = 'getAboutData';

export default {
  async getPublished({commit}) {
    try {
      let response = await this.$axios.get('/published')
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_PUBLISHED, response.data.data)
        return true
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data)
      return false
    }
  },
  async getResumeData({commit}) {
    try {
      let response = await this.$axios.get('/resume')
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_RESUME_DATA, response.data.data)
        return true
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data)
      return false
    }
  },
  async getAboutData({commit}) {
    try {
      let response = await this.$axios.get('/about')
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_INFO_TYPES, response.data.data)
        return true
      }
      return false
    } catch (e) {
      commit(SET_ERROR_MESSAGE, e.response.data)
      return false
    }
  },
  async nuxtServerInit({dispatch, commit}, {req}) {
    if (req.headers && req.headers.cookie) {
      let accessToken = LocalDataHandler.getTokenByHeader(req.headers.cookie)
      if (accessToken) {
        commit(SET_ACCESS_TOKEN, accessToken)
      }
    }
  }
}
