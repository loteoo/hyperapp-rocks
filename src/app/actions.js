/* eslint-disable no-unused-vars */

import { Http, Location } from '../utils'

export const SetPath = (state, path) => ({
  ...state,
  path
})

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
  listing: state.listing.concat(data)
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

export const Navigate = (state, path) => {
  return [
    state,
    Location.go({ to: path })
  ]
}
