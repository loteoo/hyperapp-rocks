import {h} from 'hyperapp'

import {strapiUrl} from '../../utils/'

import './project.css'

export const Project = ({_id, title, link, description, thumbnail}) => (state, actions) => (
  <div class="project" key={_id}  onclick={ev => actions.location.go('/' + _id)}>
    <div class="img" style={thumbnail ? {backgroundImage: `url(${strapiUrl(thumbnail.url)})`} : null}></div>
    <div class="info">
      <h4>{title}</h4>
      <p class="description">{description}</p>
    </div>
  </div>
)

// import {Project} from './Project/Project.js'
// <Project />
