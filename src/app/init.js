// Initial state of the app

import data from '../../projects.json'

export default {

  title: 'Hyperapp real-world examples',
  description: 'A curated list of live Hyperapp projects',
  path: window.location.pathname,
  search: '',
  listing: data,
  isFetching: false
}
