import LocalDataHandler from "~/utils/LocalDataHandler";

const INCREASE_ACTIVE_CALLS = 'increaseActiveCalls'
const DECREASE_ACTIVE_CALLS = 'decreaseActiveCalls'
const SET_LOADING = 'setLoading'
const SET_ACCESS_TOKEN = 'auth/setAccessToken'
const SET_REFRESH_TOKEN = 'auth/setRefreshToken'

export default function ({$axios, store, redirect}) {
  // on request and response
  $axios.onRequest(config => {
    // add token to header
    const accessToken = store.state.auth.accessToken
    if (accessToken) {
      config.headers.common['Authorization'] = `Bearer ${accessToken}`
    } else if (process.browser) {
      // if the token doesn't exist, it's probably a refresh in client mode
      setAccessToken(store, config)
    }
    // get the token on refresh
    // increase the count of api calls
    increaseActiveCount(store);
  })
  $axios.onRequestError(error => {
    decreaseActiveCount(store)
  })
  $axios.onResponse(response => {
    // decrease the count
    decreaseActiveCount(store)
  })
  $axios.onResponseError(error => {
    decreaseActiveCount(store)
  })
}

/** this function is similar to nuxtServerInit in server mode **/
function setAccessToken(store, config) {
  const accessToken = LocalDataHandler.getAccessToken()
  if (accessToken) {
    config.headers.common['Authorization'] = `Bearer ${accessToken}`
    store.commit(SET_ACCESS_TOKEN, accessToken)
    // refresh token is always set together with access token, so directly set it here
    store.commit(SET_REFRESH_TOKEN, LocalDataHandler.getRefreshToken())
  }
}

function decreaseActiveCount(store) {
  store.commit(DECREASE_ACTIVE_CALLS)
  if (store.state.activeCalls == 0) {
    store.commit(SET_LOADING, false)
  }
}

function increaseActiveCount(store) {
  store.commit(INCREASE_ACTIVE_CALLS)
  store.commit(SET_LOADING, true)
}
