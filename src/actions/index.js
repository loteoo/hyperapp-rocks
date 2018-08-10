import {location} from '@hyperapp/router'
import {replace, strapiUrl, getData, postData, postImage} from '../utils/'

// Global actions for the app
export const actions = {
  // Router actions
  location: location.actions,

  // Set or replace first-level props
  set: fragment => fragment,

  // Called at startup
  init: () => {
    // Subscribe to the router
    window.unsubscribeRouter = location.subscribe(window.main.location)
  },

  // Adds projects to the list
  addProjects: projects => state => ({projects: state.projects.concat(projects)}),


  // Loads projects
  loadProjects: () => (state, actions) => {
    getData(strapiUrl(`/project?_sort=createdAt:desc&_start=${state.projects.length}&_limit=12`))
      .then(projects => actions.addProjects(projects))
  },


  handleSearchForm: ev => state => {
    ev.preventDefault()
    alert('search: ' + state.search)
  },

  // Nested setter
  setProjectForm: fragment => state => ({
    projectForm: {
      ...state.projectForm,
      ...fragment
    }
  }),
  
  handleProjectForm: ev => (state, actions) => {
    ev.preventDefault()
    postData(strapiUrl('/project'), state.projectForm)
      .then(project => {
        postImage(strapiUrl('/upload'), {
          files: state.projectForm.thumbnail,
          refId: project._id,
          ref: 'project',
          plugin: 'upload',
          field: 'thumbnail'
        })
          .then(files => {
            actions.setProjectForm({submitted: true})
            actions.addProjects({
              ...project,
              thumbnail: files[0]
            })
          })
      })
      
  }
}
