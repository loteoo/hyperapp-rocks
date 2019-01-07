import {h} from 'hyperapp'

import './style.css'

export const ImageInput = ({label = label || 'Label', name = name || 'name', setter, hint, ...rest}) => (
  <div class={`image-input${name ? ' ' + name : ''}`} key={name}>
    <input type="file" name={name} id={name} onchange={[setter, name]} {...rest} />
    <div class="picker"></div>
    <label for={name}>{label}</label>
    <div class="border"></div>
    {hint && <p class="hint">{hint}</p>}
  </div>
)