
import {Http, couchUrl} from '../../../utils'


// Loads projects
export const LoadProjects = (state) => ([
  {
    ...state,
    isFetching: true
  },
  Http.fetch({
    url: `${couchUrl}/projects/_design/projects/_view/by-created?descending=true&skip=${state.listing.length}&limit=12`,
    action: HandleFetchResponse,
    error: HandleFetchError
  })
])

// Adds projects to the list
export const HandleFetchResponse = (state, data) => ({
  ...state,
  isFetching: false,
  listing: state.listing.concat(data.rows.map(project => project.id)),
  projects: data.rows.reduce((projects, project) => ({...projects, [project.id]: project.value}), state.projects),
  total: data.total_rows
})

// Error handling
export const HandleFetchError = (state, err) => {
  console.error(err)
  return {
    ...state,
    isFetching: false,
    error: 'Could not fetch projects'
  }
}
