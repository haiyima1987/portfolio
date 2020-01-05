import Project from "~/models/Project";

export default class Skill {
  constructor(id, name, level, displayIndex, scopeId, projects) {
    this.id = id
    this.name = name
    this.level = level
    this.displayIndex = displayIndex
    this.scopeId = scopeId
    this.projects = projects ? projects
      .map(project => Project.parseFromDataObject(project))
      .sort((projectA, projectB) => projectA.displayIndex > projectB.displayIndex) : null
  }

  static parseFromDataObject(data) {
    return new Skill(data.id, data.name, data.level, data.display_index, data.scope_id, data.projects)
  }
}
