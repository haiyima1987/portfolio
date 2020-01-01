export default class AppMessage {
  constructor (message, isPersistent = false, isError = false) {
    this.message = message ? message : 'Error'
    this.isPersistent = !!isPersistent
    this.isError = !!isError
  }

  static parseFromDataObject (data) {
    return new AppMessage(data.message, data.isPersistent, data.isError)
  }
}
