import {location} from '@hyperapp/router'
import {getData, postData, postImage} from './utils'

// Global actions for the app
export const actions = {

  // Router actions
  location: location.actions,

  // Called at startup
  init: () => (state, actions) => {
    // Subscribe to the router
    window.unsubscribeRouter = location.subscribe(window.main.location)
    
    // Load projects
    actions.loadProjects()
  },

  // Current search input value
  setSearch: search => ({search}),

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

  // Loads projects
  loadProjects: () => (state, actions) => {
    actions.setIsFetching(true)
    getData(`/project?_sort=createdAt:desc&_start=${state.projects ? state.projects.length : 0}&_limit=12&status=published`)
      .then(projects => {
        actions.setIsFetching(false)
        actions.addProjects(projects)
      })
  },

  // Handles searching
  handleSearchForm: ev => (state, actions) => {
    ev.preventDefault()
    actions.scrollToProjects()
    
    actions.setCurrentSearch(state.search)

    if (state.search) {
      getData(`/project?_q=${state.search}&_limit=120&status=published`)
        .then(projects => {
          actions.setProjects(projects)
        })
    } else {
      actions.setProjects(null)
      actions.loadProjects();
    }

  },

  // Nested setter for the project form
  setProjectForm: fragment => state => ({
    projectForm: {
      ...state.projectForm,
      ...fragment
    }
  }),

  // Handles project submission
  handleProjectForm: ev => (state, actions) => {
    ev.preventDefault()
    postData('/project', state.projectForm)
      .then(project =>
        postImage('/upload', {
          files: state.projectForm.thumbnail,
          refId: project._id,
          ref: 'project',
          plugin: 'upload',
          field: 'thumbnail'
        })
          .then(files => actions.setProjectForm({submitted: true}))
      )
  },

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
  
  // Scroll to target via DOM
  scrollToProjects: ev => document.querySelector('.listing').scrollIntoView({behavior: 'smooth', block: 'start'}),
  
  // Scroll to target via DOM
  scrollToForm: ev => document.querySelector('.project-form').scrollIntoView({behavior: 'smooth', block: 'start'})

}


// Handles searching
export const handleSearchForm = (state, ev) => {
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
  //   actions.loadProjects();
  // }

}


export const setSearch = (state, ev) => ({
  ...state,
  search: ev.target.value
})

export const loadProjects = (state, ev) => [
  {
    ...state,
    isFetching: true
  }
]




  // Handles project submission
export const handleProjectForm = (state, ev) => {
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
