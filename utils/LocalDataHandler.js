class LocalDataHandler {
  constructor() {
    this.KEY_LOCAL_KEYS = 'local_keys'
    this.KEY_ACTIVE_USER = 'active_user'
    this.KEY_ACCESS_TOKEN = 'access_token'
    this.KEY_REFRESH_TOKEN = 'refresh_token'
    this.KEY_MENU_ID = 'menu_id'
    this.KEY_WARNING = 'warning'
    this.PERSISTENT_KEYS = [this.KEY_REFRESH_TOKEN]
  }

  /**
   * Function to get the instance of the cookie handler
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new LocalDataHandler()
    }
    return this.instance
  }

  /**
   * Function to retrieve a cookie
   * @param sKey key of the cookie
   */
  get(sKey) {
    if (!sKey) {
      return null
    }
    return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null
  }

  /**
   * Function to set a cookie
   * @param sKey key of the cookie
   * @param sValue value of the cookie
   * @param vEnd duration of the cookie(ms)
   * @param sPath path of the cookie
   * @param sDomain domain of the cookie
   */
  set(sKey, sValue, vEnd = 3600, sPath = null, sDomain = null) {
    if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
      return false
    }
    let sExpires = ''
    if (vEnd) {
      let end = this.end(vEnd)
      sExpires = end === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; expires=' + end
    }
    document.cookie =
      encodeURIComponent(sKey) + '=' +
      encodeURIComponent(sValue) +
      sExpires +
      (sDomain ? '; domain=' + sDomain : '') +
      (sPath ? '; path=' + sPath : '') +
      (window.location.href.match('https') ? '; secure' : '')
    return true
  }

  /**
   * Function to remove a cookie
   * @param sKey key of the cookie
   * @param sPath path of the cookie
   * @param sDomain domain of the cookie
   */
  remove(sKey, sPath = '', sDomain = null) {
    if (!this.has(sKey)) {
      return false
    }
    document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '')
    return true
  }

  /**
   * Function to destroy all cookies
   */
  destroy() {
    // clear all cookies
    for (let key of this.keys()) {
      if (!this.PERSISTENT_KEYS.includes(key)) {
        this.remove(key, '/')
      }
    }
    // clear all local storage
    this.clearLocalData()
  }

  clearLocalData() {
    let keys = localStorage.getItem(this.KEY_LOCAL_KEYS)
    if (keys == null) {
      return
    }
    let keyArray = JSON.parse(keys)
    for (let keyName of keyArray) {
      localStorage.removeItem(keyName)
    }
    localStorage.removeItem(this.KEY_LOCAL_KEYS)
  }

  /**
   * Function to check if cookie exists
   * @param sKey key of the cookie
   */
  has(sKey) {
    if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
      return false
    }
    return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') + '\\s*\\=')).test(document.cookie)
  }

  /**
   * Function to retrieve all stored cookie keys
   */
  keys() {
    let aKeys = document.cookie.replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:=[^;]*)?;\s*/)
    for (let nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx])
    }
    return aKeys
  }

  end(maxAge) {
    return maxAge === Infinity ? 'Fri, 31 Dec 9999 23:59:59 GMT' : (new Date(maxAge * 1e3 + Date.now())).toUTCString()
  }

  /** functions to deal with access token **/
  getAccessToken() {
    return this.get(this.KEY_ACCESS_TOKEN)
  }

  updateAccessToken(token) {
    return this.set(this.KEY_ACCESS_TOKEN, token, 3600 * 24, '/', process.env.NUXT_ENV_HOST)
  }

  getAccessTokenByHeader(cookies) {
    let cookieArray = cookies.split(';')
    let needle = `${this.KEY_ACCESS_TOKEN}=`
    let cookieString = cookieArray.find(cookie => cookie.includes(needle))
    return cookieString ? cookieString.substr(needle.length) : null
  }

  getRefreshToken() {
    return this.get(this.KEY_REFRESH_TOKEN)
  }

  updateRefreshToken(token) {
    return this.set(this.KEY_REFRESH_TOKEN, token, 3600 * 24 * 30, '/', process.env.NUXT_ENV_HOST)
  }

  getRefreshTokenByHeader(cookies) {
    let cookieArray = cookies.split(';')
    let needle = `${this.KEY_REFRESH_TOKEN}=`
    let cookieString = cookieArray.find(cookie => cookie.includes(needle))
    return cookieString ? cookieString.substr(needle.length) : null
  }

  /** general functions to save data into local storage **/
  saveLocalKey(keyName) {
    let keys = localStorage.getItem(this.KEY_LOCAL_KEYS)
    if (keys == null) {
      localStorage.setItem(this.KEY_LOCAL_KEYS, JSON.stringify([keyName]))
      return
    }
    let keyArray = JSON.parse(keys)
    if (keyArray.indexOf(keyName) === -1) {
      keyArray.push(keyName)
      localStorage.setItem(this.KEY_LOCAL_KEYS, JSON.stringify(keyArray))
    }
  }

  saveLocalData(keyName, data) {
    this.saveLocalKey(keyName)
    if (typeof data === 'string') {
      localStorage.setItem(keyName, data)
      return
    }
    localStorage.setItem(keyName, JSON.stringify(data))
  }

  persistLocalData(keyName, data) {
    if (typeof data === 'string') {
      localStorage.setItem(keyName, data)
      return
    }
    localStorage.setItem(keyName, JSON.stringify(data))
  }

  getLocalData(keyName) {
    let data = localStorage.getItem(keyName)
    if (data == null) return data
    try {
      // return the parsed json object
      return JSON.parse(data)
    } catch (e) {
      // error means this is not a json data, which is a saved string
      return data
    }
  }

  removeLocalKey(keyName) {
    let keys = localStorage.getItem(this.KEY_LOCAL_KEYS)
    if (keys == null) {
      return
    }
    let keyArray = JSON.parse(keys)
    let index = keyArray.indexOf(keyName)
    if (index !== -1) {
      keyArray.splice(index, 1)
      localStorage.setItem(this.KEY_LOCAL_KEYS, JSON.stringify(keyArray))
    }
  }

  removeLocalData(keyName) {
    this.removeLocalKey(keyName)
    localStorage.removeItem(keyName)
  }

  /** key-specific functions to save data into local storage **/
  updateUser(user) {
    this.saveLocalData(this.KEY_ACTIVE_USER, user)
  }

  getUser() {
    // get the active user from local storage
    if (localStorage.getItem(this.KEY_ACTIVE_USER) != null) {
      // return the user after parsing
      return JSON.parse(localStorage.getItem(this.KEY_ACTIVE_USER))
    }
    return null
  }

  /** UX **/
  saveMenuId(id) {
    this.saveLocalData(this.KEY_MENU_ID, id)
  }

  getMenuId() {
    return this.getLocalData(this.KEY_MENU_ID)
  }
}

export default LocalDataHandler.getInstance()
