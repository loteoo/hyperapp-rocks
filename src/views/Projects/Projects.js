import {h} from 'hyperapp'

import './projects.css'

import {Project} from '../Project/Project.js'

export const Projects = ({projects}) => (state, actions) => {
  if (!projects) {
    actions.loadProjects()
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
