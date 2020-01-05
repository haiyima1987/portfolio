import Experience from "~/models/Experience";
import Education from "~/models/Education";

export const SET_EXPERIENCES = 'setExperiences';
export const SET_SELECTED_EXPERIENCE = 'setSelectedExperience';
export const REMOVE_EXPERIENCE_BY_ID = 'removeExperienceById';
export const SET_EDUCATIONS = 'setEducations';
export const SET_SELECTED_EDUCATION = 'setSelectedEducation';
export const REMOVE_EDUCATION_BY_ID = 'removeEducationById';

export default {
  setExperiences: function (state, experiences) {
    state.experiences = experiences.map(experience => Experience.parseFromDataObject(experience))
  },
  setSelectedExperience: function (state, experience) {
    state.selectedExperience = Experience.parseFromDataObject(experience)
  },
  removeExperienceById: function (state, id) {
    state.experiences = state.experiences.filter(experience => experience.id != id)
  },
  setEducations: function (state, educations) {
    state.educations = educations.map(education => Education.parseFromDataObject(education))
  },
  setSelectedEducation: function (state, education) {
    state.selectedEducation = Education.parseFromDataObject(education)
  },
  removeEducationById: function (state, id) {
    state.educations = state.educations.filter(education => education.id != id)
  }
}
