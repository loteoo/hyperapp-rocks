import {h} from 'hyperapp'

import {Modal} from '../common/Modal/Modal.js'
import {PillButton} from '../common/PillButton/PillButton.js'

import './requirements.css'

export const Requirements = ({match}) => (state, actions) => (
  <Modal close={ev => actions.location.go('/')}>
    <div class="requirements">
      <h4>To be considered a 'real world' example, your project must...</h4>
      <ul>
        <li>be live</li>
        <li>have a public URL</li>
        <li>use Hyperapp for the client application logic</li>
      </ul>
      <p>
        Codepens and quick experiments will not be added to the list. <br/>
        Projects considered awesome will be added to the list!
      </p>
      <div class="actions">
        <PillButton to="/">Submit away!</PillButton>
      </div>
    </div>
  </Modal>
)

// import {Requirements} from './Requirements/Requirements.js'
// <Requirements />
