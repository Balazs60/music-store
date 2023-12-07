import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import MainPage from "./Pages/MaingPage"
import Guitar from "./Pages/Guitar"

function App() {
  return(
    <Router>
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/guitars" element={<Guitar/>}/>
    </Routes>
    </Router>
  )

}

export default App
