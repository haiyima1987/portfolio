const RESPONSE_TYPES = {
  STATUS_OK: 200,
  STATUS_CREATED: 201,
  STATUS_NO_CONTENT: 204,
  STATUS_UNAUTHORIZED: 401
}

class ApiHandler {
  constructor() {
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ApiHandler()
    }
    return this.instance
  }

  isSuccess(statusCode) {
    return (
      statusCode === RESPONSE_TYPES.STATUS_OK ||
      statusCode === RESPONSE_TYPES.STATUS_CREATED ||
      statusCode === RESPONSE_TYPES.STATUS_NO_CONTENT
    )
  }

  parseFormData(data) {
    let formData = new FormData()
    // get the first level of data
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (Array.isArray(data[key])) {
          // here data[key] is an array, we need both index and value below
          for (const [index, value] of data[key].entries()) {
            // the value is an object, so loop through each key
            for (const childKey in value) {
              if (value.hasOwnProperty(childKey)) {
                console.log(`${key}[${index}].${childKey}`, value[childKey])
                // parse the data to correct format for array of objects
                formData.append(`${key}[${index}].${childKey}`, value[childKey])
              }
            }
          }
        } else {
          formData.append(key, data[key])
        }
      }
    }
    return formData
  }

  parseNonArrayFormData(data) {
    let formData = new FormData()
    // get the first level of data
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (!Array.isArray(data[key])) {
          formData.append(key, data[key])
        }
      }
    }
    return formData
  }
}

export default ApiHandler.getInstance()
