import Skill from "~/models/Skill";

export default class Scope {
  constructor(id, name, displayIndex, skills) {
    this.id = id
    this.name = name
    this.displayIndex = displayIndex
    this.skills = skills ? skills
      .map(skill => Skill.parseFromDataObject(skill))
      .sort((skillA, skillB) => skillA.displayIndex > skillB.displayIndex) : null
  }

  static parseFromDataObject(data) {
    return new Scope(data.id, data.name, data.display_index, data.skills)
  }
}
