import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React from 'react';




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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl mb-4 text-center">Login</h1>
        <p className="mb-6 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-teal-500">
            Register
          </Link>
        </p>
        {!isLoggedIn && (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              className="border rounded p-2"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className="border rounded p-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-700 text-white p-2 rounded mt-4"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
