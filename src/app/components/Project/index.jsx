import {h} from 'hyperapp'

import './style.css'

import {Github, LinkIcon} from '../icons'

export const Project = ({_id, title, author, github, link, description, thumbnail}) => (
  <div class="project" key={_id}  onclick={ev => actions.location.go('/' + _id)}>
    <div class="img">
      {thumbnail ? <img src={`https://hyperapp.rocks${thumbnail.url}`} alt={title}/> : null}
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
