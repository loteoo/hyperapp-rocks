import {h} from 'hyperapp'

import {Modal} from '../common/Modal/Modal.js'
import {PillButton} from '../common/PillButton/PillButton.js'

import './requirements.css'

export const Requirements = ({match}) => (state, actions) => (
  <Modal className="requirements" close={ev => actions.location.go('/')}>
    <h4>To be considered a 'real world' example, your project must...</h4>
    <ul>
      <li>Be live, with a public URL. (preferably with it's own domain name)</li>
      <li>Mainly use Hyperapp for client application logic.</li>
      <li>Have a purpose other than to be using Hyperapp.</li>
    </ul>
    <p>That's it!</p>
    <p>
      Codepens and quick experiments will not be added to the list. <br/>
      Projects considered awesome will be added to the list!
    </p>
    <div class="actions">
      <PillButton to="/">Submit away!</PillButton>
    </div>
  </Modal>
)
