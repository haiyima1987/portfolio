import Skill from "~/models/Skill";

export const SET_SKILLS = 'setSkills';

export default {
  setSkills: function (state, skills) {
    state.skills = skills.map(skill => Skill.parseFromDataObject(skill))
  }
}
