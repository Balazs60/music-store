import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';

interface WantedProduct {
  productId: string;
  productQuantity: number;
}

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id]);

  const navigate = useNavigate();

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

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    const member = localStorage.getItem("username");
    const productid = selectedProduct?.id;

    if (!productid) {
      console.error("Product ID is missing.");
      return;
    }

    if (token) {
      const headers: Record<string, string> = {
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
          console.log('Product added to cart successfully!');
          navigate(`/cart`);
        })
        .catch(error => {
          console.error('Error adding product to cart:', error);
        });
    } else {
      const wantedProduct: WantedProduct = {
        productId: productid,
        productQuantity: quantity,
      };
  
      const storedWantedProducts = localStorage.getItem("wantedProducts");
      const wantedProducts: WantedProduct[] = storedWantedProducts ? JSON.parse(storedWantedProducts) : [];
      
      const existingProductIndex = wantedProducts.findIndex(item => item.productId === productid);
  
      if (existingProductIndex !== -1) {
        wantedProducts[existingProductIndex].productQuantity += quantity;
      } else {
        wantedProducts.push(wantedProduct);
      }
  
      localStorage.setItem("wantedProducts", JSON.stringify(wantedProducts));
      console.log("wantedproductLength " + wantedProducts.length)
      console.log("wandtedproducts 1 quantity " + wantedProducts[0].productQuantity)
  }
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
            <p>{quantity}</p>
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
