import {h} from 'hyperapp'

import {strapiUrl} from '../../utils/'

import {Github} from '../Icons/Github.js'
import {LinkIcon} from '../Icons/LinkIcon.js'

import './project.css'

export const Project = ({_id, title, author, github, link, description, thumbnail}) => (state, actions) => (
  <div class="project" key={_id}  onclick={ev => actions.location.go('/' + _id)}>
    <div class="img">
      <img src={strapiUrl(thumbnail.url)} alt={title} />
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

// import {Project} from './Project/Project.js'
// <Project />
