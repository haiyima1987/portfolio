import apiHandler from "~/utils/ApiHandler";
import {SET_ERROR_MESSAGE, SET_PUBLISHED} from "~/store/mutations";
import LocalDataHandler from "~/utils/LocalDataHandler";
import {SET_ACCESS_TOKEN} from "~/store/auth/mutations";

export const GET_PUBLISHED = 'getPublished';

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
  async nuxtServerInit({dispatch, commit}, {req}) {
    if (req.headers && req.headers.cookie) {
      let accessToken = LocalDataHandler.getTokenByHeader(req.headers.cookie)
      if (accessToken) {
        commit(SET_ACCESS_TOKEN, accessToken)
      }
    }
  }
}
