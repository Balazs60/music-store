import { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Grid, Paper} from '@mui/material';



function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  console.log(token)
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: username,
      password: password,
    };

    fetch(`/api/v1/auth/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username);
        setToken(data.token);
        setIsLoggedIn(true);
        navigate('/');
      })
      .catch((error) => {
        alert('Authentication failed. Please check your credentials.');
        console.error(error);
      });
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
                Login
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '30px', color: '#666' }}>
                Don't have an account?{' '}
                <Link to={`/register`} style={{ color: '#007BFF', textDecoration: 'none' }}>
                  Register
                </Link>
              </Typography>
              {!isLoggedIn ? (
                <form
                  onSubmit={handleLogin}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
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
                    label="Password"
                    variant="outlined"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px', background: '#007BFF' }}>
                    Login
                  </Button>
                </form>
              ) : null}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default Login;
