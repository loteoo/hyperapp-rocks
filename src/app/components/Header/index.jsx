import {h} from 'hyperapp'

import './style.css'
import {Search} from '../Search/Search.js'
import {PillButton} from '../common/PillButton/PillButton.js'
import {Github} from '../icons/Github.js'


export const Header = () => (state, actions) => (
  <header>
    <nav>
      <a href="https://github.com/loteoo/hyperapp-examples" target="_blank" title="Source code"><Github /></a>
    </nav>

    <h1>Hyperapp real-world examples</h1>
    <h2>A curated list of live Hyperapp projects</h2>

    <Search search={state.search} />

    <div class="actions">
      <PillButton big onclick={actions.scrollToProjects}>See projects</PillButton>
      <PillButton big green onclick={actions.scrollToForm}>Share a project</PillButton>
    </div>
  </header>
)
