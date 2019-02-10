// Initialize a couchdb database

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






// Read-only DB
const readOnlyDb = function(newDoc, oldDoc, userCtx) {
  if (userCtx.roles.indexOf('_admin') !== -1) {
    return;
  } else {
    throw ({
      forbidden: 'Only admins may edit the database'
    });
  }
}



// Project WRITE ONLY security + basic validation
const projectsValidateDocUpdate = function(newDoc, oldDoc, userCtx) {
  
  function require(field, message) {
    message = message || 'Document must have a ' + field;
    if (!newDoc[field]) throw({forbidden : message});
  };
  
  require('title');
  require('link');
  require('description');
}

projects.insert({
  _id: '_design/auth',
  validate_doc_update: projectsValidateDocUpdate.toString()
})
.then(console.log)

