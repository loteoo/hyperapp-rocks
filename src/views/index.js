// Bundle css for this view
import 'sanitize.css'
import './global.css'

// Import dependencies
import {h} from 'hyperapp'
import {Project} from './Project/Project.js'
import {SearchInput} from './SearchInput/SearchInput.js'

// Root view
export const view = (state, actions) => (
  <main>
    <section class="intro">
      <h1>Hyperapp real-world examples</h1>
      <h2>A curated list of live hyperapp projects</h2>
      <form action={ev => actions.handleSearchForm(ev)} method="post">
        <SearchInput label="Search project..." name="search" value={state.search} setter={actions.set} />
      </form>
    </section>
    <section class="listing">
      <Project />
      <Project />
      <Project />
    </section>
  </main>
)




