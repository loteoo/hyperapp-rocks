import {h} from 'hyperapp'
import cc from 'classcat'

import './search-input.css'

export const SearchInput = (props, children, {label = label || 'Label', name = name || 'name', type = type || 'text', placeholder = placeholder || ' ', setter} = props) => (
  <div class={cc(['search-input', name])} key={name}>
    <input type={type} name={name} id={name} placeholder={placeholder} oninput={ev => setter({[name]: ev.target.value})} {...props} setter={null} />
    <label for={name}>{label}</label>
  </div>
)

// import {SearchInput} from './SearchInput/SearchInput.js'
// <SearchInput label="First name" name="firstName" value={firstName} setter={set} />
