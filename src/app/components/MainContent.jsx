import { css } from 'emotion'

import Results from './Results'
import { Spinner } from '../theme/Spinner'

// Actions
import { LoadProjects } from '../actions'

const style = css`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  background: #f8faff;
  padding: 0 3em;
  margin: 0 0 6rem 0;
  min-height: 9rem;
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: -100px;
    right: 0;
    bottom: auto;
    left: 0;
    z-index: -1;
    height: 16rem;
    width: 100%;
    background: #f8faff;
    transform: skewY(-4deg);
    box-shadow: 0 -16px 32px -12px rgba(62,57,107,0.33);
  }
  @media (max-width: 480px) {
    padding: 1.5em;
    &::before {
      position: absolute;
      top: -50px;
      right: 0;
      bottom: auto;
      left: 0;
      height: 8rem;
      transform: skewY(-6deg);
    }
  }
  main {
    width: 100%;
  }
  .spinner {
    margin: 0 0 0 1rem;
  }
  .the-end {
    margin-top: 3rem;
  }
  .error {
    margin: 3rem;
    z-index: 1;
    color: var(--error-color);
    >* {
      color: inherit;
    }
  }
`

// View
export default ({ state }) => (
  <div class={style} id="projects" onmount={LoadProjects}>
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
