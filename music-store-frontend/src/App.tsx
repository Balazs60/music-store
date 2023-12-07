import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import MainPage from "./Pages/MaingPage"
import Guitar from "./Pages/GuitarList"
import ElectricGuitarList from "./Pages/ElectricGuitarList"
import SelectedGuitarPage from "./Pages/SelectedGuitarPage"

function App() {
  return(
    <Router>
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/guitars" element={<Guitar/>}/>
      <Route path="/electric-guitars" element={<ElectricGuitarList/>}/>
      <Route path="/product/:id" element={<SelectedGuitarPage/>}/>


    </Routes>
    </Router>
  )

}

export default App
