import {h} from 'hyperapp'

import './project-form.css'

import {NiceInput} from '../NiceInput/NiceInput.js'


export const ProjectForm = ({title, author, description, link, thumbnail, github}) => (state, actions) => (
  <form class="project-form" key="project-form" method="post" onsubmit={actions.handleProjectForm}>
    <h2>Submit your project!</h2>
    {/* <p>Full name: <b>{author} {description}</b></p> */}

    <NiceInput label="Title" name="title" value={title} placeholder="My awesome project" setter={actions.setProjectForm} required />
    <NiceInput type="url" label="Project URL" name="link" value={link} placeholder="https://" setter={actions.setProjectForm} required />
    <NiceInput type="textarea" label="Description" name="description" value={description} placeholder="Short project description..." setter={actions.setProjectForm} required />
    <NiceInput label="Author" name="author" value={author} placeholder="Who did this?" setter={actions.setProjectForm} />
    <NiceInput pattern="^https://github.com/(.*)" label="Github" name="github" value={github} placeholder="Sharing is caring :)" setter={actions.setProjectForm} />
    {/* <ImageInput label="Image" name="thumbnail" required /> */}


    <div class="actions">
      <button type="submit">Submit</button>
    </div>
  </form>
)

// import {ProjectForm} from './ProjectForm/ProjectForm.js'
// <ProjectForm {...state.projectForm} />
