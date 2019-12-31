export default class Type {
  constructor(id, name, displayIndex) {
    this.id = id
    this.name = name
    this.displayIndex = displayIndex
  }

  static parseFromDataObject(data) {
    return new Type(data.id, data.name, data.display_index)
  }
}
