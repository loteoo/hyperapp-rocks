
import http from 'http'
import fs from 'fs'

import {renderToString} from 'hyperapp-render'
import formidable  from 'formidable'

import {init} from './app/init' // Default initial state
import {view} from './app/view' // App view

const port = 8080;




// Pre-fetch data into the app's state for the render
const populateState = state => {
  
  // Return the populated state
  return {
    ...state,
    extraData: 'This came from the server!'
  }
}





// Injects the state used for the render, into the render, 
// so the client can pick it up and memoize efficiently,
// while also avoiding unnecessary fetches on initialization.
const renderWithState = (view, state) => {

  // Render the app with given state
  let html = renderToString(view(state))

  // Inject state into the render
  html = html.replace('[INJECT_INIT_STATE]', JSON.stringify(state))

  // Add the doctype tag
  html = '<!DOCTYPE html>' + html

  // Return the rendered app
  return html
}





const render = (req, res) => {
  // Set headers
  res.writeHead(200, {'Content-Type': 'text/html'})

  // Pre-load data into the state so the first render isn't an empty app
  const state = populateState(init)
  
  // Render the app with our populated state
  res.end(renderWithState(view, state))
}




const handleFileUploads = (req, res) => {
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    const oldpath = files.file.path
    const newpath = __dirname + '/../public/uploads/' + files.file.name
    fs.rename(oldpath, newpath, (err) => {
      if (err) throw err;
      res.write(JSON.stringify({
        success: true,
        imagePath: '/' + files.file.name
      }))
      res.end()
    })
  })
}




// HTTP server
http.createServer((req, res) => {

  // Bare bones router
  if (req.url === '/upload') {
    handleFileUploads(req, res)
  } else {
    render(req, res)
  }

}).listen(port);

console.log(`SSR and file server listening on port ${port}`)


