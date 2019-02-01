

import {Http, File, Sound, slugify, couchUrl} from '../../../utils'

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
  if (!acceptedMimes.includes(file.type)) {
    return {
      ...state,
      projectForm: {
        ...state.projectForm,
        imageError: 'Invalid file type'
      }
    }
  }
  
  if (file.size > 1048576) {
    return {
      ...state,
      projectForm: {
        ...state.projectForm,
        imageError: 'File is too large. Maximum: 1MB'
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


export const ResetProjectFormImage = (state, blob) => ({
  ...state,
  projectForm: {
    ...state.projectForm,
    imageBlob: null,
    image: null,
    imageError: null
  }
})







// Handles project submission
export const HandleProjectForm = (state, ev) => {
  ev.preventDefault()
  
  const fileName = slugify(state.projectForm.image.name.split('.')[0]) + '.' + state.projectForm.image.name.split('.')[1]

  return [
    {
      ...state,
      projectForm: {
        ...state.projectForm,
        submitted: true,
        loading: true
      }
    },
    Http.post({
      url: `${couchUrl}/projects`,
      data: {
        title: state.projectForm.title,
        link: state.projectForm.link,
        description: state.projectForm.description,
        author: state.projectForm.author,
        github: state.projectForm.github,
        status: 'pending',
        createdAt: new Date().toISOString(),
        _attachments: {
          [fileName]: {
            content_type: state.projectForm.image.type,
            data: state.projectForm.imageBlob.replace(/^.*;base64,/, '')
          }
        }
      },
      action: HandleSubmissionResponse,
      error: HandleSubmissionError
    })
  ]
}

export const HandleSubmissionResponse = (state, res) => {
  console.log(res);

  return [
    {
      ...state,
      projectForm: {
          ...state.projectForm,
        loading: false,
        success: true
      }
    },
    Sound.play({
      trackUrl: '/success.mp3',
      volume: 0.25
    })
  ]
}

export const HandleSubmissionError = (state, err) => {
  console.error(err);
  return {
    ...state,
    projectForm: {
      ...state.projectForm,
      loading: false,
      error: 'Submission failed. Could not reach database.'
    }
  }
}
   