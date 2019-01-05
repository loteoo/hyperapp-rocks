import {h} from 'hyperapp'

import './style.css'

import {HandleSearchForm, SetSearch} from '../../actions'

export const Search = ({search}) => (
  <form class="search" onsubmit={HandleSearchForm} method="post">
    <input 
      id="search"
      type="text"
      name="search"
      placeholder="Search projects..."
      value={search}
      oninput={SetSearch}
    />
    <button type="submit"></button>
  </form>
)
