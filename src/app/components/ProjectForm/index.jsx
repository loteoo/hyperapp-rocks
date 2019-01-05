import {h} from 'hyperapp'

import './style.css'

// Components
import {NiceInput} from '../../theme/NiceInput'
import {ImageInput} from '../../theme/ImageInput'
import {PillButton} from '../../theme/PillButton'

// Actions
import {HandleProjectForm, SetProjectForm} from '../../actions'

export const ProjectForm = ({title, author, description, link, thumbnail, github, submitted}) => (
  <div class="project-form" key="project-form" id="submit">
    {
      !submitted
        ?
        <form method="post" onsubmit={HandleProjectForm}>
          <h2>Submit your project!</h2>
          {/* <p>Full name: <b>{author} {description}</b></p> */}
    
          <NiceInput label="Title" name="title" value={title} placeholder="My awesome project" setter={SetProjectForm} required />
          <NiceInput type="url" label="Project URL" name="link" value={link} placeholder="https://" setter={SetProjectForm} required />
          <NiceInput type="textarea" label="Description" name="description" value={description} placeholder="Short project description..." setter={SetProjectForm} required />
          <NiceInput label="Author" name="author" value={author} placeholder="Who did this?" setter={SetProjectForm} />
          <NiceInput pattern="^https://github.com/(.*)" label="Github" name="github" value={github} placeholder="Sharing is caring :)" setter={SetProjectForm} />
          <ImageInput label="Image" hint="Recommended size: 640x427" name="thumbnail" setter={SetProjectForm} required />
    
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
