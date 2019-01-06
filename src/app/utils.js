

// Http service
export const Http = {

  // Fetch action
  fetch: (props) => ({
    effect: (props, dispatch) => {
      fetch(props.url)
        .then(response => response.json())
        .then(data => dispatch(props.action, data))
        .catch(err => console.log('Fetch error: ', err))
    },
    url: `//${window.location.hostname}:5984${props.url}`,
    action: props.action
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
    url: `//${window.location.hostname}:5984${props.url}`,
    data: props.data,
    action: props.action,
    error: props.error,
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








// Fetch wrapper for uploading files to Strapi
export const postImage = (url, data) => {

  // Convert a data object to a 'FormData' object.
  // This allows the fetch API to set the proper
  // headers for file uploading, which depends 
  // on the uploaded file by the user
  let formData = new FormData();

  for(let name in data) {
    formData.append(name, data[name]);
  }

  // POST to Strapi
  return fetch(`https://hyperapp.rocks/api${url}`, {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .catch(error => console.error(`Fetch error:\n`, error))
}




export const stopPropagation = (state, ev) => ev.stopPropagation()