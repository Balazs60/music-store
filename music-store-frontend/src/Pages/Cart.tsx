import React, { useState, useEffect } from 'react';

interface CartItem {
  id: number;
  quantity: number;
  endOfReservation: string;
  product: {
    id: number;
    name: string;
    price: number;
    // Add any other properties you need for a product
  };
  // Add any other properties you need for a cart item
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const fetchCartData = () => {
    const member = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    fetch(`/api/cart/${member}`, { method: 'GET', headers: headers })
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
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                <div>
                  <strong>{item.product.name}</strong>
                </div>
            
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>
          <div>
            <strong>Total Price: ${totalPrice}</strong>
          </div>
          {/* Add more elements/buttons as needed */}
        </div>
      )}
    </div>
  );
};

export default Cart;
