import {h} from 'hyperapp'

import './style.css'

import {SetPath} from '../../actions'

import {Github, LinkIcon} from '../../theme/Icons'

import {stopPropagation} from '../../utils'

export const Project = ({project}) => (
  <div class="project" key={project._id} onclick={[SetPath, `/${project._id}`]}>
    <div class="img">
      {project._attachments && <img src={`//${window.location.hostname}:5984/hyperapp-projects/${project._id}/${Object.keys(project._attachments)[0]}`} alt={project.title} />}
      <div class="overlay">
        {project.github && <a href={project.github} onclick={stopPropagation} target="_blank"><Github /></a>}
        {project.link && <a href={project.link} onclick={stopPropagation} target="_blank"><LinkIcon /></a>}
      </div>
    </div>
    <div class="info">
      <h4>{project.title}</h4>
      <p class="description">{project.description}</p>
    </div>
  </div>
)
