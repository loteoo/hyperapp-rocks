import {h} from 'hyperapp'

import './style.css'

// Components
import {Modal} from '../../theme/Modal'
import {Spinner} from '../../theme/Spinner'
import {Github, ArrowLeftCircle, ArrowRightCircle, PlusCircle} from '../../theme/Icons'

// Actions
import {LoadProjectIfNeeded} from './actions'
import {LoadProjects} from '../Listing/actions'
import {Navigate} from '../../actions'

import {hostname} from '../../utils'

// View
export const ProjectViewer = ({state}) => {

  const id = state.path.substring(1)

  const project = state.projects && state.projects[id] && state.projects[id]

  // if (!project) {
  //   // If the project doesn't exist in the state,
  //   // trigger a fetch to load it
  //   actions.FetchProject(id)
  // }


  return (
    <Modal close={[Navigate, '/']} onmount={[LoadProjectIfNeeded, id]}>
      <div class="project-viewer">
        {
          project
            ? project._id
              ? <Project project={project} state={state} />
              : <FourOhFour />
            : <Spinner large />
        }
      </div>
    </Modal>
  )
}




// Project large display
const Project = ({project, state}) => (
  <div class="project-content" key={project._id}>
    <a href={project.link} target="_blank" class="img">
      {project._attachments && <img src={`//${hostname}:5984/hyperapp-projects/${project._id}/${Object.keys(project._attachments)[0]}`} alt={project.title} />}
    </a>
    <div class="info">
      <h2>{project.title}</h2>
      <p>Website: <a href={project.link} target="_blank">{project.link}</a></p>
      {project.author && <p>Author: <b>{project.author}</b></p>}
      {project.github && <p><a href={project.github} target="_blank"><Github />Github</a></p>}
      <NavBtns currId={project._id} state={state} />
    </div>
    <div class="description">
      {project.description}
    </div>
  </div>
)


// 404 message when project not found
const FourOhFour = () => (
  <div class="four-of-four">
    <h2>404.</h2>
  </div>
)


// Previous and Next buttons.
const NavBtns = ({currId, state}) => {
  const currIndex = state.listing.indexOf(currId)
  return (
    <div class="nav-btns">
      {currIndex > 0 && <a onclick={[Navigate, '/' + state.listing[currIndex - 1]]} title="Previous" class="left"><ArrowLeftCircle /></a>}
      {
        currIndex < state.listing.length &&
          state.listing[currIndex + 1]
          ? <a onclick={[Navigate, '/' + state.listing[currIndex + 1]]} title="Next" class="right"><ArrowRightCircle /></a>
          : <span onclick={LoadProjects} title="Load more" class="right">{state.isFetching ? <Spinner /> : <PlusCircle />}</span>
      }
    </div>
  )
}
