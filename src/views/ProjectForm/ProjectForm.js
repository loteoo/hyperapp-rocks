import {h} from 'hyperapp'

import './project-form.css'

import {NiceInput} from '../NiceInput/NiceInput.js'


export const ProjectForm = ({firstName, lastName, projectUrl, projectImg}) => (state, actions) => (
  <form class="project-form" key="project-form" method="post" onsubmit={actions.handleProjectForm}>
    <h2>Submit your project!</h2>
    {/* <p>Full name: <b>{firstName} {lastName}</b></p> */}

    <NiceInput label="First name" name="firstName" value={firstName} setter={actions.setProjectForm} />
    <NiceInput label="Last name" name="lastName" value={lastName} setter={actions.setProjectForm} />
    <NiceInput label="Project URL" name="projectUrl" value={projectUrl} setter={actions.setProjectForm} />
    <NiceInput label="Image" name="projectImg" value={projectImg} setter={actions.setProjectForm} />


    <div class="actions">
      <button type="submit">Submit</button>
    </div>
  </form>
)

// import {ProjectForm} from './ProjectForm/ProjectForm.js'
// <ProjectForm {...state.projectForm} />
