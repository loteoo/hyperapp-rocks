import {h} from 'hyperapp'
import {Link} from "@hyperapp/router"

import './pill-button.css'

export const PillButton = (props, children, {to, type = type || 'button'} = props) => 
  to ? (
    <Link class="pill-button" to={to} {...props}>
      {children}
    </Link>
  ) : (
    <button class="pill-button" type={type} {...props}>
      {children}
    </button>
  )

// import {PillButton} from './PillButton/PillButton.js'
// <PillButton />
