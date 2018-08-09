import {location} from '@hyperapp/router'
import deepmerge from 'deepmerge'
import {replace, strapiUrl, getData, postData, postImage} from '../utils/'

// Global actions for the app
export const actions = {
  // Router actions
  location: location.actions,

  // Update/set deeply nested properties. Arrays are replaced by the new ones
  update: fragment => state =>
    deepmerge(state, fragment, {arrayMerge: replace}),

  // Set or replace first-level props
  set: fragment => fragment,

  // Called at startup
  init: () => {
    // Subscribe to the router
    window.unsubscribeRouter = location.subscribe(window.main.location)
  },

  loadProjects: () => (state, actions) => {
    getData(strapiUrl('/project'))
      .then(projects => actions.set({projects}))
  },


  handleSearchForm: ev => state => {
    ev.preventDefault()

    alert('search: ' + state.search)
  },

  setProjectForm: fragment => state => deepmerge(state, {projectForm: fragment}),

  handleProjectForm: ev => (state, actions) => {
    ev.preventDefault()

    
    postData(strapiUrl('/project'), state.projectForm)
      .then(project => {
        alert('response 1: \n\n' + JSON.stringify(project, null, 2))

        postImage(strapiUrl('/upload'), {
          files: document.getElementById('thumbnail').files,
          refId: project._id,
          ref: 'project',
          plugin: 'upload',
          field: 'thumbnail'
        })
          .then(image => {


            alert('response 2: \n\n' + JSON.stringify(image, null, 2))
            // actions.setProjectForm(data)
            // alert('Submitted!\nEntry: \n\n' + JSON.stringify(data, null, 2))
          })
      })
      
  }
}
