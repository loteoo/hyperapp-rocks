
import {Http} from '../../utils'


// Loads projects
export const LoadProjects = (state, ev) => ([
  {
    ...state,
    isFetching: true
  },
  Http.fetch({
    url: `//${window.location.hostname}:5984/hyperapp-projects/_all_docs?include_docs=true&skip=${state.listing.length}&_limit=12`,
    action: HandleFetchResponse,
    error: HandleFetchError
  })
])

// Adds projects to the list
const HandleFetchResponse = (state, data) => ({
  ...state,
  isFetching: false,
  listing: state.listing.concat(data.rows.map(project => project.id)),
  projects: data.rows.reduce((projects, project) => ({...projects, [project.id]: project.doc}), state.projects)
})

// Adds projects to the list
const HandleFetchError = (state, data) => ({
  ...state,
  isFetching: false,
  error: true
})
