import {h} from 'hyperapp'
import {Link} from "@hyperapp/router"


import {Modal} from '../common/Modal/Modal.js'

import {Spinner} from '../common/Spinner/Spinner.js'
import {Github} from '../icons/Github.js'

import './project-viewer.css'


export const ProjectViewer = ({
  match,
  id = match.params.id
}) => (
  state,
  actions,
  project = state.projectsData && state.projectsData[id] ? state.projectsData[id] : null
) => {

  if (!project) {
    actions.fetchProject(id)
  }
  

  return (
    <Modal close={() => actions.location.go('/')}>
      <div class="project-viewer">
        {
          project
            ? project._id
              ? <Project {...project} />
              : <FourOhFour />
            : <Spinner large />
        }
      </div>
    </Modal>
  )
}

const Project = ({_id, title, author, github, link, description, thumbnail}) => (
  <div class="project-content" key={_id}>
    <a href={link} target="_blank" class="img">
      {thumbnail ? <img src={`http://hyperapp.rocks${thumbnail.url}`} alt={title}/> : null}
    </a>
    <div class="info">
      <h2>{title}</h2>
      <p>Website: <a href={link} target="_blank">{link}</a></p>
      {author ? <p>Author: <b>{author}</b></p> : null}
      {github ? <p><a href={github} target="_blank"><Github />Github</a></p> : null}
    </div>
    <div class="description">
      {description}
    </div>
  </div>
)


const FourOhFour = () => (
  <div class="four-of-four">
    <h2>404.</h2>
  </div>
)


const Close = () => (
  <Link to="/" class="close">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  </Link>
)