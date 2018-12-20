import {h} from 'hyperapp'

import './project-form.css'

import {NiceInput} from '../common/NiceInput/NiceInput.js'
import {ImageInput} from '../common/ImageInput/ImageInput.js'
import {PillButton} from '../common/PillButton/PillButton.js'


export const ProjectForm = ({title, author, description, link, thumbnail, github, submitted}) => (state, actions) => (
  <div class="project-form" key="project-form">
    {
      !submitted
        ?
        <form method="post" onsubmit={actions.handleProjectForm}>
          <h2>Submit your project!</h2>
          {/* <p>Full name: <b>{author} {description}</b></p> */}
    
          <NiceInput label="Title" name="title" value={title} placeholder="My awesome project" setter={actions.setProjectForm} required />
          <NiceInput type="url" label="Project URL" name="link" value={link} placeholder="https://" setter={actions.setProjectForm} required />
          <NiceInput type="textarea" label="Description" name="description" value={description} placeholder="Short project description..." setter={actions.setProjectForm} required />
          <NiceInput label="Author" name="author" value={author} placeholder="Who did this?" setter={actions.setProjectForm} />
          <NiceInput pattern="^https://github.com/(.*)" label="Github" name="github" value={github} placeholder="Sharing is caring :)" setter={actions.setProjectForm} />
          <ImageInput label="Image" hint="Recommended size: 640x427" name="thumbnail" setter={actions.setProjectForm} required />
    
          <div class="actions">
            <PillButton to="/requirements" white>View requirements</PillButton>
            <PillButton type="submit" long green>Submit</PillButton>
          </div>
        </form>
        :
        <div class="thanks">
          <h2>Thank you for your submission!</h2>
        </div>
    }
  </div>
)
