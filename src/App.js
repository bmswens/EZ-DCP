// router
import { BrowserRouter, HashRouter } from "react-router-dom"

// custom
import Content from "./content/Content"
import Context from "./context/Context"
import TopNav from "./nav/TopNav"

function Router(props) {
  const deployment = process.env.REACT_APP_DEPLOYMENT
  /* istanbul ignore if: deployment config */
  if (deployment === "github") {
    return (
      <HashRouter>
        {props.children}
      </HashRouter>
    )
  }
  return (
    <BrowserRouter>
      {props.children}
    </BrowserRouter>
  )
}


function App() {
  return (
    <Router>
      <Context>
        <TopNav />
        <Content />
      </Context>
    </Router>
  )
}

export default App
