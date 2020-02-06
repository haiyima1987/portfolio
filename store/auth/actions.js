import apiHandler from "~/utils/ApiHandler"
import {ON_LOGIN_FAILURE, ON_LOGIN_SUCCESS} from "~/store/auth/mutations"

export const LOGIN = 'auth/login'

export default {
  async login({commit}, data) {
    try {
      data.grant_type = 'password'
      data.username = data.email
      data.client_id = process.env.NUXT_ENV_CLIENT_ID
      data.client_secret = process.env.NUXT_ENV_CLIENT_SECRET
      let response = await this.$axios.post(`${process.env.NUXT_ENV_API_URL}/oauth/token`, data)
      if (apiHandler.isSuccess(response.status)) {
        commit(ON_LOGIN_SUCCESS, response.data)
        return true
      }
      return false
    } catch (e) {
      commit(ON_LOGIN_FAILURE, e.response.data)
      return false
    }
  }
}
