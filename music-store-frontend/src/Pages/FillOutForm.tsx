import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { WantedProduct } from './WantedProduct';
import { Order } from './Order';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Context } from './Context';


const FillOutForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [postCode, setPostcode] = useState('');
  const [city, setCity] = useState('');
  const [streetAndHouseNumber, setStreetAndHouseNumber] = useState('');
  const [birthDayError, setBirthDayError] = useState("");
  const location = useLocation();
  const { selectedDeliveryOption, selectedPaymentOption } = location.state || {};
  const [orderError, setOrderError] = useState("");
  const {setCartItemsNumber: setCartItemsNumber } = useContext(Context);


  console.log("birthdate" + birthDate)





  const navigate = useNavigate();

  function fetchOrder(order: Order) {
    fetch('/api/order/neworder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then(response => {
        if (response.ok ) {
       return response.json()
        } else {
          console.error('Failed to submit order');
        }
      }).then(data => {
        if (data === true) {
          console.log('Order submitted successfully');
          localStorage.removeItem('wantedProducts');
          setCartItemsNumber(0);
          if (selectedPaymentOption === "cash") {
            navigate(`/successful-order`);
          } else {
            navigate(`/payment/${order.id}`);
          }
        } else {
          console.error('Failed to submit order: No more product left in the shop!');
          setOrderError("No more product left in the shop!");
        }
      })
      .catch(error => {
        console.error('Error sending order:', error);
      });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const localStorageCart = JSON.parse(localStorage.getItem('wantedProducts') || 'null');

    if (localStorageCart) {
      const WantedProductList: WantedProduct[] = [];

      for (let i = 0; i < localStorageCart.length; i++) {
        console.log("quantity " + localStorageCart[i].quantity)
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

      const id: string = uuidv4();
      const order: Order = {
        id,
        customerName: name,
        email,
        birthDate,
        phoneNumber,
        postCode: parseInt(postCode),
        city,
        streetAndHouseNumber,
        pickUpOption: selectedDeliveryOption,
        wantedProducts: WantedProductList.map(wantedProduct => {
          wantedProduct.orderId = id;
          return wantedProduct;
        }),
        isPaid: false,
      };
      console.log("first product quantity of order" + order.wantedProducts[0].productQuantity)
      console.log(order)
      fetchOrder(order);
    }
  };

  function checkBirthDateIsValid(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault()

    let isBirthDateFormatValid = false;
    const currentDate = new Date();
    const birthDateInDateFormat = new Date(birthDate);

    if (birthDate[4] === "-" && birthDate[7] === "-" && birthDate.length === 10) {
      isBirthDateFormatValid = true
    }


    if (isBirthDateFormatValid === false) {
      setBirthDayError(("The birth date format will be: yyyy-mm-dd"))
    } else if (birthDateInDateFormat >= currentDate) {
      setBirthDayError("Invalid birth date!")
    } else {
      setBirthDayError("")
      handleSubmit(e)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl mb-4">Billing Information</h1>
      <p className="text-gray-600 mb-6">
        Sign In{' '}
        <Link to={`/login`} className="text-teal-500">
          Log In
        </Link>
      </p>
      <form onSubmit={checkBirthDateIsValid} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-md p-2 w-full"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-md p-2 w-full"
          required
        />
        <input
          type="date"
          placeholder="Birth date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="border rounded-md p-2 w-full"
          required
        />
        <input
          type="tel"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border rounded-md p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Post code"
          value={postCode}
          onChange={(e) => setPostcode(e.target.value)}
          className="border rounded-md p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border rounded-md p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Street and house number"
          value={streetAndHouseNumber}
          onChange={(e) => setStreetAndHouseNumber(e.target.value)}
          className="border rounded-md p-2 w-full"
          required
        />
        <div>
          {orderError.length > 0 && <p className="text-red-500">{orderError}</p>}
          {birthDayError.length > 0 && <p className="text-red-500">{birthDayError}</p>}
          <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white rounded-md p-2 w-full">
            Place Order
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default FillOutForm;
