import { h } from 'hyperapp'

import './style.css'

import {Navigate} from '../../actions'

import {Github, LinkIcon} from '../../theme/Icons'

import {stopPropagation, couchUrl} from '../../../utils'

export const Project = ({project}) => (
  <a href={`/${project._id}`} class="project" role="dialog" key={project._id} onclick={[Navigate, `/${project._id}`]}>
    <div class="img">
      {project._attachments && <img src={`${couchUrl}/projects/${project._id}/${Object.keys(project._attachments)[0]}`} alt={project.title} />}
      <object class="overlay">
        {project.github && <a href={project.github} onclick={stopPropagation} target="_blank"><Github /></a>}
        {project.link && <a href={project.link} onclick={stopPropagation} target="_blank"><LinkIcon /></a>}
      </object>
    </div>
    <div class="info">
      <h4>{project.title}</h4>
      <p class="description">{project.description}</p>
    </div>
  </a>
)
