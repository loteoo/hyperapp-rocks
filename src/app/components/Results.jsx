import { css } from 'emotion'

import { Project } from './Project'
import { XCircle } from '../theme/Icons'
import { PillButton } from '../theme/PillButton'
import { Spinner } from '../theme/Spinner'

import { LoadProjects } from '../actions'

const style = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: 2;
  padding: 0;
  @media (max-width: 740px) {
    padding: 0;
  }
`

const resultsTitle = css`
  display: flex;
  align-items: center;
  > a {
    color: var(--dark-text-color);
    margin-left: 0.5rem;
  }
`

const grid = css`
  width: 100%;
  max-width: 1280px;
  margin: 3em auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3em;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 740px) {
    max-width: 32em;
    grid-template-columns: 1fr;
  }
  @media (max-width: 480px) {
    grid-gap: 1.5em;
  }
`

const emptyResult = css`
  margin: 3em auto;
  text-align: center;
  grid-column: 1/-1;
`

const getResults = (state) => state.listing.filter(
  project => project.title.toLowerCase().includes(state.search.toLowerCase()) ||
  project.description.toLowerCase().includes(state.search.toLowerCase())
)

export default ({ state }) => {
  const results = getResults(state)
  return (
    <div class={style}>
      {state.lastSearch && (
        <div class={resultsTitle}>
          <h2>Search results for: <u>{state.lastSearch}</u></h2>
          <a onclick={console.log}><XCircle /></a>
        </div>
      )}
      <div class={grid}>
        {
          results.length > 0
            ? results.map(project => <Project project={project} />)
            : (
              <div class={emptyResult}>
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
