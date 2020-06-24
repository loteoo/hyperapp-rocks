
import { css } from 'emotion'

import { Navigate } from '../actions'

import { Github, LinkIcon } from '../theme/Icons'

import { stopPropagation, couchUrl } from '../../utils'

const style = css`
  background-color: white;
  border-radius: 0.33em;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 10px 40px 0 rgba(62,57,107,0.07), 0 2px 9px 0 rgba(62,57,107,0.06);
  transform: translateY(0);
  transition: transform 200ms, box-shadow 200ms;
  will-change: transform, box-shadow;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    box-shadow: 0 16px 32px 0 rgba(62,57,107,0.28), 0 0 0 transparent;
    transform: translateY(-5px);
  }
  .img {
    background-color: var(--text-color);
    padding-top: 66.66%;
    position: relative;
    overflow: hidden;
  }
  .img > img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    object-fit: cover;
  }
  .img > .overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 0.5rem;
    background-color: rgba(0, 0, 0, 0.33);
    opacity: 0;
    transition: opacity 200ms;
    pointer-events: none;
  }
  .img > .overlay > * {
    color: #f8faff;
    display: inline-block;
    padding: 0.5rem;
    border-radius: 0.15em;
    transition: color 200ms, background-color 200ms;
    pointer-events: all;
  }

  @media (hover: none) {
    .img > .overlay > * {
      pointer-events: none;
    }
  }

  @media (max-width: 640px) {
    .img > .overlay > * {
      pointer-events: none;
    }
  }

  .img > .overlay > *:not(:last-child) {
    margin-right: 0.25rem;
  }

  .img > .overlay > *:hover {
    color: white;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .info {
    padding: 1rem;
  }
  .info>* {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &:hover >.img >.overlay {
    opacity: 1;
  }
`
export const Project = ({ project }) => (
  <a href={`/${project._id}`} class={style} role='dialog' key={project._id} onclick={[Navigate, ev => { ev.preventDefault(); return `/${project._id}` }]}>
    <div class='img'>
      {project._attachments && <img src={`${couchUrl}/projects/${project._id}/${Object.keys(project._attachments)[0]}`} alt={project.title} />}
      <object class='overlay'>
        {project.github && <a href={project.github} onclick={stopPropagation} target='_blank'><Github /></a>}
        {project.link && <a href={project.link} onclick={stopPropagation} target='_blank'><LinkIcon /></a>}
      </object>
    </div>
    <div class='info'>
      <h4>{project.title}</h4>
      <p class='description'>{project.description}</p>
    </div>
  </a>
)
