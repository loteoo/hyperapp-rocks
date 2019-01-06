

import {Http} from '../../utils'

// Nested setter for the project form
export const SetProjectForm = (state, key, ev) => ({
  ...state,
  projectForm: {
    ...state.projectForm,
    [key]: ev.target.value
  }
})



// Handles project submission
export const HandleProjectForm = (state, ev) => {
  ev.preventDefault()

  // Grab only what we need from the form's state
  const submission = {title, link, description, author, github, thumbnail} = state.projectForm

  return [
    {
      ...state,
      projectForm: {
        ...state.projectForm,
        submitted: true
      }
    },
    Http.post({
      url: `/hyperapp-projects`,
      data: submission,
      action: HandleSubmissionResponse,
      error: HandleSubmissionError
    })
  ];
}



export const HandleSubmissionResponse = (state, data) => {
  console.log(data);
  return ({
    ...state,
    projectForm: {
      ...state.projectForm,
      success: true
    }
  })
}

export const HandleSubmissionError = (state, err) => {
  console.log(err);
  return ({
    ...state,
    projectForm: {
      ...state.projectForm,
      error: true
    }
  })
}
