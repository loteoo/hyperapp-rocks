import {h} from 'hyperapp'

import {strapiUrl} from '../../utils/'

import './project.css'

export const Project = ({title, link, description, thumbnail}) => (
  <div class="project" key="project">
    <div class="img" style={{backgroundImage: `url(${strapiUrl(thumbnail.url)})`}}></div>
    <div class="info">
      <h4>{title}</h4>
      <p class="description">{description}</p>
    </div>
  </div>
)

// import {Project} from './Project/Project.js'
// <Project />
