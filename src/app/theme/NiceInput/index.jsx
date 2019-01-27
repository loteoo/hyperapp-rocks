import {h} from 'hyperapp'

import './style.css'

export const NiceInput = ({label = label || 'Label', name = name || 'name', type, placeholder = placeholder || ' ', value, required, hint, setter, ...rest}) => (
  <div class={`nice-input${name ? ' ' + name : ''}`} key={name}>
    {
      type === 'textarea'
      ? <textarea name={name} id={name} placeholder={placeholder} oninput={(state, ev) => setter(state, name, ev)} required={required} {...rest}>{value}</textarea>
      : <input type={type || 'text'} name={name} id={name} placeholder={placeholder} value={value} oninput={(state, ev) => setter(state, name, ev)} required={required} {...rest} />
    }
    <label for={name}>{label}</label>
    <div class="border"></div>
    {hint && <p class="hint">{hint}</p>}
  </div>
)
