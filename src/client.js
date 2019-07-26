// App dependencies
import {app} from '../hyperapp'
import {init as defaultState} from './app/init'
import {view} from './app/view'

import {SetPath} from './app/actions'
import {enableOnMountDomEvent, Location} from './utils'

enableOnMountDomEvent()



// // Activate the service worker
// if ('serviceWorker' in navigator) {
//   const swPath = '/service-worker.js'
//   navigator.serviceWorker.register(swPath)
// }



// Initialize the app on the document
app({
  init: {
    ...defaultState,
    ...window.initialState,
    path: window.location.pathname
  },
  view,
  subscriptions: state => [Location.changed({action: SetPath})],
  container: document
})


console.log('%cSource code available on github: \nhttps://github.com/loteoo/hyperapp-rocks.', 'color: #a6a6a6; font-weight: 100; font-size: 1em;')
console.log('%cStar the project while you\'re there! :)', 'color: #a6a6a6; font-weight: 100; font-size: 1em;')
