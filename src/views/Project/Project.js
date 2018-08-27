import {h} from 'hyperapp'

import {Github} from '../icons/Github.js'
import {LinkIcon} from '../icons/LinkIcon.js'

import './project.css'

export const Project = ({_id, title, author, github, link, description, thumbnail}) => (state, actions) => (
  <div class="project" key={_id}  onclick={ev => actions.location.go('/' + _id)}>
    <div class="img">
      <img src={`https://hyperapp.rocks${thumbnail.url}`} alt={title} />
      <div class="overlay">
        {github ? <a href={github} onclick={ev => ev.stopPropagation()} target="_blank"><Github /></a> : null}
        {link ? <a href={link} onclick={ev => ev.stopPropagation()} target="_blank"><LinkIcon /></a> : null}
      </div>
    </div>
    <div class="info">
      <h4>{title}</h4>
      <p class="description">{description}</p>
    </div>
  </div>
)
