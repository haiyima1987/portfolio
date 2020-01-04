import Skill from "~/models/Skill";
import Scope from "~/models/Scope";
import Category from "~/models/Category";
import Type from "~/models/Type";
import BasicProject from "~/models/BasicProject";
import Project from "~/models/Project";

export const SET_PROJECTS = 'setProjects';
export const SET_SELECTED_PROJECT = 'setSelectedProject';
export const SET_PROJECT_DATA = 'setProjectData';
export const REMOVE_PROJECT_BY_ID = 'removeProjectById';
export const SET_SKILLS = 'setSkills';
export const REMOVE_SKILL_BY_ID = 'removeSkillById';
export const SET_SCOPES = 'setScopes';
export const REMOVE_SCOPE_BY_ID = 'removeScopeById';
export const SET_CATEGORIES = 'setCategories';
export const REMOVE_CATEGORY_BY_ID = 'removeCategoryById';
export const SET_TYPES = 'setTypes';
export const REMOVE_TYPE_BY_ID = 'removeTypeById';

export default {
  setProjects: function (state, projects) {
    state.projects = projects.map(project => BasicProject.parseFromDataObject(project))
  },
  setSelectedProject: function (state, {project}) {
    state.selectedProject = Project.parseFromDataObject(project)
  },
  setProjectData: function (state, {categories, skills, types}) {
    state.categories = categories.map(category => Category.parseFromDataObject(category))
    state.skills = skills.map(skill => Skill.parseFromDataObject(skill))
    state.types = types.map(type => Type.parseFromDataObject(type))
  },
  removeProjectById: function (state, id) {
    state.projects = state.projects.filter(project => project.id != id)
  },
  setSkills: function (state, skills) {
    state.skills = skills.map(skill => Skill.parseFromDataObject(skill))
  },
  removeSkillById: function (state, id) {
    state.skills = state.skills.filter(skill => skill.id != id)
  },
  setScopes: function (state, scopes) {
    state.scopes = scopes.map(scope => Scope.parseFromDataObject(scope))
  },
  removeScopeById: function (state, id) {
    state.scopes = state.scopes.filter(scope => scope.id != id)
  },
  setCategories: function (state, categories) {
    state.categories = categories.map(category => Category.parseFromDataObject(category))
  },
  removeCategoryById: function (state, id) {
    state.categories = state.categories.filter(category => category.id != id)
  },
  setTypes: function (state, types) {
    state.types = types.map(type => Type.parseFromDataObject(type))
  },
  removeTypeById: function (state, id) {
    state.types = state.types.filter(type => type.id != id)
  }
}
