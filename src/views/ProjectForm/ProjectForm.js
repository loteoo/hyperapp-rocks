import {h} from 'hyperapp'

import './project-form.css'


import {NiceInput} from '../NiceInput/NiceInput.js'
// Namespaced setter action
const set = fragment => main.update({projectForm: fragment})

// Handle form submittion
const handleSubmit = ev => (state, actions) => {
  ev.preventDefault();

  alert('Submitted!\nForm state: \n\n' + JSON.stringify(state.projectForm, null, 2));
}

export const ProjectForm = ({firstName, lastName}) => (state, actions) => (
  <form class="project-form" key="project-form" method="post" onsubmit={ev => handleSubmit(ev)(state, actions)}>
    <h2>Submit your project!</h2>
    {/* <p>Full name: <b>{firstName} {lastName}</b></p> */}

    <NiceInput label="First name" name="firstName" value={firstName} setter={set} />
    <NiceInput label="Last name" name="lastName" value={lastName} setter={set} />


    <div class="actions">
      <button type="submit">Submit</button>
    </div>
  </form>
)

// import {ProjectForm} from './ProjectForm/ProjectForm.js'
// <ProjectForm {...state.projectForm} />
