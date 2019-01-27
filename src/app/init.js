// Initial state of the app

import {appTitle, appDesc} from '../utils'

export const init = {

  path: '/',

  title: appTitle,
  description: appDesc,

  search: '',
  lastSearch: '',

  isFetching: false,
  listing: [],
  projects: {},
  total: 0,
  
  projectForm: {}
}
