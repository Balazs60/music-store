import React, { useState, useEffect } from 'react';



interface CartItem {
  id: "",
member:"",
product:{
  id: "",
  name: "",
  color: "",
  price: 0,
  brand: "",
  dtype: "",
  subCategoryId: "",
  numberOfStrings: 0,
  numberOfSoundLayers: 0,
  numberOfKeys: 0,
  diameter: 0,
  image: "",
},
quantity:""

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

 

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul className="cart-list">
            {cart.map(item => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-details">
                  <strong>{item.product.name}</strong>
                  <p>Brand: {item.product.brand}</p>
                  <p>Price: ${item.product.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  { <img
            src={`data:image/png;base64,${item.product.image}`}
            alt={item.product.name}
            style={{ maxWidth: '100%', height: 'auto' }}
          /> }
                </div>
                {/* Add more details as needed */}
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

export default Cart;
