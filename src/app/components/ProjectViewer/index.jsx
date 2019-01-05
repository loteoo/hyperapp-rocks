import {h} from 'hyperapp'

import './style.css'

// Components
import {Modal} from '../../theme/Modal'
import {Spinner} from '../../theme/Spinner'
import {Github, ArrowLeftCircle, ArrowRightCircle, PlusCircle} from '../icons'

// Actions
import {SetPath, LoadProjects} from '../../actions'

// View
export const ProjectViewer = ({state}) => {

  const project = state.projectCache && state.projectCache[id] && state.projectCache[id]

  // if (!project) {
  //   // If the project doesn't exist in the state,
  //   // trigger a fetch to load it
  //   actions.FetchProject(id)
  // }


  return (
    <Modal close={[SetPath, '/']}>
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




// Project large display
const Project = ({_id, title, author, github, link, description, thumbnail}) => (
  <div class="project-content" key={_id}>
    <a href={link} target="_blank" class="img">
      {thumbnail && <img src={`https://hyperapp.rocks${thumbnail.url}`} alt={title}/>}
    </a>
    <div class="info">
      <h2>{title}</h2>
      <p>Website: <a href={link} target="_blank">{link}</a></p>
      {author && <p>Author: <b>{author}</b></p>}
      {github && <p><a href={github} target="_blank"><Github />Github</a></p>}
      <NavBtns currId={_id} />
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


// Previous and Next buttons.
const NavBtns = ({currId, state}) => {
  const currIndex = state.projects.indexOf(currId)
  return (
    <div class="nav-btns">
      {
        currIndex > 0 && <a to={'/' + state.projects[currIndex - 1]} title="Previous" class="left"><ArrowLeftCircle /></a>
      }
      {
        currIndex < state.projects.length &&
          state.projects[currIndex + 1]
            ? <a to={'/' + state.projects[currIndex + 1]} title="Next" class="right"><ArrowRightCircle /></a>
            : <span onclick={LoadProjects} title="Load more" class="right">{state.isFetching ? <Spinner /> : <PlusCircle />}</span>
      }
    </div>
  )
}
