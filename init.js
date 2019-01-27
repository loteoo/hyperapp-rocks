// For development db

const nano = require('nano')('http://admin:password@localhost:5984')
const projects = nano.use('projects')

// Projects design doc
projects.insert({
  _id: '_design/projects',
  views: {
    'by-created': {
      map: "function (doc) {\n  if (doc.status === 'published') {\n    emit(doc.createdAt, doc);\n  }\n}"
    }
  }
})
.then(console.log)
  

// Hidden design doc
projects.insert({
  _id: '_design/hidden',
  views: {
    'by-id': {
      map: "function (doc) {\n  if (doc.status !== 'published') {\n    emit(doc._id, doc);\n  }\n}"
    }
  }
})
.then(console.log)

