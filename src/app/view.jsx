// Import dependencies
import {h} from 'hyperapp'

// Components
import {Html} from './theme/Html'
import {Header} from './components/Header'
import {Listing} from './components/Listing'
import {ProjectForm} from './components/ProjectForm'
import {Requirements} from './components/Requirements'
import {ProjectViewer} from './components/ProjectViewer'
import {Footer} from './components/Footer/'

// Root view
export const view = (state) => (
  <Html state={state}>
    <Header state={state} />
    {
      state.path === '/requirements' ? <Requirements /> :
      state.path.length > 1 && <ProjectViewer state={state} />
    }
    <Listing state={state} />
    <ProjectForm projectForm={state.projectForm} />
    <Footer state={state} />
  </Html>
)
