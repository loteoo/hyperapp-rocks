
import './style.css'

// Components
import {Search} from '../Search'
import {PillButton} from '../../theme/PillButton'
import {Github} from '../../theme/Icons'

const scrollToProjects = (state, ev) => {
  ev.preventDefault()
  document.querySelector('#projects').scrollIntoView()
}

const scrollToForm = (state, ev) => {
  ev.preventDefault()
  document.querySelector('#submit').scrollIntoView()
}

// View
export const Header = ({state}) => (
  <header role="banner">
    <nav>
      <a href="https://github.com/loteoo/hyperapp-rocks" target="_blank" title="Source code"><Github /></a>
    </nav>
    <h1>Hyperapp real-world examples</h1>
    <h2>A curated list of live Hyperapp projects</h2>
    <Search search={state.search} />
    <div class="actions">
      <PillButton href="#projects" onclick={scrollToProjects} big>See projects</PillButton>
      <PillButton href="#submit" onclick={scrollToForm} big green>Share a project</PillButton>
    </div>
  </header>
)
