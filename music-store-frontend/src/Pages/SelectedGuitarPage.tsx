import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SelectedGuitarPage() {
    const { id } = useParams();
    const [selectedGuitar, setSelectedGuitar] = useState(null);

    useEffect(() => {
        if (id) {
            fetchGuitarById(id);
        }
    }, [id]);

    const fetchGuitarById = (guitarId) => {
        fetch(`/api/guitar/${guitarId}`, { method: 'GET' })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setSelectedGuitar(data);
            })
            .catch(error => {
                console.error('Error fetching guitar details:', error);
            });
    };

    return (
        <div>
            {selectedGuitar ? (
                <div>
                    <h1>{selectedGuitar.name}</h1>
                    <p>Brand: {selectedGuitar.brand}</p>
                    <p>Price: {selectedGuitar.price}</p>
                    <p>Color: {selectedGuitar.color}</p>
                    {selectedGuitar.numberOfStrings && (
                        <p>Number of Strings: {selectedGuitar.numberOfStrings}</p>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default SelectedGuitarPage;
