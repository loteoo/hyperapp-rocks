// App dependencies
import {app} from 'hyperapp'
import {state} from './state'
import {actions} from './actions'
import {view} from './view'

window.main = app(state, actions, view, document.body)
window.main.init()


// Activate the service worker
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//     let swPath = `service-worker.js`;
//     navigator.serviceWorker.register(swPath).then(function(registration) {
//       // Registration was successful
//       // console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }, function(err) {
//       // registration failed :(
//       // console.log('ServiceWorker registration failed: ', err);
//     });
//   });
// }


console.log('%cSource code available here: \nhttps://github.com/loteoo/hyperapp-examples.', 'color: #a6a6a6; font-weight: 100; font-size: 1em;')
console.log('%cStar the project on github while you\'re there! :)', 'color: #a6a6a6; font-weight: 100; font-size: 1em;')
