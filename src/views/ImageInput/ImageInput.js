import {h} from 'hyperapp'
import cc from 'classcat'

import './image-input.css'

export const ImageInput = (props, children, {label = label || 'Label', name = name || 'name', setter} = props) => (
  <div class={cc(['image-input', name])} key={name}>
    <input type="file" name={name} id={name} oninput={ev => setter({[name]: ev.target.files})} {...props} setter={null} />
    <div class="picker"></div>
    <label for={name}>{label}</label>
    <div class="border"></div>
  </div>
)

// import {ImageInput} from './ImageInput/ImageInput.js'
// <ImageInput label="First name" name="firstName" value={firstName} setter={set} />
