import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ElectricGuitarList() {
    const [electricGuitars, setElectricGuitars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchInstruments();
    }, []);

    const fetchInstruments = () => {
        fetch('/api/electric-guitars', { method: 'GET' })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setElectricGuitars(data);
            })
            .catch(error => {
                console.error('Error fetching instruments:', error);
            });
    };

    const handleGuitarClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div>
            <h1>Electric Guitars</h1>
            <ul>
                {electricGuitars.map((guitar, index) => (
                    <li key={index} onClick={() => handleGuitarClick(guitar.id)}>
                        {guitar.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ElectricGuitarList;
