import LocalDataHandler from "~/utils/LocalDataHandler";

export const ON_LOGIN_SUCCESS = 'onLoginSuccess';
export const SET_ACCESS_TOKEN = 'auth/setAccessToken';
export const ON_LOGIN_FAILURE = 'onLoginFailure';

export default {
  onLoginSuccess: function (state, {token}) {
    LocalDataHandler.updateAccessToken(token)
    state.acceesToken = token
    state.isAuthenticated = true
    state.authError = false
  },
  setAccessToken: function (state, token) {
    state.isAuthenticated = true
    state.accessToken = token
  },
  onLoginFailure: function (state, {error}) {
    state.isAuthenticated = false
    state.authError = true
    state.errorText = error
  }
}
