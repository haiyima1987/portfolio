export default class Category {
  constructor(id, name, displayIndex) {
    this.id = id
    this.name = name
    this.displayIndex = displayIndex
  }

  static parseFromDataObject(data) {
    return new Category(data.id, data.name, data.display_index)
  }
}
