import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';

interface Product {
  id: string;
  name: string;
  color: string;
  price: number;
  brand: string;
  dtype: string;
  subCategoryId: string;
  numberOfStrings: number;
  numberOfSoundLayers?: number;
  numberOfKeys: number;
  diameter: number;
  image: string;
  quantity: number;
}

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wantedProducts, setWantedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id]);

  const fetchProductById = (productId: string) => {
    const token = localStorage.getItem("token");
    const headers: Record<string, string> = token
      ? { Authorization: `Bearer ${token}` }
      : {};

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

  const handleIncreaseQuantity = () => {
    setSelectedProduct(prevProduct => ({
      ...prevProduct!,
      quantity: (prevProduct!.quantity || 0) + 1
    }));
  };

  const handleDecreaseQuantity = () => {
    setSelectedProduct(prevProduct => ({
      ...prevProduct!,
      quantity: Math.max((prevProduct!.quantity || 0) - 1, 1)
    }));
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      const updatedWantedProducts = [...wantedProducts, selectedProduct];
      setWantedProducts(updatedWantedProducts);
      localStorage.setItem("wantedProducts", JSON.stringify(updatedWantedProducts));
      navigate(`/cart`);
    } else {
      console.error("Product is not selected.");
    }
  };

  return (
    <div>
      <Header />
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
            <p>{selectedProduct.quantity}</p>
            <button onClick={handleDecreaseQuantity}>-</button>
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
