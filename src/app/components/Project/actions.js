
import {Http} from '../../../utils'




// Fetch project by ID from api then update state
export const FetchProject = (state, id) => {
  console.log('Fetching project: ' + id);
  return [
    {
      ...state,
      projectCache: {
        ...state.projectCache,
        [id]: {
          loading: true
        }
      }
    },
    Http.fetch({
      url: `//${window.location.hostname}:5984/hyperapp-projects/${id}`,
      action: [HandleFetchResponse, id],
      error: [HandleFetchError, id]
    })
  ]
}


// Adds project to the state
export const HandleFetchResponse = (state, id, data) => ({
  ...state,
  projectCache: {
    ...state.projectCache,
    [id]: project
  }
})


// Error handling
const HandleFetchError = (state, id, data) => {
  console.error(data)
  return {
    ...state,
    projectCache: {
      ...state.projectCache,
      [id]: {
        error: 'Failed to fetch'
      }
    }
  }
}








