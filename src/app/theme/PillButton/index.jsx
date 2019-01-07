import {h} from 'hyperapp'

import './style.css'

export const PillButton = ({href, className, type = type || 'button', ...rest}, children) => (
  href ? (
    <a className={`pill-button${className ? ' ' + className : ''}`} href={href} {...rest}>
      {children}
    </a>
  ) : (
    <button className={`pill-button${className ? ' ' + className : ''}`} type={type} {...rest}>
      {children}
    </button>
  )
)