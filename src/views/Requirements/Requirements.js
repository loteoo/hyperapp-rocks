import {h} from 'hyperapp'

import './requirements.css'

import {Modal} from '../common/Modal/Modal.js'

export const Requirements = ({match}) => (state, actions) => (
  <Modal close={ev => actions.location.go('/')}>
    <div class="requirements" key="requirements">
      New Requirements component!
    </div>
  </Modal>
)

// import {Requirements} from './Requirements/Requirements.js'
// <Requirements />
