import {h} from 'hyperapp'
import cc from 'classcat'

import './image-input.css'

const acceptedMimes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']


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


export const ImageInput = (props, children, {label = label || 'Label', name = name || 'name', setter} = props) => (
  <div class={cc(['image-input', name])} key={name}>
    <input type="file" name={name} id={name} onchange={ev => validate(ev, name, setter)} {...props} setter={null} />
    <div class="picker"></div>
    <label for={name}>{label}</label>
    <div class="border"></div>
  </div>
)