
import {Http} from '../../utils'


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
          $or: [
            {
              title: {
                $regex: state.search
              }
            },
            {
              description: {
                $regex: state.search
              }
            }
          ]
        }
      },
      action: HandleSearchResponse,
      error: HandleSearchError
    })
  ]
}




// Sets the project list (replaces)
export const HandleSearchResponse = (state, data) => {
  console.log(data);
  
  return ({
  ...state,
  lastSearch: state.search,
  search: '',
  listing: data.docs.map(project => project._id),
  projects: data.docs.reduce((projects, project) => ({...projects, [project._id]: project}), state.projects)
})
}
// Error handling
const HandleSearchError = (state, data) => {
  console.log(data);
  
  return ({
  ...state,
  isFetching: false,
  error: true
})

}



