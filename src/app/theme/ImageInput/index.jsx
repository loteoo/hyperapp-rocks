
import './style.css'

import {XCircle, ArrowRight} from '../Icons'

export const ImageInput = ({label = label || 'Label', name = name || 'name', image, blob, setter, resetter, hint, error, ...rest}) => (
  <div class={`image-input${name ? ' ' + name : ''}`} key={name}>
    {blob ? (
      <div class="preview">
        <div class="original">
          <img class="img shadow" src={blob} title={image.name} alt={image.name} />
          <div class="info">
            <p class="name">
              <b>{image.name}</b>
              <a onclick={[resetter, name]}><XCircle /></a>
            </p>
            <p>{image.type} — {Math.ceil(image.size / 1000)} kb</p>
          </div>
        </div>
        <div class="arrow">
          <ArrowRight />
        </div>
        <div class="thumbnail shadow">
          <img src={blob} title={image.name + ' - Cropped 3:2'} alt={image.name} />
        </div>
      </div>
    ) : [
        <input type="file" name={name} id={name} onchange={[setter, name]} invalid={!!error} {...rest} />,
        <div class="picker"></div>,
        <div class="border"></div>,
        hint && <p class="hint">{hint}</p>,
        error && <p class="error">{error}</p>
    ]}
    <label key={'label-' + name} for={name}>{label}</label>
  </div>
)
