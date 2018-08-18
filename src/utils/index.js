// Utility functions

export const replace = (destination, source) => source

export const getData = (url) => {
  return fetch(`http://hyperapp.rocks:1337${url}`)
    .then(response => response.json())
    .catch(error => console.error(`Fetch error:\n`, error))
}


export const postData = (url, data) => {
  return fetch(`http://hyperapp.rocks:1337${url}`, {
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

  return fetch(`http://hyperapp.rocks:1337${url}`, {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .catch(error => console.error(`Fetch error:\n`, error))
}


