import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import React, { useState, useEffect, useContext } from 'react';
import {Product, getDiscountPrice } from './Products';
import {Context} from './Context';




// interface Product {
//   id: string;
//   name: string;
//   color: string;
//   price: number;
//   brand: string;
//   dtype: string;
//   subCategoryId: string;
//   numberOfStrings: number;
//   numberOfSoundLayers?: number;
//   numberOfKeys: number;
//   diameter: number;
//   image: string;
//   quantity: number;
// }

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wantedProducts, setWantedProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [maxQuantityReached, setMaxQuantityReached] = useState(false);
  const [quantity, setQuantity] = useState(1)
  const productOriginalPrice = product?.price
  //const producitQuantityInTheShop = product?.quantity
  const [producitQuantityInTheShop, setProductQuantityInTheShop] = useState(0);
  const {setCartItemsNumber: setCartItemsNumber} = useContext(Context);
  const [numberOfCartItems, setNumberOfCartItems] = useState(1);






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
        setProductQuantityInTheShop(data.quantity)
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
    if (maxQuantityReached) {
      // If max quantity is reached, don't allow further increase
      return;
    }
  
    const maxQuantity = product?.quantity || 1;
  
    // Update the quantity if it's less than the max quantity
    if (quantity < maxQuantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  
    // Check if the new quantity equals the max quantity
    setMaxQuantityReached(quantity + 1 === maxQuantity);
    setNumberOfCartItems((prevcount) => prevcount +1)

  };
  

  const handleDecreaseQuantity = () => {

    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1))
  
    setMaxQuantityReached(false);
    if (numberOfCartItems > 1) {
      setNumberOfCartItems((prevcount) => prevcount - 1)
    }
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

selectedProduct.quantity = quantity

       updatedWantedProducts = [...wantedProducts, selectedProduct];
      console.log("updateddproduct length " + updatedWantedProducts.length)

      setWantedProducts(updatedWantedProducts);

      }
      setCartItemsNumber((prevcount) => prevcount + numberOfCartItems);
      localStorage.setItem("wantedProducts", JSON.stringify(updatedWantedProducts));
      navigate(`/cart`, { state: { productOriginalPrice, producitQuantityInTheShop } });


    } else {
      console.error("Product is not selected.");
    }
  };

  return (
 
<div>
  <Header />
  <div className='m-4 grid grid-cols-2 gap-4'>
    {/* Image Section */}
    <div className='col-span-1'>
      {product && (
        <img
          src={`data:image/png;base64,${product.image}`}
          alt={product.name}
          className="max-w-full h-auto w-60"
        />
      )}
    </div>
    {/* Product Details Section */}
    <div className='col-span-1'>
      {product && (
        <>
          <h1 className="text-xl font-bold m-2">{product.name}</h1>
          <p className='m-2'>Brand: {product.brand}</p>
          <p className='m-2'>Price: {getDiscountPrice(product)}</p>
          
          {/* Quantity Controls */}
          {producitQuantityInTheShop > 0 && (
            <div className="flex items-center">
              <button className="bg-white text-gray-800 border border-gray-800 hover:bg-gray-700  px-4 py-2 rounded-md mr-2" onClick={handleDecreaseQuantity}>-</button>
              <p className='m-2'>{quantity}</p>
              <button className="bg-white text-gray-800 border border-gray-800 hover:bg-gray-700  px-4 py-2 rounded-md mr-2" onClick={handleIncreaseQuantity}>+</button>
            </div>
          )}

          {producitQuantityInTheShop === 0 && (
            <div>
              <p className="text-red-500">No more products in stock</p>
            </div>
          )}

          {/* Add to Cart Button */}
          {producitQuantityInTheShop > 0 && (
            <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleAddToCart}>
              Add to Cart
            </button>
          )}

          {maxQuantityReached && (
            <p className="text-red-500">No more products in stock</p>
          )}
        </>
      )}
      {product === null && (
        <p className="text-red-500">Product not found</p>
      )}
    </div>
  </div>
</div>

  
  );
}

export default Product;
