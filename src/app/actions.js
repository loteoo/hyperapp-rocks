
import { Http } from '../utils'

// ==================
// Global actions
// ==================

// Sets a value to the given key in the state
export const SetValue = (state, { key, value }) => ({
  ...state,
  [key]: value
})

// Loads projects
export const LoadProjects = (state) => ([
  {
    ...state,
    isFetching: true
  },
  Http.fetch({
    url: `/data/projects.json`,
    action: HandleFetchResponse,
    error: HandleFetchError
  })
])

// Adds projects to the list
export const HandleFetchResponse = (state, data) => ({
  ...state,
  isFetching: false,
  listing: state.listing.concat(data.rows.map(project => project.value))
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
