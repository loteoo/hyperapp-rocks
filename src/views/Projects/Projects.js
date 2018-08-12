import {h} from 'hyperapp'

import './projects.css'

import {Project} from '../Project/Project.js'
import {Spinner} from '../Spinner/Spinner.js'
import {PillButton} from '../PillButton/PillButton.js'


export const Projects = ({projects}) => (state, actions) => (
  <div class="projects" key="projects">
    {
      projects
        ? <Listing projects={projects} />
        : <Spinner large />
    }
  </div>
)



const Listing = ({projects}) => (state, actions) => (
  <div class="listing" key="listing">
    {
      state.currentSearch
        ? <h2>Search results for: <u>{state.currentSearch}</u></h2>
        : null
    }
    <div class="grid" key="grid">
      {
        projects.length !== 0
          ? projects.map(project => <Project {...project} />)
          : <div class="empty"><h2>0 results</h2></div>
      }
    </div>
    {
      !state.currentSearch
        ? <PillButton onclick={actions.loadProjects}>Load more{state.isFetching ? <Spinner /> : null}</PillButton>
        : null
    }
  </div>
)

// import {Projects} from './Projects/Projects.js'
// <Projects />
