import {h} from 'hyperapp'

import './projects.css'

import {Project} from '../Project/Project.js'
import {Spinner} from '../Spinner/Spinner.js'
import {PillButton} from '../PillButton/PillButton.js'


export const Projects = ({projects}) => (state, actions) => {
  if (projects.length === 0) {
    actions.loadProjects()
    return (
      <div class="projects" key="projects">
        <Spinner />
      </div>
    )
  } else {
    return (
      <div class="projects" key="projects">
        <div class="grid">
          {projects.map(project => <Project {...project} />)}
        </div>
        <PillButton>
          Load more
          {/* <Spinner /> */}
        </PillButton>
      </div>
    )
  }
}

// import {Projects} from './Projects/Projects.js'
// <Projects />
