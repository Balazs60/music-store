import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../musicStore.css';
import { Product, getDiscountPrice } from './Products';
import { confirmAlert } from 'react-confirm-alert';


import DiscountedProducts from './DiscountedProduct'
import Header from './Header';

/*interface Product {
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
  getDiscountPrice(): number;
}*/

// interface WantedProduct {
//   productId: string;
//   productQuantity: number;
// }



const MainPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [numberOfCartItem, setNumberOfCartItems] = useState(0)
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [productsToShow, setProductsToShow] = useState(20); // Number of products to display initially
  const [showMoreButton, setShowMoreButton] = useState(true); // Show the "Show more products" button
  const navigate = useNavigate();


  const token = localStorage.getItem("token");
  console.log("token" + token)
  const splitToken = token?.split(".") || [];
  console.log("split token " + splitToken)
  console.log("decoded payload: ", splitToken[1]);

  let decodedPayload = "";
  let roles = "";

  if (splitToken[1]) {
    try {
      decodedPayload = atob(splitToken[1]);
      console.log("decoded: ", decodedPayload);

      const parsedPayload = JSON.parse(decodedPayload);
      roles = parsedPayload.Roles || ""; // Access the "Roles" claim

      console.log("Roles: ", roles);
    } catch (error) {
      console.error("Error decoding payload:", error);
    }
  }

  const updateNumberOfCartItems = () => {
    const localStorageCart = localStorage.getItem('wantedProducts');
    if (localStorageCart) {
      const parsedCart = JSON.parse(localStorageCart);
      setNumberOfCartItems(parsedCart.length);
    }
  };

  useEffect(() => {
    fetchInstruments();
    updateNumberOfCartItems();
  }, []);


  useEffect(() => {
    setDisplayedProducts(products.slice(0, productsToShow));
  }, [products, productsToShow]);

  const fetchInstruments = () => {
    const token = localStorage.getItem("token");
    console.log("token most" + token)

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    if (token) {
      console.log("nem kellene belemennie mainpage products")

      fetch('/api/mainpage/products', {

        method: 'GET', headers: headers
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setProducts(data);
        })
        .catch(error => {
          console.error('Error fetching instruments:', error);
        });
    }
    if (!token) {
      fetch('/api/mainpage/products', {

        method: 'GET'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setProducts(data);
        })
        .catch(error => {
          console.error('Error fetching instruments:', error);
        });

    }
  };


  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
  };



  const fetchProductById = async (productId: string): Promise<Product | null> => {
    try {
      const token = localStorage.getItem("token");
      const headers: Record<string, string> = token
        ? { Authorization: `Bearer ${token}` }
        : {};

      const response = await fetch(`/api/product/${productId}`, { method: 'GET', headers: headers });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
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

    return false;
  }

  const handleAddToCartButtonClick = async (productId: string) => {

    try {
      const product = await fetchProductById(productId);

      if (!product) {
        console.error("Product not found.");
        return;
      }

      const wantedProduct: Product = product;
      wantedProduct.quantity = 1



      const storedWantedProducts = localStorage.getItem("wantedProducts");
      const wantedProducts: Product[] = storedWantedProducts ? JSON.parse(storedWantedProducts) : [];

      if (isProductInTheCart(productId)) {
        console.log("benne van")
        for (let i = 0; i < wantedProducts.length; i++) {
          if (wantedProducts[i].id === productId) {
            wantedProducts[i].quantity += 1
          }
        }
      } else {
        console.log("nincs benne")
        wantedProducts.push(wantedProduct);
      }

      localStorage.setItem("wantedProducts", JSON.stringify(wantedProducts));
      console.log("wantedproductLength " + wantedProducts[0].id);

      updateNumberOfCartItems();


      confirmAlert({
        title: 'Product added to the cart',
        message: 'Move to the cart or continue shopping?',
        buttons: [
          {
            label: 'Cart',
            onClick: () => navigate("/cart"),
            className: 'bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mr-2',
          },
          {
            label: 'Shopping',
            className: 'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded',
          },
        ],
        customUI: ({ onClose }) => (
          <div className="custom-ui">
            <h1 className="text-xl font-bold mb-4">Product added to the cart</h1> {/* Style the title text */}
            <p className="text-lg mb-4">Move to the cart or continue shopping?</p> {/* Style the message text */}
            <button onClick={() => { onClose(); navigate("/cart"); }} className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mr-2">Cart</button> {/* Style the "Cart" button */}
            <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Shopping</button> {/* Style the "Shopping" button */}
          </div>
        ),
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    filterUniqueProductsInLocaleStorage()
  }, []);

  function filterUniqueProductsInLocaleStorage() {
    const localStorageCart = localStorage.getItem('wantedProducts');
    if (localStorageCart) {
      const parsedCart = JSON.parse(localStorageCart);
      console.log("parsed " + parsedCart[0])
      const groupedCart: Record<string, Product> = {};
      parsedCart.forEach((product: Product) => {
        if (!groupedCart[product.id]) {
          groupedCart[product.id] = { ...product, quantity: 1 };
        } else {
          groupedCart[product.id].quantity += 1;
        }
      })
      const updatedCart: Product[] = Object.values(groupedCart);

      setNumberOfCartItems(updatedCart.length);
    }
  }

  const handleShowMoreProducts = () => {
    setProductsToShow(prev => prev + 20);

    if (products.length <= productsToShow + 20) {
      setShowMoreButton(false);
    }
  };

  return (



    <div>
      <Header />
      <div>
        <div
          style={{ backgroundImage: "url('src/assets/mainpage music store.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', height: '400px' }}
          className="flex flex-col justify-center items-center h-full"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-white" style={{ textShadow: '-moz-initial' }}>Music Shop</h1>
          <p className="text-lg lg:text-xl font-normal text-white lg:max-w-lg text-center">Wide range of instruments</p>
        </div>
        <div >
          <DiscountedProducts products={products} handleProductClick={handleProductClick} handleAddToCartButtonClick={handleAddToCartButtonClick} />
        </div>
        <div>
          <h2 className=" m-4 text-2xl font-bold text-center my-4">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {displayedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg p-4 shadow-md">
                <img className='cursor-pointer' onClick={() => handleProductClick(product.id)} src={product.image ? `data:image/jpeg;base64,${product.image}` : 'default-image-url'} alt="..." />
                <h3 className="text-lg font-semibold mb-2 cursor-pointer" onClick={() => handleProductClick(product.id)}>{product.name}</h3>
                <p className="text-gray-700">${getDiscountPrice(product)}$</p>
                {product.quantity > 0 && <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-4" type="button" onClick={() => handleAddToCartButtonClick(product.id)}>Add to Cart</button>}
                {product.quantity === 0 && <p className='text-red-500'>No more products in stock</p>}
              </div>
            ))}
          </div>
          {showMoreButton && (
            <div className=" mb-4 text-center mt-4">
              <button
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleShowMoreProducts}
              >
                Show more products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default MainPage;
