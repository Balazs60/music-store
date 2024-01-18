import React, { useState, useEffect } from 'react';
import Header from './Header';
import Product from './Product';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { useLocation } from 'react-router-dom';




const GuestCart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const productOriginalPrice = location.state?.productOriginalPrice || null;

console.log("original" + productOriginalPrice)

  useEffect(() => {
    const localStorageCart = localStorage.getItem('wantedProducts');
    if (localStorageCart) {
      const parsedCart = JSON.parse(localStorageCart);
      const groupedCart: Record<string, Product> = {};
      parsedCart.forEach((product: Product) => {
        if (!groupedCart[product.id]) {
          groupedCart[product.id] = { ...product };
        }
      });
      const updatedCart: Product[] = Object.values(groupedCart);

      setCart(updatedCart);
    }
  }, []);


  function handlePayment() {
    console.log("1quantity" + cart[0].quantity)
    console.log("username status : " + localStorage.getItem("username"))
    if (localStorage.getItem("username")) {
      console.log("have a user")
    } else {
      navigate(`/filloutform`);
    }
  }

 

  
  const handleDelete = (itemId: string) => {

    const localStorageCart = localStorage.getItem('wantedProducts');
    
    if (localStorageCart) {
      const parsedCart = JSON.parse(localStorageCart);
  
      const updatedCart = parsedCart.filter((product: Product) => product.id !== itemId);
  
      localStorage.setItem('wantedProducts', JSON.stringify(updatedCart));
  
      setCart(updatedCart);
    }
  };
  

  const submitDelete = (itemId : string) => {

    confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure to delete this item?',
        buttons: [
            {
                label: 'Yes',
                onClick: () => handleDelete(itemId),
            },
            {
                label: 'No',
            },
        ],
        customUI: ({ onClose }) => (
          <div className="custom-ui">
            <h1>Confirm delete</h1>
            <p>Are you sure to delete this item?</p>
            <button onClick={() => { onClose(); handleDelete(itemId); }}>Yes</button>
            <button onClick={onClose}>No</button>
          </div>
        ),
    });
};




const handleIncreaseQuantity = (itemId: string) => {
  const updatedCart = cart.map(item => {
    if (item.id === itemId) {
      const newQuantity = item.quantity + 1;
      const newPrice = item.price + productOriginalPrice
      const localStorageCart = localStorage.getItem('wantedProducts')
      if(localStorageCart){
      const wantedProducts = JSON.parse(localStorageCart)
      for(const product of wantedProducts){
        if(product.id === itemId){
         
product.quantity = newQuantity
product.price += productOriginalPrice
        }
      }
              localStorage.setItem('wantedProducts', JSON.stringify(wantedProducts));

      }
      return {
        ...item,
        quantity: newQuantity,
        price: newPrice,
      };
    }
    return item;
  });

  setCart(updatedCart);
};

const handleDecreaseQuantity = (itemId: string) => {
  const updatedCart = cart.map(item => {
    if (item.id === itemId && item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      const newPrice = item.price - productOriginalPrice
      const localStorageCart = localStorage.getItem('wantedProducts')
      if(localStorageCart){
      const wantedProducts = JSON.parse(localStorageCart)
      for(const product of wantedProducts){
        if(product.id === itemId){
         
product.quantity = newQuantity
product.price -= productOriginalPrice
        }
      }
              localStorage.setItem('wantedProducts', JSON.stringify(wantedProducts));

      }      return {
        ...item,
        quantity: newQuantity,
        price: newPrice,
      };
    }
    return item;
  });

  setCart(updatedCart);
};

  return (
    <div className="cart-container">
      <Header />
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} className="cart-item-box">
              <img
                src={`data:image/png;base64,${item.image}`}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <div className="detail">
                  <div>Name:</div>
                  <div><strong>{item.name}</strong></div>
                </div>
                <div className="detail">
                  <div>Brand:</div>
                  <div>{item.brand}</div>
                </div>
                <div className="detail">
                  <div>Price:</div>
                  <div>${item.price}</div>
                </div>
                <div className="detail">
                  <div>Quantity:</div>
                  <div>{item.quantity}</div>
                  <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                  <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                </div>
              </div>
              <button onClick={() => submitDelete(item.id)}>Delete</button>
            </div>
          ))}
          <div className="cart-summary">{/* Add any summary information here */}</div>
          <button className="pay-button" onClick={handlePayment}>
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
};

export default GuestCart;


