import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import Product from './Product';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { useLocation } from 'react-router-dom';
import { Order } from './Order';
import { v4 as uuidv4 } from 'uuid';
import { WantedProduct } from './WantedProduct';
import { Member } from './Member';
import { getDiscountPrice } from './Products';
import { Context } from './Context';



const GuestCart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const productOriginalPrice = location.state?.productOriginalPrice || null;
  // const producitQuantityInTheShop = location.state?.producitQuantityInTheShop || null;
  const total = cart.reduce((acc, item) => acc + getDiscountPrice(item) * item.quantity, 0);
  const [member, setMember] = useState<Member | null>()
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<string | null>(null);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<string | null>(null);
  const [deliveryOptionError, setDeliveryOptionError] = useState<string | null>(null);
  const [paymentOptionError, setPaymentOptionError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const { cartItemsNumber: cartItemsNumber, setCartItemsNumber: setCartItemsNumber } = useContext(Context);


  console.log("products " + products)

  let orderId: string = "";


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
    const headers: Record<string, string> = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    const wantedProducts = JSON.parse(localStorage.getItem('wantedProducts') || 'null');
    const wantedProductsId = wantedProducts ? wantedProducts.map((product: Product) => product.id) : [];
    const queryParams = wantedProductsId.length > 0 ? `wantedProducts=${wantedProductsId.join(',')}` : '';



    const url = `/api/products-in-cart?${queryParams}`;

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
  };


  const handleOptionChange = (option: string) => {
    setSelectedDeliveryOption(option);
    setDeliveryOptionError(null);
  };

  const handlePaymentChange = (paymentOption: string) => {
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
    const headers: Record<string, string> = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    const userName = localStorage.getItem("username")
    fetch(`/api/cart/${userName}`,
      {
        method: 'GET',
        headers: headers,
      }).then(response => {
        if (!response.ok) {
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

      if (member) {
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
      }
    }
  };


  function handlePayment() {

    if (!selectedDeliveryOption) {
      setDeliveryOptionError("Select a delivery option");
      return;
    }

    if (!selectedPaymentOption) {
      setPaymentOptionError("Select a payment option")
      return;
    }


    if (localStorage.getItem("username")) {
      createOrder()
      console.log("have a user")
      if (selectedPaymentOption === "cash") {
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
      navigate(`/filloutform`, {
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
      const deletedProduct = parsedCart.find((product: Product) => product.id === itemId);
  
      if (deletedProduct) {
        // Decrease cartItemsNumber by the quantity of the deleted item
        setCartItemsNumber((prevcount) => prevcount - deletedProduct.quantity);
        
        // Remove the deleted product from localStorage
        const updatedCart = parsedCart.filter((product: Product) => product.id !== itemId);
        localStorage.setItem('wantedProducts', JSON.stringify(updatedCart));
        
        // Update the cart state
        setCart(updatedCart);
      }
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
          <h1 className="text-xl font-bold mb-4">Confirm delete</h1>
          <p className="text-lg mb-4">Are you sure to delete this item?</p>
          <button onClick={() => { onClose(); handleDelete(itemId); }} className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mr-2">Yes</button>
          <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">No</button>
        </div>
      ),
    });
  };

  function checkProductQuantityInTheShop(itemId: string) {
    let maxQuantity = 0;
    for (const product of products) {
      if (product.id === itemId) {
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
    setCartItemsNumber((prevcount) => prevcount + 1)
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
    if (cartItemsNumber > 1) {
      setCartItemsNumber((prevcount) => prevcount - 1)
    }
  };
  return (

    <div>
      <Header />
      <div className='m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        <div className='col-span-2'>
          {cart.length ?
            <h2 className='m-2'>Your shopping cart</h2>
            :
            <h2 className='m-2'>Your shopping cart is empty</h2>
          }
          {cart.map(item => (
            <div key={item.id} className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 bg-gray-100 rounded-lg p-4 shadow-md mb-4">
              <div className='col-span-1 gap-4'>
                <img
                  src={`data:image/png;base64,${item.image}`}
                  alt={item.name}
                  className="cart-item-image"
                />
              </div>
              <div className='col-span-1'>
                <div>Name: </div>
                <div><strong>{item.name}</strong></div>
              </div>
              <div className='col-span-1'>
                <div>Brand: </div>
                <div><strong>{item.brand}</strong></div>
              </div>
              <div className='col-span-1'>
                <div>Price: </div>
                <div><strong>{getDiscountPrice(item)}</strong></div>
              </div>
              <div className='col-span-1'>
                <div>Quantity: </div>
                <div>
                  <strong>{item.quantity}</strong>
                  <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                  <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                </div>
              </div>
              <div className='col-span-1'>
                <button className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-4' onClick={() => submitDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
          {cart.length && (
            <div className="flex justify-end items-center mt-8 px-4">
              <div className="mr-4">
                Total Price: <strong>{total}$</strong>
              </div>
              <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded" onClick={handlePayment}>
                Pay Now
              </button>

            </div>
          )}
          <div className="flex justify-end items-center mt-2">
            {deliveryOptionError && (
              <p className='text-red-500'>{deliveryOptionError}</p>
            )}
            {paymentOptionError && (
              <p className='text-red-500'>{paymentOptionError}</p>
            )}
          </div>
        </div>
        <div className='col-span-1'>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 ">
            <h3 className='mb-2'>Delivery Options</h3>
            <div>
              <label>
                <input
                  type="radio"
                  value="delivery"
                  checked={selectedDeliveryOption === 'delivery'}
                  onChange={() => handleOptionChange('delivery')}
                />
                <span>Delivery with GLS</span>
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
                <span>Pick Up Point</span>
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
                <span>Pick Up at the Shop</span>
              </label>
            </div>

          </div>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 ">
            <h3 className='mb-2'>Payment Options</h3>
            <div>
              <label>
                <input
                  type="radio"
                  value="card"
                  checked={selectedPaymentOption === 'card'}
                  onChange={() => handlePaymentChange('card')}
                />
                <span>Card</span>
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="cash"
                  checked={selectedPaymentOption === 'cash'}
                  onChange={() => handlePaymentChange('cash')}
                />
                <span>Cash</span>
              </label>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default GuestCart;