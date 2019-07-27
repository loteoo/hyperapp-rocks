// Initial state of the app

import data from '../../data/projects.js'

export default {
  path: '',
  search: '',
  listing: data.rows.map(project => project.value),
  isFetching: true
}
