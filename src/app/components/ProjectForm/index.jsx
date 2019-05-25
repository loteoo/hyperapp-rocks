import {h} from '../../../../hyperapp'

import './style.css'

// Components
import {NiceInput} from '../../theme/NiceInput'
import {ImageInput} from '../../theme/ImageInput'
import {PillButton} from '../../theme/PillButton'
import {Spinner} from '../../theme/Spinner'
import {Confetti} from '../../theme/Icons'

// Actions
import {HandleProjectForm, SetProjectForm, SetProjectFormImage, ResetProjectFormImage} from './actions'
import {Navigate} from '../../actions'

export const ProjectForm = ({projectForm}) => (
  <div class="project-form" id="submit" role="form">
    <div class={'box' + (projectForm.success ? ' success' : '')}>
    {
      !projectForm.submitted
        ? (
          <form method="post" onsubmit={HandleProjectForm}>
            <h2>Submit your project!</h2>
            {/* <p>Full name: <b>{author} {description}</b></p> */}
      
            <NiceInput label="Title" name="title" value={projectForm.title} placeholder="My awesome project" setter={SetProjectForm} required />
            <NiceInput type="url" label="Project URL" name="link" value={projectForm.link} placeholder="https://" setter={SetProjectForm} required />
            <NiceInput type="textarea" label="Description" name="description" value={projectForm.description} placeholder="Describe your project, make it sound cool!" setter={SetProjectForm} required />
            <NiceInput label="Author" name="author" value={projectForm.author} placeholder="Who did this?" setter={SetProjectForm} />
            <NiceInput pattern="^https://github.com/(.*)" label="Github" name="github" value={projectForm.github} placeholder="Sharing is caring :)" setter={SetProjectForm} />
            

            <ImageInput
              label="Project image"
              hint="Recommended size: 640x427"
              name="image"
              image={projectForm.image}
              blob={projectForm.imageBlob}
              setter={SetProjectFormImage}
              resetter={ResetProjectFormImage}
              error={projectForm.imageError}
              required
            />

            <div class="actions">
              <PillButton onclick={[Navigate, '/requirements']} white>View requirements</PillButton>
              <PillButton type="submit" long green>Submit</PillButton>
            </div>
          </form>
        ) : projectForm.loading
          ? (
            <div class="loading">
              <Spinner large />
            </div>
          )
          : projectForm.success 
            ? (
              <div class="thanks">
                <h2>Thanks for participating! 💖</h2>
                <p>Your project should soon be added to the list!</p>
                <Confetti />
                <p>If you want to update anything about it, just ask me <br />on the <a href="https://hyperappjs.herokuapp.com/" target="_blank">hyperapp slack</a> (@loteoo) or via <a href="mailto:dev@alexlotte.ca">email</a>!</p>
              </div>
            )
            : <div class="error">Error: {projectForm.error}</div>
        }
    </div>
  </div>
)
