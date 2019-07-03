
import { css } from 'emotion'

// Components
import { Modal } from '../theme/Modal'
import { PillButton } from '../theme/PillButton'
import { Navigate } from '../actions'

const style = css`
  width: auto;
  ul {
    margin: 1rem;
    padding-left: 1rem;
  }
  .actions {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }
`

// View
export default () => (
  <Modal class={style} role='dialog' closePath='/'>
    <h3>To be considered a 'real world' example, your project must...</h3>
    <ul>
      <li>Be live, with a public URL.</li>
      <li>Mainly use Hyperapp for client application logic.</li>
      <li>Have a real purpose other than to be using Hyperapp.</li>
    </ul>
    <p><b>That's it!</b></p>
    <p>
      Codepens and quick experiments will not be added to the list. <br />
      Projects considered <b>awesome</b> will be added to the list!
    </p>
    <div class='actions'>
      <PillButton onclick={[Navigate, '/']}>Submit away!</PillButton>
    </div>
  </Modal>
)
