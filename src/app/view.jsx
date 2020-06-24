
// Components
import { Header } from './components/Header'
import MainContent from './components/MainContent'
import { Requirements } from './components/Requirements'
import { ProjectViewer } from './components/ProjectViewer'
import { Footer } from './components/Footer/'

// Root view
export default (state) => {
  console.log(state)
  return (
    <div>
      <Header state={state} />
      {
        state.path === '/requirements'
          ? <Requirements />
          : state.path.length > 1 && <ProjectViewer state={state} />
      }
      <MainContent state={state} />
      <Footer state={state} />
    </div>
  )
}
