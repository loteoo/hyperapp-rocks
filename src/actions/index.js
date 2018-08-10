import {location} from '@hyperapp/router'
import {replace, strapi, getData, postData, postImage} from '../utils/'

// Global actions for the app
export const actions = {
  // Router actions
  location: location.actions,

  // Called at startup
  init: () => {
    // Subscribe to the router
    window.unsubscribeRouter = location.subscribe(window.main.location)
  },

  // Set projects to the list
  setSearch: search => ({search}),

  // Set projects to the list
  setProjects: projects => ({projects}),

  // Adds projects to the list
  addProjects: projects => state => ({projects: state.projects.concat(projects)}),

  // Adds projects to the begining of the list
  addProjectsStart: projects => state => ({projects: projects.concat(state.projects)}),


  // Loads projects
  loadProjects: () => (state, actions) => {
    getData(`/project?_sort=createdAt:desc&_start=${state.projects.length}&_limit=12`)
      .then(projects => actions.addProjects(projects))
  },


  // Handles searching
  handleSearchForm: ev => state => {
    ev.preventDefault()
    getData(`/project?title_contains=${state.search}&_limit=90`)
      .then(projects => {
        console.log(projects)
        actions.setProjects(projects)
      })
  },


  // Nested setter
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
          .then(files => {
            actions.setProjectForm({submitted: true})
            actions.addProjectsStart([{
              ...project,
              thumbnail: files[0]
            }])
          })
      )
      
  }
}
