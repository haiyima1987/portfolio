export default class BasicProject {
  constructor(id, name, description, year, repository,
              link, displayIndex) {
    this.id = id
    this.name = name
    this.description = description
    this.year = year
    this.repository = repository
    this.link = link
    this.displayIndex = displayIndex
  }

  static parseFromDataObject(data) {
    return new BasicProject(data.id, data.name, data.description, data.year, data.repository,
      data.link, data.display_index)
  }
}
