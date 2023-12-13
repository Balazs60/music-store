import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import MainPage from "./Pages/MainPage"
import SubCategory from "./Pages/SubCategory"
import Category from "./Pages/Category"
import SelectedGuitarPage from "./Pages/Product"
import Registration from "./Pages/Registration"
import Login from "./Pages/Login"

function App() {
  return(
    <Router>
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/category/:category" element={<Category/>}/>
      <Route path="/category/:category/subcategory/:subcategoryid" element={<SubCategory/>}/>
      <Route path="/product/:id" element={<SelectedGuitarPage/>}/>
      <Route path="/register" element={<Registration/>}/>
      <Route path="/login" element={<Login/>}/>




    </Routes>
    </Router>
  )

}

export default App
