import {h} from 'hyperapp'

import './search.css'

const Icon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>

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
    <Icon />
  </form>
)
