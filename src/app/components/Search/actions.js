



// Current search input value
export const SetSearch = (state, ev) => ({
  ...state,
  search: ev.target.value
})



// Handles searching
export const HandleSearchForm = (state, ev) => {
  ev.preventDefault()
  return [
    {
      ...state,
      isFetching: true
    },
    Http.fetch({
      url: `//${window.location.hostname}:5984/hyperapp-projects/_all_docs?include_docs=true&skip=${state.listing.length}&_limit=12`,
      action: HandleSearchResponse,
      error: HandleSearchError
    })
  ]
}




// Sets the project list (replaces)
export const HandleSearchResponse = (state, data) => (
  data ? {
    ...state,
    lastSearch: state.search,
    projects: data.map(project => project.id),
    projectCache: data.reduce((cache, project) => ({...cache, [project._id]: project}), state.projectCache || {})
  }
  : state
)

// Error handling
const HandleSearchError = (state, data) => ({
  ...state,
  isFetching: false,
  error: true
})



