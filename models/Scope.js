export default class Scope {
  constructor(id, name, displayIndex) {
    this.id = id
    this.name = name
    this.displayIndex = displayIndex
  }

  static parseFromDataObject(data) {
    return new Scope(data.id, data.name, data.display_index)
  }
}
