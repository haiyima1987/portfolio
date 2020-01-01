import Skill from "~/models/Skill";
import Scope from "~/models/Scope";

export const SET_SKILLS = 'setSkills';
export const REMOVE_SKILL_BY_ID = 'removeSkillById';
export const SET_SCOPES = 'setScopes';

export default {
  setSkills: function (state, skills) {
    state.skills = skills.map(skill => Skill.parseFromDataObject(skill))
  },
  removeSkillById: function (state, id) {
    state.skills = state.skills.filter(skill => skill.id != id)
  },
  setScopes: function (state, scopes) {
    state.scopes = scopes.map(scope => Scope.parseFromDataObject(scope))
  }
}
