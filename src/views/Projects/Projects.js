import {h} from 'hyperapp'

import './projects.css'

import {Project} from '../Project/Project.js'
import {Spinner} from '../Spinner/Spinner.js'


export const Projects = ({projects}) => (state, actions) => {
  if (!projects) {
    actions.loadProjects()
    return (
      <main>
        <Spinner />
      </main>
    )
  } else {
    return (
      <main>
        <div class="projects">
          {projects.map(project => <Project {...project} />)}
        </div>
      </main>
    )
  }
}

// import {Projects} from './Projects/Projects.js'
// <Projects />
