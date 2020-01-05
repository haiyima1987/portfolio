import InfoType from "~/models/InfoType";

export default class Info {
  constructor(id, key, value, published, displayIndex,
              infoTypeId, infoType) {
    this.id = id
    this.key = key
    this.value = value
    this.published = published
    this.displayIndex = displayIndex
    this.infoTypeId = infoTypeId
    this.infoType = infoType ? InfoType.parseFromDataObject(infoType) : null
  }

  static parseFromDataObject(data) {
    return new Info(data.id, data.key, data.value, data.published, data.display_index,
      data.info_type_id, data.info_type)
  }
}
