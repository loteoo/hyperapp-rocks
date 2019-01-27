

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







// Location baggy
export const Location = {

  go: (props) => ({
    effect: (props, dispatch) => {
      history.pushState(null, '', props.to)
      dispatchEvent(new CustomEvent('pushstate'))
    },
    to: props.to
  }),

  // Listen to location changes
  changed: props => ({
    effect: (props, dispatch) => {
      const handleLocationChange = ev => {
        dispatch(props.action, window.location.pathname)
      }
      addEventListener('pushstate', handleLocationChange)
      addEventListener('popstate', handleLocationChange)
      return () => {
        removeEventListener('pushstate', handleLocationChange)
        removeEventListener('popstate', handleLocationChange)
      }
    },
    action: props.action
  })
}





// Audio effect baggy
export const Sound = {
  play: (props) => ({
    effect: (props, dispatch) => {
      const sound = new Audio(props.trackUrl)
      sound.volume = props.volume
      sound.play()
    },
    trackUrl: props.trackUrl,
    volume: props.volume
  })
}




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


export const couchUrl = `//${window.location.hostname}:5984`