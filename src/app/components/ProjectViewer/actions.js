
import {Http, couchUrl} from '../../../utils'

// Loads projects
export const LoadProjectIfNeeded = (state, id, ev) => {

  const project = state.projects && state.projects[id] && state.projects[id]

  if (!project) {

    return [
      {
        ...state,
        projects: {
          ...state.projects,
          [id]: {
            loading: true
          }
        }
      },
      Http.fetch({
        url: `${couchUrl}/hyperapp-projects/${id}`,
        action: [HandleFetchResponse, id],
        error: [HandleFetchError, id]
      })
    ]

  }
}



// Adds projects to the list
export const HandleFetchResponse = (state, id, data) => ({
  ...state,
  projects: {
    ...state.projects,
    [id]: data
  }
})

// Error handling
export const HandleFetchError = (state, id, data) => {
  console.error('Failed to fetch project')
  console.error(data)
  return {
    ...state,
    projects: {
      ...state.projects,
      [id]: {
        error: data
      }
    }
  }
}
