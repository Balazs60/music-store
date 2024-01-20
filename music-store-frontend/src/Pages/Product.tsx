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
  const [product, setProduct] = useState<Product | null>(null);
  const [maxQuantityReached, setMaxQuantityReached] = useState(false);
  const [quantity, setQuantity] = useState(1)
  const productOriginalPrice = product?.price




  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
    const storedWantedProducts = localStorage.getItem('wantedProducts');
    if (storedWantedProducts) {
      setWantedProducts(JSON.parse(storedWantedProducts));
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
        setProduct(data)
        setSelectedProduct(data);
        setSelectedProduct((prevProduct) => ({
          ...prevProduct!,
          quantity: 1,
        }));
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  };

  console.log("1 quantity " + quantity)


  const handleIncreaseQuantity = () => {

    
    const maxQuantity = product?.quantity || 1
    // if(selectedProduct && product){
    // selectedProduct.price += product?.price
    // }
    setQuantity((prevQuantity) => prevQuantity + 1);
    setMaxQuantityReached(quantity === maxQuantity);

   
  };

  const handleDecreaseQuantity = () => {

    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1))
  
    setMaxQuantityReached(false);
  };
  
  function isProductInTheCart(productId: string) {
    const storedWantedProducts = localStorage.getItem("wantedProducts");
    const wantedProducts: Product[] = storedWantedProducts ? JSON.parse(storedWantedProducts) : [];
  
    for (let i = 0; i < wantedProducts.length; i++) {
      console.log(wantedProducts[i].name);
      if (wantedProducts[i].id === productId) {
        return true;
      }
    }
  
    // If the loop completes and no match is found, return false
    return false;
  }


  // function increaseQuantityIfProductIsAlreadyInTheCart(quantity:number) {
  //   if (selectedProduct && product) {
  //     for (const instrument of wantedProducts) {
  //       if (instrument.id === selectedProduct.id) {
  //         console.log("product price " + product.price)
  //         instrument.quantity += quantity
  //       }
  //     }
  //   }
  // }

  const handleAddToCart = () => {

    console.log("wanted " + wantedProducts[1])

    let updatedWantedProducts;

    if (selectedProduct && product) {

      if(isProductInTheCart(selectedProduct.id)){
        console.log("benne van")
     updatedWantedProducts = wantedProducts.map(product =>
          product.id === selectedProduct.id ? { ...product, quantity: product.quantity + quantity } : product)
      } else {

     // increaseQuantityIfProductIsAlreadyInTheCart(quantity)
selectedProduct.quantity = quantity

       updatedWantedProducts = [...wantedProducts, selectedProduct];
      console.log("updateddproduct length " + updatedWantedProducts.length)

      setWantedProducts(updatedWantedProducts);

      }
      localStorage.setItem("wantedProducts", JSON.stringify(updatedWantedProducts));
      navigate(`/cart`, { state: { productOriginalPrice } });


    } else {
      console.error("Product is not selected.");
    }
  };

  return (
    <div>
      <Header />
      {product ? (
        <div>
          <h1>{product.name}</h1>
          <p>Brand: {product.brand}</p>
          <p>Price: {product.price}</p>
          <p>Color: {product.color}</p>
          <p>Picture:</p>
          <img
            src={`data:image/png;base64,${product.image}`}
            alt={product.name}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          {product.numberOfStrings && (
            <p>Number of Strings: {product.numberOfStrings}</p>
          )}
          <div>
            {maxQuantityReached && <p style={{ color: 'red' }}>No more products in stock</p>}
            <button onClick={handleIncreaseQuantity} disabled={maxQuantityReached}>+</button>
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
