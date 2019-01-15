import {h} from 'hyperapp'

import './style.css'

// Components
import {Project} from '../Project'
import {Spinner} from '../../theme/Spinner'
import {XCircle} from '../../theme/Icons'
import {PillButton} from '../../theme/PillButton'

// Actions
import {LoadProjects} from './actions'
import {HandleSearchForm} from '../Search/actions'

// View
export const Listing = ({state}) => (
  <main class="listing" id="projects" role="main">
    {
      state.listing
        ? <Results state={state} />
        : <Spinner large />
    }
  </main>
)

// Sub-component
const Results = ({state}) => (
  <div class="results">
    {state.lastSearch && (
      <div class="search-results">
        <h2>Search results for: <u>{state.lastSearch}</u></h2>
        <a onclick={HandleSearchForm}><XCircle /></a>
      </div>
    )}
    <div class="grid">
      {
        state.listing.length > 0
        ? state.listing.map(id => <Project project={state.projects[id]} />)
        : (
          <div class="empty">
            <h2>0 results</h2>
          </div>
        )
      }
    </div>
    {!state.lastSearch && (
      <PillButton onclick={LoadProjects}>Load more {state.isFetching && <Spinner />} </PillButton>
    )}
  </div>
)
