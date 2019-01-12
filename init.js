const fetch = require('node-fetch');


// Login
fetch(`http://localhost:5984/_session`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'looty_admin',
    password: 'looty_password'
  })
})

.then(console.log)

// Create DB

.then(fetch(`http://localhost:5984/hyperapp-projects/_design/projects`, {
  method: 'PUT',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    _id: '_design/projects',
    language: 'javascript',
    views: {
      'by-created': {
        map: 'function (doc) {\n  if (doc.status === \'published\') {\n    emit(doc.createdAt, doc);\n  }\n}'
      }
    }
  })
}))
