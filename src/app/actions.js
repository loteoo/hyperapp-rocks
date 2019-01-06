import {getData, postData, postImage} from './utils'

// Global actions for the app



// Sets the navigation path
export const SetPath = (state, path) => ({
  ...state,
  path
})



// Handles searching
export const HandleSearchForm = (state, ev) => {
  ev.preventDefault()
  // actions.scrollToProjects()
  
  // actions.SetLastSearch(state.search)

  // if (state.search) {
  //   getData(`/project?_q=${state.search}&_limit=120&status=published`)
  //     .then(projects => {
  //       actions.SetProjects(projects)
  //     })
  // } else {
  //   actions.SetProjects(null)
  //   actions.LoadProjects();
  // }
}




// Sets the project list (replaces)
export const SetProjects = (state, data) => (
  data ? {
    ...state,
    projects: data.map(project => project.id),
    projectCache: data.reduce((cache, project) => ({...cache, [project._id]: project}), state.projectCache || {})
  }
  : state
)

// Current search input value
export const SetSearch = (state, ev) => ({
  ...state,
  search: ev.target.value
})


// Search used for currently displayed projects
export const SetLastSearch = (state, ev) => ({
  ...state,
  lastSearch: ev.target.value
})








  
// Indexed nested setter
export const SetProject = (state, {id, project}) => ({
  ...state,
  projectCache: {
    ...state.projectCache,
    [id]: project
  }
})



// Fetch project by ID from api then update state
export const FetchProject = (state, id) => {
  getData(`/project/${id}`)
    .then(project => actions.SetProject({id, project}))
}