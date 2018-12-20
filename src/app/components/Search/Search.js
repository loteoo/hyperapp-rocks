import {h} from 'hyperapp'

import './search.css'

export const Search = ({search}) => (state, actions) => (
  <form class="search" onsubmit={actions.handleSearchForm} method="post">
    <input 
      id="search"
      type="text"
      name="search"
      placeholder="Search projects..."
      value={search}
      oninput={ev => actions.setSearch(ev.target.value)}
    />
    <button type="submit"></button>
  </form>
)
