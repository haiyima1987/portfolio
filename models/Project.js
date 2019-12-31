import Skill from "~/models/Skill";
import Type from "~/models/Type";
import Category from "~/models/Category";

export default class Project {
  constructor(id, name, description, year, link,
              repository, mediaLink, displayIndex, category, type,
              skills) {
    this.id = id
    this.name = name
    this.description = description
    this.year = year
    this.link = link
    this.repository = repository
    this.mediaLink = mediaLink
    this.displayIndex = displayIndex
    this.category = Category.parseFromDataObject(category)
    this.type = Type.parseFromDataObject(type)
    this.skills = skills
      .map(skill => Skill.parseFromDataObject(skill))
      .sort((skillA, skillB) => skillA.displayIndex > skillB.displayIndex)
  }

  static parseFromDataObject(data) {
    return new Project(data.id, data.name, data.description, data.year, data.link,
      data.repository, data.media_link, data.display_index, data.category, data.type,
      data.skills)
  }
}
