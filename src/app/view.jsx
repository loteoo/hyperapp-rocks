// Bundle css for this view
import 'sanitize.css'
import './global.css'

// Import dependencies
import {h} from 'hyperapp'
// import {Route, Switch} from '@hyperapp/router'
import {Header} from './components/Header'
import {Listing} from './components/Listing'
import {ProjectForm} from './components/ProjectForm'
import {Requirements} from './components/Requirements'
import {ProjectViewer} from './components/ProjectViewer'
import {Footer} from './components/Footer/Footer.js'


// Root view
export const view = (state, actions) => (
  <div>
    <Header state={state} />
    <Listing state={state} />
    <ProjectForm {...state.projectForm} />
    {/* <Switch>
      <Route path="/requirements" render={Requirements}/>
      <Route path="/:id" render={ProjectViewer}/>
    </Switch> */}
    <Footer state={state} />
  </div>
)

