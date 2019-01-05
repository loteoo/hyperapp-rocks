import {h} from 'hyperapp'

import './style.css'

import {handleSearchForm, setSearch} from '../../actions'

export const Search = ({search}) => (
  <form class="search" onsubmit={handleSearchForm} method="post">
    <input 
      id="search"
      type="text"
      name="search"
      placeholder="Search projects..."
      value={search}
      oninput={setSearch}
    />
    <button type="submit"></button>
  </form>
)
