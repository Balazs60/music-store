import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from './Header';


// ... (Your Product interface and other code)

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
  const [quantity, setQuantity] = useState(1);
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

  const navigate = useNavigate();
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
    const member = localStorage.getItem("username");
    const productid = selectedProduct.id;
  
    if (!token || !member || !productid) {
      console.error('Invalid token, member, or productid');
      // Handle the error or notify the user
      return;
    }
  
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    fetch(`/api/cart/${member}/${productid}/${quantity}`, {
      method: 'POST',
      headers: headers,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // No need to return response.json(), as there's no expected data
        // Perform any additional logic after successfully adding to the cart
        console.log('Product added to cart successfully!');
        navigate(`/cart`);
      })
      .catch(error => {
        console.error('Error adding product to cart:', error);
        // Handle errors during the fetch or non-successful response
        // You can show an error message to the user if needed
      });
  };
  

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  return (
    <div>
      <Header/>
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
          <div>
          <button onClick={handleIncreaseQuantity}>+</button>
          <p>{quantity}</p>
          <button onClick={handleDecreaseQuantity}>-</button>
          {/* Add to Cart Button */}
          <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Product;