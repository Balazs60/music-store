import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import MainPage from "./Pages/MainPage"
import SubCategory from "./Pages/SubCategory"
import Category from "./Pages/Category"
import SelectedGuitarPage from "./Pages/Product"

function App() {
  return(
    <Router>
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/category/:category" element={<Category/>}/>
      <Route path="/category/:category/subcategory/:subcategoryid" element={<SubCategory/>}/>
      <Route path="/product/:id" element={<SelectedGuitarPage/>}/>


    </Routes>
    </Router>
  )

}

export default App
