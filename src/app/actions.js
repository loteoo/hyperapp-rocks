import {getData, postData, postImage} from './utils'

// Global actions for the app



// Sets the navigation path
export const SetPath = (state, path) => ({
  ...state,
  path
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