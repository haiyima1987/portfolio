export default class Education {
  constructor(id, start, end, college, major,
              city, country, explanation, published, displayIndex) {
    this.id = id
    this.start = start
    this.end = end
    this.college = college
    this.major = major
    this.city = city
    this.country = country
    this.explanation = explanation
    this.published = published
    this.displayIndex = displayIndex
  }

  static parseFromDataObject(data) {
    return new Education(data.id, data.start, data.end, data.college, data.major,
      data.city, data.country, data.explanation, data.published, data.display_index)
  }
}
