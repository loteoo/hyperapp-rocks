

// Http service
export const Http = {

  // Fetch action
  fetch: (props) => ({
    effect: (props, dispatch) => {
      fetch(props.url)
        .then(response => response.json())
        .then(data => dispatch(props.action, data))
        .catch(err => dispatch(props.error, err))
    },
    url: props.url,
    action: props.action,
    error: props.error
  }),

  post: (props) => ({
    effect: (props, dispatch) => {
      fetch(props.url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(props.data)
      })
        .then(response => response.json())
        .then(data => dispatch(props.action, data))
        .catch(err => dispatch(props.error, err))
    },
    url: props.url,
    data: props.data,
    action: props.action,
    error: props.error
  }),

  put: (props) => ({
    effect: (props, dispatch) => {
      fetch(props.url, {
        method: 'PUT',
        body: props.data
      })
        .then(response => response.json())
        .then(data => dispatch(props.action, data))
        .catch(err => dispatch(props.error, err))
    },
    url: props.url,
    data: props.data,
    action: props.action,
    error: props.error
  }),

  upload: (props) => ({
    effect: (props, dispatch) => {

      

      // Convert a data object to a 'FormData' object.
      // This allows the fetch API to set the proper
      // headers for file uploading, which depends 
      // on the uploaded file by the user
      let formData = new FormData();

      formData.append('file', props.data);
      
      fetch(props.url, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => dispatch(props.action, data))
        .catch(err => dispatch(props.error, err))
    },
    url: props.url,
    data: props.data,
    action: props.action,
    error: props.error
  })
};





export const File = {
  read: (props) => ({
    effect: (props, dispatch) => {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        dispatch(props.action, reader.result)
      }, false);
      reader.readAsDataURL(props.file);
    },
    file: props.file,
    action: props.action
  })
};






// Listen to hash changes in the browser
export const LocationChanged = props => ({
  effect: (props, dispatch) => {
    const eventListener = event => {
      dispatch(props.action, window.location.pathname)
    }
    addEventListener("hashchange", eventListener)
    return () => removeEventListener("hashchange", eventListener)
  },
  action: props.action
})






// DOM custom event (hyperapp will treat this like any other event)
export const enableOnMountDomEvent = () => {
  const mountEvent = new Event('mount')
  const realCreateElement = document.createElement.bind(document)
  document.createElement = (name) => {
    let el = realCreateElement(name)
    setTimeout(() => el.dispatchEvent(mountEvent))
    return el
  }
}





export const stopPropagation = (state, ev) => ev.stopPropagation()


export const slugify = (text) => 
  text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text

