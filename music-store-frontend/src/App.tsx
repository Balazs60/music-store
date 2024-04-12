import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import SubCategory from './Pages/SubCategory';
import Category from './Pages/Category';
import SelectedGuitarPage from './Pages/Product';
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import Cart from './Pages/Cart';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Discounter from './Pages/Discounter';
import FillOutForm from './Pages/FillOutForm';
import OrderPage from './Pages/OrderPage';
import PaymentForm from './Pages/PaymentForm';
import Upload from './Pages/Upload';
import SuccessfulOrderPage from './Pages/SuccessfulOrderPage';
import React from 'react';
import ChatBox from './Pages/ChatBox';

//import SuccessfulOrderPage from './Pages/SuccessfulOrderPage';

const stripePromise = loadStripe('pk_test_51OaEV6CrCBDEIb4OSm45sChsKsWqyHBSp4QFSIGuE3jln2zhlBPo6qfsnnBrBjKr511gp4YWgpmjUgPq7yWTBOm1001deX3C2G');

function App() {
  return (
    <Router>
      <ChatBox/>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/category/:category/subcategory/:subcategoryid" element={<SubCategory />} />
        <Route path="/product/:id" element={<SelectedGuitarPage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/discount" element={<Discounter />} />
        <Route path="/filloutform" element={<Elements stripe={stripePromise}><FillOutForm /></Elements>} />
        <Route path="/filloutform/order/:orderId" element={<OrderPage />} />
        <Route path="/successful-order" element={<SuccessfulOrderPage />} />
        <Route path="/chat" element={<ChatBox />} />
        <Route path="/payment/:orderId" element={<Elements stripe={stripePromise}><PaymentForm /></Elements>} />
      <Route path="/upload" element={<Upload/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
