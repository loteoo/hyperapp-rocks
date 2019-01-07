import {h} from 'hyperapp'

import './style.css'

const acceptedMimes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']

// Utility
const validate = (ev, name, setter, file = ev.target.files[0]) => {
  if (!acceptedMimes.includes(file.type) || file.size > 1048576) {
    console.log('Invalid file')
    ev.target.value = null
    ev.target.classList.add('invalid-file')
    return false
  } else {
    ev.target.classList.remove('invalid-file')
    setter({[name]: file})
  }
}

// View
export const ImageInput = ({label = label || 'Label', name = name || 'name', setter, hint, ...rest}) => (
  <div class={`image-input${name ? ' ' + name : ''}`} key={name}>
    <input type="file" name={name} id={name} onchange={[setter, name]} {...rest} />
    <div class="picker"></div>
    <label for={name}>{label}</label>
    <div class="border"></div>
    {hint && <p class="hint">{hint}</p>}
  </div>
)