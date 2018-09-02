// Bundle css for this view
import 'sanitize.css'
import './global.css'

// Import dependencies
import {h} from 'hyperapp'
import {Route, Switch} from '@hyperapp/router'
import {Header} from '../components/Header/Header.js'
import {Listing} from '../components/Listing/Listing.js'
import {ProjectForm} from '../components/ProjectForm/ProjectForm.js'
import {Requirements} from '../components/Requirements/Requirements.js'
import {ProjectViewer} from '../components/ProjectViewer/ProjectViewer.js'
import {Footer} from '../components/Footer/Footer.js'


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
