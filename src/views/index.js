// Bundle css for this view
import 'sanitize.css'
import './global.css'

// Import dependencies
import {h} from 'hyperapp'
import {SearchInput} from './SearchInput/SearchInput.js'
import {ProjectForm} from './ProjectForm/ProjectForm.js'
import {Projects} from './Projects/Projects.js'
import {Header} from './Header/Header.js'
import {Footer} from './Footer/Footer.js'


// Root view
export const view = (state, actions) => (
  <div>
    <Header />
    <Projects projects={state.projects} />
    <ProjectForm {...state.projectForm} />
    <Footer />
  </div>
)




