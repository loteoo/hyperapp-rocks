import {h} from 'hyperapp'

import './search.css'


export const Search = ({}) => (state, actions) => (
  <form class="search" onsubmit={actions.handleSearchForm} method="post">
    <input 
      id="search"
      type="text"
      name="search"
      placeholder="Search projects..."
      value={state.search}
      oninput={ev => actions.setSearch(ev.target.value)}
    />
  </form>
)
