import {h} from 'hyperapp'

import './style.css'

import {Project} from '../Project'
import {Spinner} from '../../theme/Spinner'
import {PillButton} from '../../theme/PillButton'

import {LoadProjects} from '../../actions'


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
    {state.lastSearch && <h2>Search results for: <u>{state.lastSearch}</u></h2>}
    <div class="grid" key="grid">
      {
        state.projects.length !== 0
          ? state.projects.map(_id => <Project {...state.projectCache[_id]} />)
          : <div class="empty"><h2>0 results</h2></div>
      }
    </div>
    {!state.lastSearch && (
      <PillButton onclick={LoadProjects}>Load more{state.isFetching && <Spinner />}</PillButton>
    )}
  </div>
)
