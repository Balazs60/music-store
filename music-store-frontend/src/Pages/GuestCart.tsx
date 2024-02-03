import React, { useState, useEffect } from 'react';
import Header from './Header';
import Product from './Product';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { useLocation } from 'react-router-dom';
import { Order } from './Order';
import { v4 as uuidv4 } from 'uuid';
import { WantedProduct } from './WantedProduct';
import { Member } from './Member';




const GuestCart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const productOriginalPrice = location.state?.productOriginalPrice || null;
 // const producitQuantityInTheShop = location.state?.producitQuantityInTheShop || null;
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [member, setMember] = useState<Member | null>()
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<string | null>(null);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<string | null>(null);
  const [deliveryOptionError, setDeliveryOptionError] = useState<string | null>(null);
  const [paymentOptionError, setPaymentOptionError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  console.log("products " + products)

  let orderId:string = "";


  console.log("original" + productOriginalPrice)

  console.log("cart length " + cart.length)

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
    fetchMemberByName()
    fetchProductsWhatInTheCart()
  }, []);

  const fetchProductsWhatInTheCart = () => {
    const token = localStorage.getItem("token");
    console.log("token most" + token);
  
    const wantedProducts = JSON.parse(localStorage.getItem('wantedProducts') || 'null');
    const wantedProductsId = wantedProducts ? wantedProducts.map(product => product.id) : [];
    const queryParams = wantedProductsId.length > 0 ? `wantedProducts=${wantedProductsId.join(',')}` : '';
    
    console.log("queryParams " + queryParams)
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  
    const url = `/api/products-in-cart?${queryParams}`;
  
    if (token) {
      console.log("nem kellene belemennie mainpage products");
  
      fetch(url, {
        method: 'GET',
        headers: headers
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching instruments:', error);
      });
    } else {
      fetch(url, {
        method: 'GET'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching instruments:', error);
      });
    }
  };
  

  const handleOptionChange = (option: string) => {
    setSelectedDeliveryOption(option);
    setDeliveryOptionError(null);
  };

  const handlePaymentChange = (paymentOption : string) => {
    setSelectedPaymentOption(paymentOption)
    setPaymentOptionError(null);
  }

  function fetchOrder(order: Order) {
    fetch('/api/order/neworder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then(response => {
        if (response.ok) {
          console.log('Order submitted successfully');
          localStorage.removeItem('wantedProducts');
        } else {
          console.error('Failed to submit order');
        }
      })
      .catch(error => {
        console.error('Error sending order:', error);
      });
  }

  const fetchMemberByName = () => {
    const token = localStorage.getItem("token")
    const headers: Record<string,string> = token
    ? {Authorization: `Bearer ${token}`}
    :{};

    const userName = localStorage.getItem("username")
    fetch(`/api/cart/${userName}`,
    {
      method: 'GET',
      headers: headers,
    }).then(response => {
      if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Member " + data)
      setMember(data)
    })
  }

  const createOrder = () => {
    const localStorageCart = JSON.parse(localStorage.getItem('wantedProducts') || 'null');


    console.log("member name " + member?.name)

    if (localStorageCart) {
      const WantedProductList: WantedProduct[] = [];

      for (let i = 0; i < localStorageCart.length; i++) {
        const id: string = uuidv4();
        const WantedProduct: WantedProduct = {
          id,
          orderId: '',
          productId: localStorageCart[i].id,
          produtPriceByPiece: localStorageCart[i].price,
          productQuantity: localStorageCart[i].quantity,
        };
        WantedProductList.push(WantedProduct);
      }

      console.log("1quantity" + WantedProductList[0].productQuantity)
      orderId = uuidv4();

      if(member){
      const order: Order = {
        id: orderId,
        customerName: member.name,
        email: member.email,
        birthDate: member.birthDate,
        phoneNumber: member.phoneNumber,
        postCode: member.postCode,
        city: member.city,
        streetAndHouseNumber: member.streetAndHouseNumber,
        pickUpOption: selectedDeliveryOption,
        wantedProducts: WantedProductList.map(wantedProduct => {
          wantedProduct.orderId = orderId; 
          return wantedProduct;
        }),
        isPaid: false, 
      };
    
      console.log(order)
      fetchOrder(order);
     // navigate(`order/${order.id}`);
      }}
  };


  function handlePayment() {

    if (!selectedDeliveryOption) {
      setDeliveryOptionError("Select a delivery option");
      return;
    }

    if(!selectedPaymentOption){
      setPaymentOptionError("Select a payment option")
      return;
    }

  
    if (localStorage.getItem("username")) {
      createOrder()
      console.log("have a user")
      if(selectedPaymentOption === "cash"){
        navigate(`/successful-order`);
      } else {
        navigate(`/payment/${orderId}`);

      }

    } else {
      const localStorageCart = localStorage.getItem('wantedProducts');
      if (localStorageCart) {
        const parsedCart = JSON.parse(localStorageCart);
        for (let i = 0; i < parsedCart.length; i++) {
          console.log("parsed name" + parsedCart.name)
        }
      }
      navigate(`/filloutform`,{
        state: {
          selectedDeliveryOption,
          selectedPaymentOption,
        },
      });
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


  const submitDelete = (itemId: string) => {

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

function checkProductQuantityInTheShop(itemId: string){
  let maxQuantity = 0;
for(const product of products){
  if(product.id === itemId){
    maxQuantity = product.quantity
  }
}
return maxQuantity;
}


  const handleIncreaseQuantity = (itemId: string) => {

    const maxQuantity = checkProductQuantityInTheShop(itemId);
    
    const updatedCart = cart.map(item => {
      if (item.id === itemId) {
        
        const newQuantity = item.quantity + 1;
        let cartItemNewQuantity = item.quantity;
        // const newPrice = item.price + productOriginalPrice
        const localStorageCart = localStorage.getItem('wantedProducts')
        if (localStorageCart) {
          const wantedProducts = JSON.parse(localStorageCart)
          for (const product of wantedProducts) {
            if (product.id === itemId && newQuantity <= maxQuantity) {
cartItemNewQuantity = newQuantity
              product.quantity = newQuantity
              //product.price += productOriginalPrice
            }
          }
          localStorage.setItem('wantedProducts', JSON.stringify(wantedProducts));

        }
        return {
          ...item,
          quantity: cartItemNewQuantity,
          //   price: newPrice,
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
        // const newPrice = item.price - productOriginalPrice
        const localStorageCart = localStorage.getItem('wantedProducts')
        if (localStorageCart) {
          const wantedProducts = JSON.parse(localStorageCart)
          for (const product of wantedProducts) {
            if (product.id === itemId) {

              product.quantity = newQuantity
              //product.price -= productOriginalPrice
            }
          }
          localStorage.setItem('wantedProducts', JSON.stringify(wantedProducts));

        } return {
          ...item,
          quantity: newQuantity,
          //   price: newPrice,
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
        <div className="cart-layout">
          <div className="cart-items">
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
                    <div>${item.price * item.quantity}</div>
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
            <div className="cart-summary">
              <strong>Total Price: ${total}</strong>
            </div>
          </div>
          <div className="delivery-options">
            <h3>Delivery Options</h3>
            <div>
              <label>
                <input
                  type="radio"
                  value="delivery"
                  checked={selectedDeliveryOption === 'delivery'}
                  onChange={() => handleOptionChange('delivery')}
                />
                Delivery with GLS
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="pickUpPoint"
                  checked={selectedDeliveryOption === 'pickUpPoint'}
                  onChange={() => handleOptionChange('pickUpPoint')}
                />
                Pick Up Point
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="pickUpAtShop"
                  checked={selectedDeliveryOption === 'pickUpAtShop'}
                  onChange={() => handleOptionChange('pickUpAtShop')}
                />
                Pick Up at the Shop
              </label>
            </div>
            {deliveryOptionError && (
              <p style={{ color: 'red', marginTop: '10px' }}>{deliveryOptionError}</p>
            )}
          </div>
        </div>
      )}
      <div className="checkout-options">
        <h3>Select Payment</h3>
        <div>
          <label>
            <input
              type="radio"
              value="cash"
              checked={selectedPaymentOption === 'cash'}
              onChange={() => handlePaymentChange('cash')}
            />
            Cash
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="card"
              checked={selectedPaymentOption === 'card'}
              onChange={() => handlePaymentChange('card')}
            />
            Card
          </label>
        </div>
      </div>
      <div>
        {paymentOptionError && (
          <p style={{ color: 'red', marginTop: '10px' }}>{paymentOptionError}</p>
        )}
      </div>
      <button className="pay-button" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
  
};

export default GuestCart;


