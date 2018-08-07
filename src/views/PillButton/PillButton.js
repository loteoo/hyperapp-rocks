import {h} from 'hyperapp'

import './pill-button.css'

export const PillButton = (props, children) => (
  <button class="pill-button" {...props}>
    {children}
  </button>
)

// import {PillButton} from './PillButton/PillButton.js'
// <PillButton />
