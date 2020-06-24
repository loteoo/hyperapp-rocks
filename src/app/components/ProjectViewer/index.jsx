
import './style.css'

// Components
import { Modal } from '../../theme/Modal'
import { Github } from '../../theme/Icons'

// Actions
import { CloseProject } from './actions'

// View
export const ProjectViewer = ({ state }) => {
  const id = state.path.substring(1)

  const project = state.listing.find(p => p._id === id)

  return (
    <Modal closePath='/' onClose={CloseProject}>
      <div class='project-viewer'>
        {
          project
            ? <Project project={project} state={state} />
            : <FourOhFour />
        }
      </div>
    </Modal>
  )
}

// Project large display
const Project = ({ project }) => (
  <div class='project-content' key={project._id}>
    <a href={project.link} target='_blank' class='img'>
      {project._attachments && <img src={`/images/${Object.keys(project._attachments)[0]}`} alt={project.title} />}
    </a>
    <div class='info'>
      <h2>{project.title}</h2>
      <p>Website: <a href={project.link} target='_blank'>{project.link}</a></p>
      {project.author && <p>Author: <b>{project.author}</b></p>}
      {project.github && <p><a href={project.github} target='_blank'><Github />Github</a></p>}
      {/* <NavBtns currId={project._id} state={state} /> */}
    </div>
    <div class='description'>
      {project.description}
    </div>
  </div>
)

// 404 message when project not found
const FourOhFour = () => (
  <div class='four-of-four'>
    <h2>404.</h2>
  </div>
)
