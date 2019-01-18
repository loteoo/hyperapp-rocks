
import http from 'http'
import url from 'url'
import fs from 'fs'
import path from 'path'

import {renderToString} from 'hyperapp-render'

import {init} from './app/init' // Default initial state
import {view} from './app/view' // App view

import {SetPath} from './app/actions'
import {HandleFetchResponse as HandleListingData} from './app/components/Listing/actions'
import {HandleFetchResponse as HandleProjectData} from './app/components/ProjectViewer/actions'

const port = 8080;

const nano = require('nano')('http://localhost:5984')

const projects = nano.use('hyperapp-projects')




// Injects the state used for the render, into the render, 
// so the client can pick it up and memoize efficiently,
// while also avoiding unnecessary fetches on initialization.
const render = (view, state) => {

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






const populateState = (req) => {

  const state = SetPath(init, url.parse(req.url).pathname)

  if (state.path.length > 1) {

    return projects.get(state.path.substring(1))
      .then(project => HandleProjectData(state, project))
      .catch(project => HandleProjectData(state, project))

  } else {
    
    // Query listing data from DB
    return projects.view('projects', 'by-created', {descending: true, skip: 0, limit: 12})
    .then(projectsData => HandleListingData(state, projectsData))

  }
}





const respond = (req, res) => {
  
  // Set headers
  res.writeHead(200, {'Content-Type': 'text/html'})

  // Populate state
  populateState(req).then(state => {

    // Render the app
    res.end(render(view, state))
    
  })


  
}




// HTTP server
// http.createServer((req, res) => {
//   respond(req, res)
// }).listen(port);








// With file server
http.createServer((req, res) => {

  // parse URL
  const parsedUrl = url.parse(req.url)
  
  const diskPath = `${__dirname}/../dist/${parsedUrl.pathname}`

  // based on the URL path, extract the file extention. e.g. .js, .doc, ...
  const ext = path.parse(parsedUrl.pathname).ext

  // maps file extention to MIME typere
  const map = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword'
  }

  fs.exists(diskPath, (exist) => {

    if (exist && !fs.statSync(diskPath).isDirectory()) {

      // read file from file system
      fs.readFile(diskPath, (err, data) => {
        if (err) {
          res.statusCode = 500
          res.end(`Error getting the file: ${err}.`)
        } else {
          // if the file is found, set Content-type and send data
          res.setHeader('Content-type', map[ext] || 'text/plain' )
          res.end(data)
        }
      })
    } else {
      
      respond(req, res)

    }
  })

}).listen(parseInt(port))





console.log(`SSR and file server listening on port ${port}`)