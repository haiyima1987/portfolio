import Heading from "~/models/Heading";

export default class HeadingType {
  constructor(id, name, headings) {
    this.id = id
    this.name = name
    this.headings = headings ? headings.map(heading => Heading.parseFromDataObject(heading)) : null
  }

  static parseFromDataObject(data) {
    return new HeadingType(data.id, data.name, data.headings)
  }
}
