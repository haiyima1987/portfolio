import Info from "~/models/Info";
import InfoType from "~/models/InfoType";

export const SET_INFOS = 'setInfos';
export const SET_SELECTED_INFO = 'setSelectedInfo';
export const REMOVE_INFO_BY_ID = 'removeInfoById';
export const SET_INFO_TYPES = 'setInfoTypes';
export const SET_SELECTED_INFO_TYPE = 'setSelectedInfoType';
export const REMOVE_INFO_TYPE_BY_ID = 'removeInfoTypeById';

export default {
  setInfos: function (state, infos) {
    state.infos = infos.map(info => Info.parseFromDataObject(info))
  },
  setSelectedInfo: function (state, info) {
    state.selectedInfo = Info.parseFromDataObject(info)
  },
  removeInfoById: function (state, id) {
    state.infos = state.infos.filter(info => info.id != id)
  },
  setInfoTypes: function (state, infoTypes) {
    state.infoTypes = infoTypes.map(infoType => InfoType.parseFromDataObject(infoType))
  },
  setSelectedInfoType: function (state, infoType) {
    state.selectedInfoType = InfoType.parseFromDataObject(infoType)
  },
  removeInfoTypeById: function (state, id) {
    state.infoTypes = state.infoTypes.filter(infoType => infoType.id != id)
  }
}
