import {h} from 'hyperapp'

import {Modal} from '../../theme/Modal'
import {PillButton} from '../../theme/PillButton'

import './style.css'

export const Requirements = ({match}) => (state, actions) => (
  <Modal className="requirements" close={ev => actions.location.go('/')}>
    <h4>To be considered a 'real world' example, your project must...</h4>
    <ul>
      <li>Be live, with a public URL. (preferably with it's own domain name)</li>
      <li>Mainly use Hyperapp for client application logic.</li>
      <li>Have a real, useful purpose other than to be using Hyperapp.</li>
    </ul>
    <p><b>That's it!</b></p>
    <p>
      Codepens and quick experiments will not be added to the list. <br/>
      Projects considered <b>awesome</b> will be added to the list!
    </p>
    <div class="actions">
      <PillButton to="/">Submit away!</PillButton>
    </div>
  </Modal>
)
