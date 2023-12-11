import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  color: string;
  price: number;
  brand: string;
  dtype: string;
  subCategoryId: string;
  numberOfStrings: number;
  numberOfSoundLayers: number;
  numberOfKeys: number;
  diameter: number;
  image: string;
}

function Product() {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState<Product>({
    id: "",
    name: "",
    color: "",
    price: 0,
    brand: "",
    dtype: "",
    subCategoryId: "",
    numberOfStrings: 0,
    numberOfSoundLayers: 0,
    numberOfKeys: 0,
    diameter: 0,
    image: "",
  });

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id]);

  const fetchProductById = (productId: string) => {
    fetch(`/api/product/${productId}`, { method: 'GET' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setSelectedProduct(data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  };

  return (
    <div>
      {selectedProduct ? (
        <div>
          <h1>{selectedProduct.name}</h1>
          <p>Brand: {selectedProduct.brand}</p>
          <p>Price: {selectedProduct.price}</p>
          <p>Color: {selectedProduct.color}</p>
          <p>Picture:</p>
          <img src={`data:image/png;base64,${selectedProduct.image}`} alt={selectedProduct.name} style={{ maxWidth: '100%', height: 'auto' }} />
          {selectedProduct.numberOfStrings && (
            <p>Number of Strings: {selectedProduct.numberOfStrings}</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Product;
