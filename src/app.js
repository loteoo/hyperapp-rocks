// App dependencies
import {app} from 'hyperapp'
import {state} from './state/'
import {actions} from './actions/'
import {view} from './views/'

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

