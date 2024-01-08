import React, { useState, useEffect } from 'react';

import Header from './Header';
import Product from './Product';

const GuestCart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  //const [filteredCart, setFilteredCart] = useState<Product[]>([]);

  //console.log(filteredCart)
  console.log("lacaleStorage" + localStorage.getItem("wantedProducts"))

  // const fetchCartData = () => {
  //   const guestChart = JSON.parse(localStorage.getItem('wantedProducts') || '[]');

  //   setCart([]);

  //   fetch(`/api/guestcart/guest`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ guestChart }),
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       // Group products by name and calculate total quantity
  //       const groupedCart: Record<string, Product> = {};
  //       data.forEach((product: Product) => {
  //         if (!groupedCart[product.id]) {
  //           groupedCart[product.id] = { ...product, quantity: 1 };
  //         } else {
  //           groupedCart[product.id].quantity += 1;
  //         }
  //       });

  //       const updatedCart: Product[] = Object.values(groupedCart);

  //       setCart(updatedCart);
  //       setFilteredCart(updatedCart);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching cart data:', error);
  //       // Handle errors, set an error state, or display an error message to the user
  //     });
  // };

  useEffect(() => {
    const localStorageCart = localStorage.getItem('wantedProducts');
    if (localStorageCart) {
      const parsedCart = JSON.parse(localStorageCart);
      console.log("parsed " + parsedCart[0])
      const groupedCart: Record<string, Product> = {};
      parsedCart.forEach((product: Product) => {
        if (!groupedCart[product.id]) {
          groupedCart[product.id] = { ...product, quantity: 1 };
        } else {
          groupedCart[product.id].quantity += 1;
        }
      })
      const updatedCart: Product[] = Object.values(groupedCart);

      setCart(updatedCart);
    }
  }, []);

  return (
    <div className="cart-container">
      <Header />
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
                  <p>Quantity: {item.quantity}</p>
                  <img
                    src={`data:image/png;base64,${item.image}`}
                    alt={item.name}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">{/* Add any summary information here */}</div>
        </div>
      )}
    </div>
  );
};

export default GuestCart;
