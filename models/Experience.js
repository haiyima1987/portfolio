export default class Experience {
  constructor(id, start, end, company, position,
              city, country, explanation, published, displayIndex) {
    this.id = id
    this.start = start
    this.end = end
    this.company = company
    this.position = position
    this.city = city
    this.country = country
    this.explanation = explanation
    this.published = published
    this.displayIndex = displayIndex
  }

  static parseFromDataObject(data) {
    return new Experience(data.id, data.start, data.end, data.company, data.position,
      data.city, data.country, data.explanation, data.published, data.displayIndex)
  }
}
