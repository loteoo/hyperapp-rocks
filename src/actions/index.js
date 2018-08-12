import {location} from '@hyperapp/router'
import {replace, strapi, getData, postData, postImage} from '../utils/'

// Global actions for the app
export const actions = {
  // Router actions
  location: location.actions,

  // Called at startup
  init: () => (state, actions) => {
    // Subscribe to the router
    window.unsubscribeRouter = location.subscribe(window.main.location)
    
    actions.loadProjects()
  },

  set: x => x,

  
  setSearch: search => ({search}),

  setCurrentSearch: currentSearch => ({currentSearch}),

  
  setIsFetching: isFetching => ({isFetching}),

  // Set projects to the list
  setProjects: projects => ({projects}),

  // Adds projects to the list
  addProjects: projects => state => ({projects: (state.projects || []).concat(projects)}),

  // Adds projects to the begining of the list
  addProjectsStart: projects => state => ({projects: projects.concat(state.projects)}),


  // Loads projects
  loadProjects: (shouldClearList) => (state, actions) => {
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

    ga('send', 'event', 'Project', 'search', state.search)
    
    actions.setCurrentSearch(state.search)

    if (state.search) {
      getData(`/project?_q=${state.search}&_limit=120`)
        .then(projects => {
          actions.setProjects(projects)
        })
    } else {
      actions.setProjects(null)
      actions.loadProjects();
    }

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
            // TODO: preview?
            // actions.addProjectsStart([{ 
            //   ...project,
            //   thumbnail: files[0]
            // }])
            ga('send', 'event', 'Project', 'submit', project.title)
          })
      )
      
  },


  scrollToProjects: ev => document.querySelector('.projects').scrollIntoView({behavior: 'smooth', block: 'start'}),


  scrollToForm: ev => document.querySelector('.project-form').scrollIntoView({behavior: 'smooth', block: 'start'}),




  setProjectsData: ({id, project}) => state => ({
    projectsData: {
      ...state.projectsData,
      [id]: project
    }
  }),

  fetchProject: id => (state, actions) => {
    getData(`/project/${id}`)
      .then(project => actions.setProjectsData({id, project}))
  }
}
