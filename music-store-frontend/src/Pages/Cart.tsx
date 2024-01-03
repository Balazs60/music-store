import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import Header from './Header';


interface CartItem {
  id: string;
  member: string;
  product: {
    id: string;
    name: string;
    color: string;
    price: number;
    brand: string;
    dtype: string;
    subCategoryId: string;
    numberOfStrings: number;
    numberOfSoundLayers: number;
    numberOfKeys: number;
    diameter: number;
    image: string;
  };
  quantity: number;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const fetchCartData = () => {
    const member = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    console.log("token"+token)

      if(token){
       // console.log("nem kellene belemennie")
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
          
          }
      if(!token){
     
        const guestChart = JSON.parse(localStorage.getItem("wantedProducts") || '[]');
        console.log("guestchart size "+guestChart.length)

      fetch(`/api/cart/guest`, {

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
              

            }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const updateQuantityOnBackend = (itemId: string, newQuantity: number) => {
    const token = localStorage.getItem("token");
  
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    if(token){
  
  
    fetch(`/api/cart/update-quantity/${itemId}/${newQuantity}`, {
      method: 'PATCH', // Use PATCH for partial updates
      headers: headers,
    })
   
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Handle successful response if needed
        console.log('Quantity updated successfully:', data);
      })
      .catch(error => {
        console.error('Error updating quantity:', error);
      });
    }
  };
  

  const handleIncreaseQuantity = (itemId: string) => {
    const updatedCart = cart.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + 1;
        updateQuantityOnBackend(itemId, newQuantity);
        return {
          ...item,
          quantity: newQuantity,
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
        updateQuantityOnBackend(itemId, newQuantity);
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });

    setCart(updatedCart);
  };

  const deleteCartItem = (cartItemId: string) => {
    const token = localStorage.getItem('token');
    if(token){
    return fetch(`/api/cart/${cartItemId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
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

  const handleDelete = (itemId: string) => {
    deleteCartItem(itemId);

    setCart((prevCartItems) => {
        return prevCartItems.filter((cartItem) => cartItem.id !== itemId);
    });
};

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
                  <strong>{item.product.name}</strong>
                  <p>Brand: {item.product.brand}</p>
                  <p>Price: ${item.product.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                  <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                  <img
                    src={`data:image/png;base64,${item.product.image}`}
                    alt={item.product.name}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                                  <button onClick={() => submitDelete(item.id)}>Delete</button>
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

export default Cart;
