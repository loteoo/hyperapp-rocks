import {h} from 'hyperapp'
import {Link} from "@hyperapp/router"
import cc from 'classcat'

import './style.css'

export const PillButton = ({href, className, type = type || 'button', ...rest}, children) => 
href ? (
    <a className={cc(['pill-button', className])} href={href} {...rest}>
      {children}
    </a>
  ) : (
    <button className={cc(['pill-button', className])} type={type} {...rest}>
      {children}
    </button>
  )

// import {PillButton} from './PillButton/PillButton.js'
// <PillButton />
