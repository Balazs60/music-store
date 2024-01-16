import { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Product } from './Products';
import { Order } from './Order'; 
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';



const FillOutForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [postCode, setPostcode] = useState('');
  const [city, setCity] = useState('');
  const [streetAndHouseNumber, setStreetAndHouseNumber] = useState('');

  const navigate=useNavigate();
  function fetchOrder(order: Order){
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
          
        } else {
          console.error('Failed to submit order');

        }
      })
      .catch(error => {
        console.error('Error sending order:', error);
       
      });}
    


  const  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const localStorageCart = localStorage.getItem('wantedProducts');
    let products: Product[] = [];
    const id: string = uuidv4();
    if (localStorageCart) {
      try {
        
        products = JSON.parse(localStorageCart);
      } catch (error) {
        console.error('Error parsing localStorageCart:', error);
      }

    }

    const order: Order = {
      id, 
      customerName: name,
      email,
      birthDate,
      phoneNumber,
      postCode: parseInt(postCode), 
      city,
      streetAndHouseNumber,
      products, 
      isPaid: false, 
    };
    console.log(order.products)
    fetchOrder(order);
    navigate(`order/${order.id}`)
   

  };


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
                <Link to={`/`} style={{ color: '#007BFF', textDecoration: 'none' }}>
                  Log In
                </Link>
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
                  Place Order
             
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default FillOutForm;