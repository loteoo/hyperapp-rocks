import { css } from 'emotion'

const style = css`
  background: linear-gradient(315deg,#10192a 0,#161d29 100%);
  background-position: center;
  background-size: contain;
  text-align: center;
  padding: 6rem;
  margin: 6rem 0 0 0;
  p {
    margin: 0;
  }
  @media (max-width: 480px) {
    padding: 3rem;
  }
`

export const Footer = () => (
  <footer class={style} role='contentinfo'>
    <p>Made with 💖 by <a href='https://github.com/loteoo' target='_blank'>Alexandre Lotte</a>.</p>
    <p>Built with <a href='https://github.com/jorgebucaran/hyperapp' target='_blank'>Hyperapp 2.0</a>.</p>
    <p>All screenshots © of their respective owners.</p>
  </footer>
)
