import {h} from 'hyperapp'

import './style.css'

import {Project} from '../Project/Project.js'
import {Spinner} from '../../theme/Spinner/Spinner.js'
import {PillButton} from '../../theme/PillButton/PillButton.js'

import {loadProjects} from '../../actions'


export const Listing = ({state}) => (
  <main class="listing" key="listing" id="projects">
    {
      state.projects
        ? <Results state={state} />
        : <Spinner large />
    }
  </main>
)



const Results = ({state}) => (
  <div class="results" key="results">
    {
      state.currentSearch
        ? <h2>Search results for: <u>{state.currentSearch}</u></h2>
        : null
    }
    <div class="grid" key="grid">
      {
        state.projects.length !== 0
          ? state.projects.map(_id => <Project {...state.projectCache[_id]} />)
          : <div class="empty"><h2>0 results</h2></div>
      }
    </div>
    {
      !state.currentSearch
        ? <PillButton onclick={loadProjects}>Load more{state.isFetching ? <Spinner /> : null}</PillButton>
        : null
    }
  </div>
)
