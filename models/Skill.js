export default class Skill {
  constructor(id, name, level, displayIndex, scopeId) {
    this.id = id
    this.name = name
    this.level = level
    this.displayIndex = displayIndex
    this.scopeId = scopeId
  }

  static parseFromDataObject(data) {
    return new Skill(data.id, data.name, data.level, data.display_index, data.scope_id)
  }
}
