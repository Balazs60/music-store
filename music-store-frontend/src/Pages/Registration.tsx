import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React from 'react';


function Registration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [birthDate, setBirthDate] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('');
  const [postCode, setPostcode] = useState('');
  const [city, setCity] = useState('');
  const [streetAndHouseNumber, setStreetAndHouseNumber] = useState('');
  const [token, setToken] = useState(null);
  const [errorMassage, setErrorMassage] = useState("");
  const [birthDayError, setBirthDayError] = useState("");
  const navigate = useNavigate();

  console.log(token)

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password == passwordConfirm) {
      const data = {
        name: username, email: email, password: password,
        birthDate: birthDate, phoneNumber: phoneNumber, postCode: postCode,
        city: city, streetAndHouseNumber: streetAndHouseNumber,
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
          if (data.token === "fail") {
            setErrorMassage("This UserName is already in use , Please try Another One")
          } else {
            setToken(data.token); 
            console.log("token " + data.token); 

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

  function checkBirthDateIsValid(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault()

    let isBirthDateFormatValid = false;
    const currentDate = new Date();
    const birthDateInDateFormat = new Date(birthDate);

    if (birthDate[4] === "-" && birthDate[7] === "-" && birthDate.length === 10) {
      isBirthDateFormatValid = true
    }


    if(isBirthDateFormatValid === false){
      setBirthDayError(("The birth date format will be: yyyy-mm-dd"))
    } else if (birthDateInDateFormat >= currentDate){
      setBirthDayError("Invalid birth date!")
    } else {
      setBirthDayError("")
      handleRegistration(e)
    }

  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl mb-4 text-center">Registration</h1>
        <p className="mb-6 text-center">
          Already have an account?{' '}
          <Link to="/" className="text-teal-500">
            Log In
          </Link>
        </p>
        <form onSubmit={checkBirthDateIsValid} className="flex flex-col gap-4">
          {errorMassage && <div className="text-red-500">{errorMassage}</div>}
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <input
            className="border rounded p-2"
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
          <input
            className="border rounded p-2"
            type="date"
            placeholder="Birth date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
          <input
            className="border rounded p-2"
            type="tel"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <input
            className="border rounded p-2"
            type="text"
            placeholder="Post code"
            value={postCode}
            onChange={(e) => setPostcode(e.target.value)}
            required
          />
          <input
            className="border rounded p-2"
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            className="border rounded p-2"
            type="text"
            placeholder="Street and house number"
            value={streetAndHouseNumber}
            onChange={(e) => setStreetAndHouseNumber(e.target.value)}
            required
          />
          {birthDayError && <p className="text-red-500">{birthDayError}</p>}
          <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white p-2 rounded mt-4">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
