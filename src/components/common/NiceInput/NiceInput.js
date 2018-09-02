import {h} from 'hyperapp'
import cc from 'classcat'

import './nice-input.css'



export const NiceInput = (props, children, {label = label || 'Label', name = name || 'name', type = type || 'text', placeholder = placeholder || ' ', value, required, setter} = props) => (
  <div class={cc(['nice-input', name])} key={name}>
    {
      type === 'textarea'
      ? <textarea name={name} id={name} placeholder={placeholder} oninput={ev => setter({[name]: ev.target.value})} required={required}>{value}</textarea>
      : <input type={type} name={name} id={name} placeholder={placeholder} value={value} oninput={ev => setter({[name]: ev.target.value})} {...props} setter={null} />
    }
    <label for={name}>{label}</label>
    <div class="border"></div>
  </div>
)

// import {NiceInput} from './common/NiceInput/NiceInput.js'
// <NiceInput label="First name" name="firstName" value={firstName} setter={set} />
