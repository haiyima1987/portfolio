import HeadingType from "~/models/HeadingType";
import Heading from "~/models/Heading";

export const SET_HEADINGS = 'setHeadings';
export const SET_SELECTED_HEADING = 'setSelectedHeading';
export const REMOVE_HEADING_BY_ID = 'removeHeadingById';
export const SET_HEADING_TYPES = 'setHeadingTypes';
export const SET_SELECTED_HEADING_TYPE = 'setSelectedHeadingType';
export const REMOVE_HEADING_TYPE_BY_ID = 'removeHeadingTypeById';

export default {
  setHeadings: function (state, headings) {
    state.headings = headings.map(heading => Heading.parseFromDataObject(heading))
  },
  setSelectedHeading: function (state, heading) {
    state.selectedHeading = Heading.parseFromDataObject(heading)
  },
  removeHeadingById: function (state, id) {
    state.headings = state.headings.filter(heading => heading.id != id)
  },
  setHeadingTypes: function (state, headingTypes) {
    state.headingTypes = headingTypes.map(headingType => HeadingType.parseFromDataObject(headingType))
  },
  setSelectedHeadingType: function (state, headingType) {
    state.selectedHeadingType = HeadingType.parseFromDataObject(headingType)
  },
  removeHeadingTypeById: function (state, id) {
    state.headingTypes = state.headingTypes.filter(headingType => headingType.id != id)
  }
}
