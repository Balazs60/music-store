import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../musicStore.css';
import { Product } from './Products';
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




  // const handleAddToCart = (productId: string) => {
  //   const token = localStorage.getItem("token");
  //   const member = localStorage.getItem("username");

  //   // if (!token || !member || !productid) {
  //   //   console.error('Invalid token, member, or productid');
  //   //   // Handle the error or notify the user
  //   //   return;
  //   // }

  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //     'Content-Type': 'application/json',
  //   };
  //  if(token){

  //   fetch(`/api/cart/${member}/${productId}/${"1"}`, {
  //     method: 'POST',
  //     headers: headers,
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       // No need to return response.json(), as there's no expected data
  //       // Perform any additional logic after successfully adding to the cart
  //       console.log('Product added to cart successfully!');
  //     })
  //     .catch(error => {
  //       console.error('Error adding product to cart:', error);
  //       // Handle errors during the fetch or non-successful response
  //       // You can show an error message to the user if needed
  //     });
  //   }
  // };

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

    // If the loop completes and no match is found, return false
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
            // wantedProducts[i].price += product.price
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

  return (



    <div>
    <Header />
    <div>
      <div
        style={{ backgroundImage: "url('src/assets/mainpage music store.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', height: '400px' }}
        className="flex flex-col justify-center items-center h-full"
      >
        <h1 className="text-4xl lg:text-6xl font-bold text-white" style={{ textShadow: '-moz-initial' }}>Music Shop</h1>
        <p className="text-lg lg:text-xl font-normal text-white lg:max-w-lg text-center">Hangszerek széles választéka</p>
      </div>
      <div >
        <DiscountedProducts products={products} handleProductClick={handleProductClick} />
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg p-4 shadow-md">
              <img onClick={() => handleProductClick(product.id)} src={product.image ? `data:image/jpeg;base64,${product.image}` : 'default-image-url'} alt="..." />
              <h3 className="text-lg font-semibold mb-2" onClick={() => handleProductClick(product.id)}>{product.name}</h3>
              <p className="text-gray-700">${product.price}$</p>
              {product.quantity > 0 && <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-4" type="button" onClick={() => handleAddToCartButtonClick(product.id)}>Add to Cart</button>}
              {product.quantity === 0 && <p className='text-red-500'>No more products in stock</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default MainPage;
