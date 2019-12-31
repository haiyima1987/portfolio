import apiHandler from "~/utils/ApiHandler";
import {ON_LOGIN_FAILURE, ON_LOGIN_SUCCESS} from "~/store/auth/mutations";

export const LOGIN = 'auth/login';

export default {
  async login({commit}, data) {
    try {
      let response = await this.$axios.post('/login', data)
      if (apiHandler.isSuccess(response.status)) {
        commit(ON_LOGIN_SUCCESS, response.data.data);
        return true
      }
      return false
    } catch (e) {
      commit(ON_LOGIN_FAILURE, e.response.data);
      return false
    }
  }
}
