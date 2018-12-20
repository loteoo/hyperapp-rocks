import {h} from 'hyperapp'
import {Link} from "@hyperapp/router"
import cc from 'classcat'

import './pill-button.css'

export const PillButton = ({to, className, type = type || 'button', ...rest}, children) => 
  to ? (
    <Link className={cc(['pill-button', className])} to={to} {...rest}>
      {children}
    </Link>
  ) : (
    <button className={cc(['pill-button', className])} type={type} {...rest}>
      {children}
    </button>
  )

// import {PillButton} from './PillButton/PillButton.js'
// <PillButton />
