import Skill from "~/models/Skill";
import Type from "~/models/Type";
import Category from "~/models/Category";

export default class Project {
  constructor(id, name, description, year, repository,
              link, siteLink, mediaLink, previewLink, displayIndex,
              published, category, type, skills) {
    this.id = id
    this.name = name
    this.description = description
    this.year = year
    this.repository = repository
    this.link = link
    this.siteLink = siteLink
    this.mediaLink = mediaLink
    this.previewLink = previewLink
    this.displayIndex = displayIndex
    this.published = published
    this.category = category ? Category.parseFromDataObject(category) : null
    this.type = type ? Type.parseFromDataObject(type) : null
    this.skills = skills ? skills
      .map(skill => Skill.parseFromDataObject(skill))
      .sort((skillA, skillB) => skillA.displayIndex > skillB.displayIndex) : null
  }

  static parseFromDataObject(data) {
    return new Project(data.id, data.name, data.description, data.year, data.repository,
      data.link, data.site_link, data.media_link, data.preview_link, data.display_index,
      data.published, data.category, data.type, data.skills)
  }
}
