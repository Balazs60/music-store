import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// ... (Your Product interface and other code)

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
    const token = localStorage.getItem("token");
    
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    fetch(`/api/product/${productId}`, { method: 'GET', headers: headers })
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

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
  
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', 
    };
    const member=localStorage.getItem("username")
  
    const productid = selectedProduct.id;
     
  
  
    fetch(`/api/cart/${member}/${productid}`, {
      method: 'POST',
      headers: headers,
        
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Product added to cart:', data);
        // Handle any additional logic after successfully adding to the cart
      })
      .catch(error => {
        console.error('Error adding product to cart:', error);
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
          <img
            src={`data:image/png;base64,${selectedProduct.image}`}
            alt={selectedProduct.name}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          {selectedProduct.numberOfStrings && (
            <p>Number of Strings: {selectedProduct.numberOfStrings}</p>
          )}
          
          {/* Add to Cart Button */}
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Product;