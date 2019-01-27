const fetch = require('node-fetch');

fetch('https://hyperapp.rocks/api/project')
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
    fetch('https://hyperapp.rocks' + item.thumbnail.url)
      .then(res => {
        const type = res.headers.get('content-type')
        res.buffer().then(buffer => {
          fetch(`http://localhost:5984/projects`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: item.title,
              link: item.link,
              title: item.title,
              description: item.description,
              author: item.author,
              github: item.github,
              status: item.status,
              createdAt: item.createdAt,
              _attachments: {
                [item.thumbnail.name]: {
                  content_type: type,
                  data: buffer.toString('base64')
                }
              }
            })
          })
        })
      })
    })
  })