export default {
  isAuthenticated: function (state) {
    return state.isAuthenticated
  },
  getAuthError: function (state) {
    return state.authError
  }
}
