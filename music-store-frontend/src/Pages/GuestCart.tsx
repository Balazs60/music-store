import React, { useState, useEffect } from 'react';

import Header from './Header';
import Product from './Product';




const GuestCart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

 /* const fetchCartData = () => {



     
        const guestChart = JSON.parse(localStorage.getItem("wantedProducts") || '[]');
        console.log("guestchart size "+guestChart.length)

      fetch(`/api/guestcart/guest`, {

        method: 'POST',
     
        body: JSON.stringify({ guestChart }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          setCart(data);
        })
        .catch(error => {
          console.error('Error fetching product details:', error);
        });
              

            
  };*/
  const fetchCartData = () => {
    const guestChart = JSON.parse(localStorage.getItem("wantedProducts") || '[]');
  
    // Set loading state to true while fetching
    setCart([]);
  
    fetch(`/api/guestcart/guest`, {
      method: 'POST',
      headers: {
      
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ guestChart }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setCart(data);
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
        // You might want to set an error state or display an error message to the user
      });
  };
  

  useEffect(() => {
    fetchCartData();
  }, []);


  




  return (
    <div className="cart-container">
      <Header/>
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul className="cart-list">
            {cart.map(item => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-details">
                  <strong>{item.name}</strong>
                  <p>Brand: {item.brand}</p>
                  <p>Price: ${item.price}</p>
                 
                
                  <img
                    src={`data:image/png;base64,${item.image}`}
                    alt={item.name}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                                  
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            {/* Add a total price or any other summary information */}
          </div>
          {/* Add more elements/buttons as needed */}
        </div>
      )}
    </div>
  );
};

export default GuestCart;
