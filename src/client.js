// App dependencies
import {app} from 'hyperapp'
import {init as defaultState} from './app/init'
import {view} from './app/view'

import {SetPath} from './app/actions'
import {enableOnMountDomEvent, Location} from './utils'

enableOnMountDomEvent()



// Activate the service worker
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/service-worker.js')
//   .then((registration) => {
//     console.log('Registration successful, scope is:', registration.scope)
//   })
//   .catch((error) => {
//     console.log('Service worker registration failed, error:', error)
//   });
// }



// Initialize the app on the document
app({
  init: {
    ...defaultState,
    ...window.initialState,
    path: window.location.pathname
  },
  view,
  subscriptions: state => {
    console.log(state)
    return [
      Location.changed({action: SetPath})
    ]
  },
  container: document
})


console.log('%cSource code available here: \nhttps://github.com/loteoo/hyperapp-examples.', 'color: #a6a6a6; font-weight: 100; font-size: 1em;')
console.log('%cStar the project on github while you\'re there! :)', 'color: #a6a6a6; font-weight: 100; font-size: 1em;')
