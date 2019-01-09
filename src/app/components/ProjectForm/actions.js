

import {Http} from '../../utils'

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
  return {
    ...state,
    projectForm: {
      ...state.projectForm,
      [key]: file
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
    Http.upload({
      url: `//${window.location.hostname}:8080/upload`,
      data: state.projectForm.image,
      action: HandleUploadResponse,
      error: HandleUploadError
    })
  ]
}



export const HandleUploadResponse = (state, data) => {
  console.log(data);
  return [
    {
      ...state,
      projectForm: {
        ...state.projectForm,
        imageUploaded: true,
        imagePath: data.imagePath
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
        github: state.projectForm.github,
        thumbnail: data.imagePath
      },
      action: HandleSubmissionResponse,
      error: HandleSubmissionError
    })
  ]
}


export const HandleUploadError = (state, err) => {
  console.log(err);
  return {
    ...state,
    projectForm: {
      ...state.projectForm,
      error: 'Image upload failed'
    }
  }
}



export const HandleSubmissionResponse = (state, data) => {
  console.log(data);
  return {
    ...state,
    projectForm: {
      ...state.projectForm,
      success: true
    }
  }
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
