import {h} from 'hyperapp'

import './style.css'

// Actions
import {HandleSearchForm, SetSearch} from './actions'

// View
export const Search = ({search}) => (
  <form class="search" onsubmit={HandleSearchForm} method="post">
    <input 
      id="search"
      type="text"
      name="search"
      placeholder="Search projects..."
      value={search}
      oninput={SetSearch}
      required
    />
    <button type="submit"></button>
  </form>
)
