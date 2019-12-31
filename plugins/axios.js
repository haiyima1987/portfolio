export default function ({$axios, store, redirect}) {
  // on request and response
  $axios.onRequest(config => {
    const token = store.state.auth.accessToken
    if (token) {
      config.headers.common['Authorization'] = `Bearer ${token}`
    }
  })
  $axios.onResponse(response => {
  })
}
