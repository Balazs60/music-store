import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import MainPage from "./Pages/MaingPage"

function App() {
  return(
    <Router>
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/new" element={<h1>new</h1>}/>
    </Routes>
    </Router>
  )

}

export default App
