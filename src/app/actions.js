
// Global actions for the app

import {Location} from './../utils'


// Sets the navigation path
export const SetPath = (state, path) => ({
  ...state,
  path
})


export const Navigate = (state, path, ev) => {
  ev.preventDefault()
  return [
    state,
    Location.go({to: path})
  ]
}