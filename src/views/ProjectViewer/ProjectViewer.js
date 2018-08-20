import {h} from 'hyperapp'
import {Link} from "@hyperapp/router"


import {Modal} from '../common/Modal/Modal.js'

import {Spinner} from '../common/Spinner/Spinner.js'
import {Github} from '../icons/Github.js'

import './project-viewer.css'


// Loads projects specified in the URL
// and displays them in a popup modal
export const ProjectViewer = ({
  match,
  id = match.params.id
}) => (
  state,
  actions,
  project = state.projectsData && state.projectsData[id] ? state.projectsData[id] : null
) => {

  if (!project) {
    // If the project doesn't exist in the state,
    // trigger a fetch to load it
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




// Project full display
const Project = ({_id, title, author, github, link, description, thumbnail}) => (
  <div class="project-content" key={_id}>
    <a href={link} target="_blank" class="img">
      {thumbnail ? <img src={`https://hyperapp.rocks${thumbnail.url}`} alt={title}/> : null}
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


// 404 message when project not found
const FourOhFour = () => (
  <div class="four-of-four">
    <h2>404.</h2>
  </div>
)