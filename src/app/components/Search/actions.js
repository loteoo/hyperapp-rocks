
import {Http} from '../../utils'

import {LoadProjects} from '../Listing/actions'

// Current search input value
export const SetSearch = (state, ev) => ({
  ...state,
  search: ev.target.value
})



// Handles searching
export const HandleSearchForm = (state, ev) => {
  ev.preventDefault()

  const next = {
    ...state,
    lastSearch: state.search,
    search: '',
    isFetching: true,
    listing: []
  }

  return state.search ? [
    next,
    Http.post({
      url: `//${window.location.hostname}:5984/hyperapp-projects/_find`,
      data: {
        selector: {
          $or: [
            {
              title: {
                $regex: `(?i)${state.search}`
              }
            },
            {
              description: {
                $regex: `(?i)${state.search}`
              }
            },
            {
              author: {
                $regex: `(?i)${state.search}`
              }
            }
          ]
        }
      },
      action: HandleSearchResponse,
      error: HandleSearchError
    })
  ]
  : LoadProjects(next)
}




// Sets the project list (replaces)
export const HandleSearchResponse = (state, data) => {
  console.log(data);
  return ({
    ...state,
    listing: data.docs.map(project => project._id),
    projects: data.docs.reduce((projects, project) => ({...projects, [project._id]: project}), state.projects)
  })
}

// Error handling
const HandleSearchError = (state, data) => {
  console.error(data);
  return ({
    ...state,
    isFetching: false,
    error: 'Search failed'
  })
}
