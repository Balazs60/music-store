import React from 'react';
import { useNavigate } from 'react-router-dom';

function Guitar() {
    const guitarTypes = ['Electric Guitars', 'Acoustic Guitars'];
    const navigate = useNavigate();

    const handleGuitarClick = () => {
        navigate('/electric-guitars');
    };

    return (
        <div>
            <h1>Guitars</h1>
            <ul>
                {guitarTypes.map((type, index) => (
                    <li key={index} onClick={handleGuitarClick}>
                        {type}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Guitar;
