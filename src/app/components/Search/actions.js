



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
    Http.post({
      url: `//${window.location.hostname}:5984/hyperapp-projects/_find`,
      data: {
        selector: {
          title: {
            $regex: state.search
          },
          skip: state.listing.length,
          limit: 12
        }
      },
      action: HandleSearchResponse,
      error: HandleSearchError
    })
  ]
}




// Sets the project list (replaces)
export const HandleSearchResponse = (state, data) => ({
  ...state,
  lastSearch: state.search,
  search: '',
  projects: data.map(project => project.id),
  projectCache: data.reduce((cache, project) => ({...cache, [project._id]: project}), state.projectCache || {})
})

// Error handling
const HandleSearchError = (state, data) => ({
  ...state,
  isFetching: false,
  error: true
})



