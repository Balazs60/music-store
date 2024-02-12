import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { WantedProduct } from './WantedProduct';
import { Order } from './Order';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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
      //  navigate(`order/${order.id}`);

      if (selectedPaymentOption === "cash") {
        navigate(`/successful-order`)
      } else {
        navigate(`/payment/${order.id}`)
      }
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
    <Container
      style={{
        height: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <div>
        <Grid container style={{ maxWidth: '400px' }}>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper
              elevation={3}
              style={{
                padding: '20px',
                width: '100%',
                background: '#fff',
                borderRadius: '8px',
              }}
            >
              <Typography variant="h4" style={{ marginBottom: '15px', color: '#333' }}>
                Billing Information
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '30px', color: '#666' }}>
                Sign In{' '}
                <Link to={`/login`} style={{ color: '#007BFF', textDecoration: 'none' }}>
                  Log In
                </Link>
              </Typography>
              <form onSubmit={checkBirthDateIsValid} style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <TextField
                  label="Name"
                  variant="outlined"
                  type="name"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <TextField
                  label="Birth date"
                  variant="outlined"
                  type="date"
                  id="birthDate"
                  name=""
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  required
                />
                <TextField
                  label="Phone number"
                  variant="outlined"
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                <TextField
                  label="Post code"
                  variant="outlined"
                  type="text"
                  id="postCode"
                  name="postCode"
                  value={postCode}
                  onChange={(e) => setPostcode(e.target.value)}
                  required
                />
                <TextField
                  label="City"
                  variant="outlined"
                  type="text"
                  id="city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <TextField
                  label="Street and house number"
                  variant="outlined"
                  type="text"
                  id="streetAndHouseNumber"
                  name="streetAndHouseNumber"
                  value={streetAndHouseNumber}
                  onChange={(e) => setStreetAndHouseNumber(e.target.value)}
                  required
                />
                <div>
                {birthDayError.length > 0  && <p style={{ color: 'red' }}>{birthDayError}</p>}
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
                  Place Order
                </Button>
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default FillOutForm;
