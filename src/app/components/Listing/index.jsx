
import './style.css'

// Components
import { Project } from '../Project'
import { Spinner } from '../../theme/Spinner'
import { XCircle } from '../../theme/Icons'
import { PillButton } from '../../theme/PillButton'

// Actions
import { LoadProjects } from '../../actions'

// View
export const Listing = ({ state }) => (
  <div class='listing' id='projects' onmount={LoadProjects}>
    <aside class='side-bar'>
      Tags
    </aside>
    <main role='main'>
      {state.error && (
        <div class='error'>
          <h2>Error: {state.error}</h2>
        </div>
      )}
      {
        state.listing
          ? <Results state={state} />
          : <Spinner large />
      }
    </main>
  </div>
)

const getResults = (state) => state.listing.filter(
  project => project.title.toLowerCase().includes(state.search.toLowerCase()) ||
   project.description.toLowerCase().includes(state.search.toLowerCase())
)

// Sub-component
const Results = ({ state }) => {
  const results = getResults(state)

  return (
    <div class='results'>
      {state.lastSearch && (
        <div class='search-results'>
          <h2>Search results for: <u>{state.lastSearch}</u></h2>
          <a onclick={console.log}><XCircle /></a>
        </div>
      )}
      <div class='grid'>
        {
          results.length > 0
            ? results.map(project => <Project project={project} />)
            : (
              <div class='empty'>
                <h2>0 results</h2>
              </div>
            )
        }
      </div>
      {
        state.lastSearch
          ? results.length + ' results'
          : results.length !== 0 && results.length >= state.total
            ? (
              <div class='the-end'>
                <h2>You've reached the end</h2>
                <p>Post projects to keep the list going! ✌️</p>
              </div>
            )
            : <PillButton onclick={LoadProjects}>Load more {state.isFetching && <Spinner />} </PillButton>
      }
    </div>
  )
}
