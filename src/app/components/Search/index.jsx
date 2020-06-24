
import './style.css'

// Actions
import { SetSearch } from './actions'

export const PrevDefault = (state, ev) => {
  ev.preventDefault()
  return state
}

// View
export const Search = ({ search }) => (
  <form class='search' role='search' method='post' onsubmit={PrevDefault}>
    <input
      id='search'
      type='text'
      name='search'
      placeholder='Search projects...'
      value={search}
      oninput={SetSearch}
    />
    <button type='submit' />
  </form>
)
