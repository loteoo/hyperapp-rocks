// Bundle css for this view
import 'sanitize.css'
import './global.css'

// Import dependencies
import {h} from 'hyperapp'
import {Route, Switch} from "@hyperapp/router"
import {Header} from './Header/Header.js'
import {Listing} from './Listing/Listing.js'
import {ProjectForm} from './ProjectForm/ProjectForm.js'
import {Requirements} from './Requirements/Requirements.js'
import {ProjectViewer} from './ProjectViewer/ProjectViewer.js'
import {Footer} from './Footer/Footer.js'


// Root view
export const view = (state, actions) => {
  console.log(state)
  return (
    <div>
      <Header />
      <Listing projects={state.projects} />
      <ProjectForm {...state.projectForm} />
      <Switch>
        <Route path="/requirements" render={Requirements}/>
        <Route path="/:id" render={ProjectViewer}/>
      </Switch>
      <Footer />
    </div>
  )
}
