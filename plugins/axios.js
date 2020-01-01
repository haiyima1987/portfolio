const INCREASE_ACTIVE_CALLS = 'increaseActiveCalls'
const DECREASE_ACTIVE_CALLS = 'decreaseActiveCalls'
const SET_LOADING = 'setLoading'

export default function ({$axios, store, redirect}) {
  // on request and response
  $axios.onRequest(config => {
    // add token to header
    const token = store.state.auth.accessToken
    if (token) {
      config.headers.common['Authorization'] = `Bearer ${token}`
    }
    // increase the count of api calls
    increaseActiveCount(store)
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
