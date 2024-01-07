import { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
//import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';



// Import your logo (adjust the path accordingly)
//import CircleLogo from './path-to-your-circle-logo.png';

function Registration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [token, setToken] = useState(null);
  const [errorMassage , setErrorMassage]=useState("");
  const navigate = useNavigate();

  console.log(token)

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (password == passwordConfirm) {
          const data = {
              name: username, email: email, password: password
          };
          fetch(`/api/v1/auth/register`, {
              method: 'POST', headers: {
                  'Content-Type': 'application/json',
              }, body: JSON.stringify(data),
          })
              .then((res) => {
                  if (res.ok) {
                      return res.json();
                  } else {
                      throw new Error('Failed to fetch data');
                  }
              })
              .then((data) => {
                  if(data.token==="fail"){
                    setErrorMassage("This UserName is already in use , Please try Another One")
                  }else{
                  setToken(data.token); // Set the 'token' here
                  console.log("token " + data.token); // Use data.token here

                  localStorage.setItem('token', data.token);
                  localStorage.setItem('username', username);
                  navigate('/');
                  }
              })
              .catch((error) => {
                  console.error(error);
              });
      } else {
          alert("Passwords do not match. Please make sure the passwords match.")
      }
  };

  return (
    <Container
      style={{
        height: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around', // Adjusted to space-around
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
                Registration
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '30px', color: '#666' }}>
                Already have an account?{' '}
                <Link to={`/`} style={{ color: '#007BFF', textDecoration: 'none' }}>
                  Log In
                </Link>
              </Typography>
              <form
                onSubmit={handleRegistration}
                style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                {errorMassage && <div style={{ color: 'red' }}>{errorMassage}</div>}
                <TextField
                  label="Username"
                  variant="outlined"
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  label="Password"
                  variant="outlined"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <TextField
                  label="Confirm password"
                  variant="outlined"
                  type="password"
                  id="password"
                  name="password-confirm"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
                  Register
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default Registration;
