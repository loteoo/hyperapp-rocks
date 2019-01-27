
import Koa from 'koa'
import Router from 'koa-router'

import {renderToString} from 'hyperapp-render'

import {init} from './app/init' // Default initial state
import {view} from './app/view' // App view

import {SetPath} from './app/actions'
import {
  HandleFetchResponse as HandleListingData,
  HandleFetchError as HandleListingError
} from './app/components/Listing/actions'

import {
  HandleFetchResponse as HandleProjectData,
  HandleFetchError as HandleProjecError
} from './app/components/ProjectViewer/actions'


const app = new Koa()
const router = new Router()

const nano = require('nano')('http://localhost:5984')

const port = 8080;

const projects = nano.use('hyperapp-projects')




// Injects the state used for the render, into the render, 
// so the client can pick it up and memoize efficiently,
// while also avoiding unnecessary fetches on initialization.
const render = (state) => {

  // Render the app with given state
  let html = renderToString(view(state))

  // Inject state into the render
  html = html.replace('[INJECT_INIT_STATE]', JSON.stringify(state))

  // Inject special JS
  html = html.replace('[INJECT_GA_CODE]', "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-73430538-4');")

  // Add the doctype tag
  html = '<!DOCTYPE html>' + html

  // Return the rendered app
  return html
}






// Query listing data from DB
router.get('/', (ctx, next) => {
  
  return projects.view('projects', 'by-created', {descending: true, skip: 0, limit: 12})
    .then(projectsData => HandleListingData(init, projectsData))
    .catch(error => HandleListingError(init, error))
    .then(state => ctx.body = render(state))


  
});



router.get('/:id', (ctx, next) => {

  const state = SetPath(init, ctx.request.url)
  
  
  return projects.get(ctx.params.id)
    .then(project => HandleProjectData(state, ctx.params.id, project))
    .catch(error => {
      ctx.status = 404
      return HandleProjecError(state, ctx.params.id, error)
    })
    .then(state => ctx.body = render(state))

});


app.use(router.routes())
app.use(router.allowedMethods())
app.listen(port, () => console.log(`SSR and file server listening on port ${port}`))
