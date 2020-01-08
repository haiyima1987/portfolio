import HeadingType from "~/models/HeadingType";

export default class Heading {
  constructor(id, title, text, published, displayIndex,
              headingTypeId, headingType) {
    this.id = id
    this.title = title
    this.text = text
    this.published = published
    this.displayIndex = displayIndex
    this.headingTypeId = headingTypeId
    this.headingType = headingType ? HeadingType.parseFromDataObject(headingType) : null
  }

  static parseFromDataObject(data) {
    return new Heading(data.id, data.title, data.text, data.published, data.display_index,
      data.heading_type_id, data.heading_type)
  }
}
