import {h} from 'hyperapp'

import './style.css'

import {SetPath} from '../../actions'

import {Github, LinkIcon} from '../icons'

import {stopPropagation} from '../../utils'

export const Project = ({_id, title, author, github, link, description, thumbnail}) => (
  <div class="project" key={_id} onclick={[SetPath, `/${_id}`]}>
    <div class="img">
      {thumbnail && <img src={`/uploads/${thumbnail}`} alt={title}/>}
      <div class="overlay">
        {github && <a href={github} onclick={stopPropagation} target="_blank"><Github /></a>}
        {link && <a href={link} onclick={stopPropagation} target="_blank"><LinkIcon /></a>}
      </div>
    </div>
    <div class="info">
      <h4>{title}</h4>
      <p class="description">{description}</p>
    </div>
  </div>
)
