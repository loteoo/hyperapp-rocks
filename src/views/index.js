// Bundle css for this view
import 'sanitize.css'
import './global.css'

// Import dependencies
import {h} from 'hyperapp'
import {Header} from './Header/Header.js'
import {Projects} from './Projects/Projects.js'
import {ProjectForm} from './ProjectForm/ProjectForm.js'
import {Footer} from './Footer/Footer.js'


// Root view
export const view = (state, actions) => {
  console.log(state)
  return (
    <div>
      <Header />
      <Projects projects={state.projects} />
      <ProjectForm {...state.projectForm} />
      <Footer />
    </div>
  )
}



