import {getData, postData, postImage} from './utils'

// Global actions for the app
export const actions = {

  // Called at startup
  init: () => (state, actions) => {
    // Subscribe to the router
    window.unsubscribeRouter = location.subscribe(window.main.location)
    
    // Load projects
    actions.LoadProjects()
  },
  

  // Current search results queried value
  setCurrentSearch: currentSearch => ({currentSearch}),

  // Fetching status
  setIsFetching: isFetching => ({isFetching}),

  // Sets the project list (replaces)
  setProjects: projects => state => (
    projects
    ? {
      projects: projects.map(project => project.id),
      projectCache: projects.reduce((cache, project) => ({...cache, [project._id]: project}), state.projectCache || {})
    }
    : null
  ),

  // Adds projects to the list
  addProjects: projects => state => ({
    projects: (state.projects || []).concat(projects.map(project => project.id)),
    projectCache: projects.reduce((cache, project) => ({...cache, [project._id]: project}), state.projectCache || {})
  }),
  
  

  // Nested setter for the project form
  setProjectForm: fragment => state => ({
    projectForm: {
      ...state.projectForm,
      ...fragment
    }
  }),

  
  // Indexed nested setter
  setProject: ({id, project}) => state => ({
    projectCache: {
      ...state.projectCache,
      [id]: project
    }
  }),

  // Fetch project by ID from api then update state
  fetchProject: id => (state, actions) => {
    getData(`/project/${id}`)
      .then(project => actions.setProject({id, project}))
  },
  
}


// Handles searching
export const HandleSearchForm = (state, ev) => {
  ev.preventDefault()
  // actions.scrollToProjects()
  
  // actions.setCurrentSearch(state.search)

  // if (state.search) {
  //   getData(`/project?_q=${state.search}&_limit=120&status=published`)
  //     .then(projects => {
  //       actions.setProjects(projects)
  //     })
  // } else {
  //   actions.setProjects(null)
  //   actions.LoadProjects();
  // }

}


// Current search input value
export const SetSearch = (state, ev) => ({
  ...state,
  search: ev.target.value
})


// Loads projects
export const LoadProjects = (state, ev) => [
  {
    ...state,
    isFetching: true
  },
  getData(`/project?_sort=createdAt:desc&_start=${state.projects ? state.projects.length : 0}&_limit=12&status=published`)
    .then(projects => {
      actions.setIsFetching(false)
      actions.addProjects(projects)
    })
]




// Handles project submission
export const HandleProjectForm = (state, ev) => {
  ev.preventDefault()
  // postData('/project', state.projectForm)
  //   .then(project =>
  //     postImage('/upload', {
  //       files: state.projectForm.thumbnail,
  //       refId: project._id,
  //       ref: 'project',
  //       plugin: 'upload',
  //       field: 'thumbnail'
  //     })
  //       .then(files => actions.setProjectForm({submitted: true}))
  //   )
}
