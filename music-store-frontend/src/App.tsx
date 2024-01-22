import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import MainPage from "./Pages/MainPage"
import SubCategory from "./Pages/SubCategory"
import Category from "./Pages/Category"
import SelectedGuitarPage from "./Pages/Product"
import Registration from "./Pages/Registration"
import Login from "./Pages/Login"
import Cart from "./Pages/Cart"
import Contact from "./Pages/Contact"
import About from "./Pages/About"
import Discounter from "./Pages/DiscountedProduct"
import FillOutForm from "./Pages/FillOutForm"
import OrderPage from "./Pages/OrderPage"
import PaymentForm from "./Pages/PaymentForm"


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
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/about" element={<About />}/>
      <Route path="/discount" element={<Discounter/>} />
      <Route path="/filloutform" element={<FillOutForm />}/>
      <Route path="/filloutform/order/:orderId" element={<OrderPage/>} />
      <Route path="/payment/:orderId" element={<PaymentForm/>} />

      





    </Routes>
    </Router>
  )

}

export default App
