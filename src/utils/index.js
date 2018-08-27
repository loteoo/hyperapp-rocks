// Utility functions



// Fetch wrapper set to the live Strapi
export const getData = (url) =>
  fetch(`https://hyperapp.rocks/api${url}`)
    .then(response => response.json())
    .catch(error => console.error(`Fetch error:\n`, error))




// Fetch wrapper  for POST requests,
// set to the live Strapi
export const postData = (url, data) =>
  fetch(`https://hyperapp.rocks/api${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(error => console.error(`Fetch error:\n`, error))




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


