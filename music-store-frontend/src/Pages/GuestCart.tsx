import React, { useState, useEffect } from 'react';

import Header from './Header';
import Product from './Product';

const GuestCart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const fetchCartData = () => {
    const guestChart = JSON.parse(localStorage.getItem('wantedProducts') || '[]');

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

        // Update the cart state with unique products and quantity information
        const updatedCart: Product[] = data.map(product => ({
          ...product,
          quantity: countProductOccurrences(data, product.id),
        }));

        setCart(updatedCart);
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
        // You might want to set an error state or display an error message to the user
      });
  };

  // Helper function to count occurrences of a product in the cart by its ID
  const countProductOccurrences = (products: Product[], productId: string) => {
    return products.filter(product => product.id === productId).length;
  };

  useEffect(() => {
    fetchCartData();
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
                  <p>Quantity: {countProductOccurrences(cart, item.id)}</p>
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
          
          </div>
         
        </div>
      )}
    </div>
  );
};

export default GuestCart;
