
import {Http, Location, couchUrl} from '../../../utils'
import {init} from '../../init'


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
        url: `${couchUrl}/projects/${id}`,
        action: [HandleFetchResponse, id],
        error: [HandleFetchError, id]
      })
    ]

  } else {
    return {
      ...state,
      title: project.title,
      description: project.description
    }
  }
}



// Adds projects to the list
export const HandleFetchResponse = (state, id, data) => ({
  ...state,
  title: data.title,
  description: data.description,
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



export const CloseProject = (state) => [
  {
    ...state,
    title: init.title,
    description: init.description
  },
  Location.go({to: '/'})
]