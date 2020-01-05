import Info from "~/models/Info";

export default class InfoType {
  constructor(id, name, displayIndex, infos) {
    this.id = id
    this.name = name
    this.displayIndex = displayIndex
    this.infos = infos ? infos.map(info => Info.parseFromDataObject(info)) : null
  }

  static parseFromDataObject(data) {
    return new InfoType(data.id, data.name, data.display_index, data.infos)
  }
}
