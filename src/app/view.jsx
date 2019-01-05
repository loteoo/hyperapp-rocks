// Bundle css for this view
import 'sanitize.css'
import './global.css'

// Import dependencies
import {h} from 'hyperapp'

import {Html} from './theme/Html'
import {Header} from './components/Header'
import {Listing} from './components/Listing'
import {ProjectForm} from './components/ProjectForm'
import {Footer} from './components/Footer/'


// Root view
export const view = (state) => (
  <Html state={state}>
    <Header state={state} />
    {/* <Listing state={state} /> */}
    {/* <ProjectForm {...state.projectForm} /> */}
    {/* <Switch>
      <Route path="/requirements" render={Requirements}/>
      <Route path="/:id" render={ProjectViewer}/>
    </Switch> */}
    <Footer state={state} />
  </Html>
)

