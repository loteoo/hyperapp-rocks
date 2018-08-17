// Utility functions

export const replace = (destination, source) => source

export const generateUUID = () =>
  ('' + 1e7 + -1e3 + -4e3 + -8e3 + -1e11)
    .replace(/1|0/g, function () {
      return (0 | Math.random() * 16)
        .toString(16)
    })


// Makes sur the URL is the STRAPI one (correct host & port)
export const strapiUrl = (path, strapiOrigin = `${location.protocol}//${location.hostname}:80`) => 
  path.startsWith(strapiOrigin)
    ? path
    : strapiOrigin + path


export const getData = (url) => {
  return fetch(strapiUrl(url))
    .then(response => response.json())
    .catch(error => console.error(`Fetch error:\n`, error))
}


export const postData = (url, data) => {
  return fetch(strapiUrl(url), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(error => console.error(`Fetch error:\n`, error))
}


export const postImage = (url, data) => {

  let formData  = new FormData();

  for(let name in data) {
    formData.append(name, data[name]);
  }

  return fetch(strapiUrl(url), {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .catch(error => console.error(`Fetch error:\n`, error))
}


