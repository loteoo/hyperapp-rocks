import {h} from 'hyperapp'

import './modal.css'

// Trigger css slidein transition
const slideIn = el => {
  el.classList.add('closed')
  void el.clientHeight
  el.classList.remove('closed')
}

// Trigger css slideout transition
const slideOut = (el, done) => {
  el.classList.add('closed')
  setTimeout(done, 300)
}

// Close Button
const Close = ({close}) => (
  <div onclick={close} class="close">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  </div>
)

// Exported component
export const Modal = (props, children, {close} = props) => (state, actions) => (
  <div class="modal" key="modal" onclick={close} oncreate={slideIn} onremove={slideOut} {...props}>
    <div class="box" onclick={ev => ev.stopPropagation()}>
      <Close close={close} />
      <div class="inner">
        {children}
      </div>
    </div>
  </div>
)
