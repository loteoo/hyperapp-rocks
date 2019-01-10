

import {Http, File, slugify} from '../../utils'

// Nested setter for the project form
export const SetProjectForm = (state, key, ev) => ({
  ...state,
  projectForm: {
    ...state.projectForm,
    [key]: ev.target.value
  }
})


const acceptedMimes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']

// Nested setter for the project form
export const SetProjectFormImage = (state, key, ev) => {
  const file = ev.target.files[0]
  if (!acceptedMimes.includes(file.type) || file.size > 1048576) {
    return {
      ...state,
      projectForm: {
        ...state.projectForm,
        error: 'Invalid file type'
      }
    }
  }
  return [
    {
      ...state,
      projectForm: {
        ...state.projectForm,
        [key]: file
      }
    },
    File.read({
      file: file,
      action: HandleFileReadOutput,
      error: HandleFileReadError
    })
  ]
}

export const HandleFileReadOutput = (state, blob) => ({
  ...state,
  projectForm: {
    ...state.projectForm,
    imageBlob: blob
  }
})

export const HandleFileReadError = (state, err) => {
  console.log(err);
  return {
    ...state,
    projectForm: {
      ...state.projectForm,
      error: 'Image read failed'
    }
  }
}






// Handles project submission
export const HandleProjectForm = (state, ev) => {
  ev.preventDefault()
  return [
    {
      ...state,
      projectForm: {
        ...state.projectForm,
        submitted: true
      }
    },
    Http.post({
      url: `//${window.location.hostname}:5984/hyperapp-projects`,
      data: {
        title: state.projectForm.title,
        link: state.projectForm.link,
        title: state.projectForm.title,
        description: state.projectForm.description,
        author: state.projectForm.author,
        github: state.projectForm.github
      },
      action: HandleSubmissionResponse,
      error: HandleSubmissionError
    })
  ]
}






export const HandleSubmissionResponse = (state, res) => {
  console.log(res);
  const fileName = slugify(state.projectForm.image.name.split('.')[0]) + state.projectForm.image.name.split('.')[1]
  return [
    {
      ...state,
      projectForm: {
        ...state.projectForm,
      success: true
      }
    },
    Http.put({
      url: `//${window.location.hostname}:5984/hyperapp-projects/${res.id}/${fileName}?rev=${res.rev}`,
      data: state.projectForm.imageBlob,
      action: console.log,
      error: console.error
    })
  ]
}

export const HandleSubmissionError = (state, err) => {
  console.log(err);
  return {
    ...state,
    projectForm: {
      ...state.projectForm,
      error: 'Submission failed'
    }
  }
}
   