import apiHandler from "~/utils/ApiHandler";
import {SET_PROJECTS} from "~/store/mutations";
import LocalDataHandler from "~/utils/LocalDataHandler";
import {SET_ACCESS_TOKEN} from "~/store/auth/mutations";

export const GET_PROJECTS = 'getProjects';

export default {
  async getProjects({commit}) {
    try {
      let response = await this.$axios.get('/projects')
      console.log(response)
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_PROJECTS, response.data.data.projects)
        return true
      }
      return false
    } catch (e) {
      console.log(e)
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
