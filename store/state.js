export default () => ({
  // api calls
  isLoading: false,
  activeCalls: 0,
  // website content
  publishedProjects: [],
  scopes: [],
  experiences: [],
  educations: [],
  infoTypes: [],
  headingTypes: [],
  // form related props
  formData: {},
  // DOM
  isModalShown: false,
  modalOptions: {},
  appMessage: null,
  previewProject: undefined,
  windowHeight: 0,
  // menu
  selectedMenuId: -1
})
