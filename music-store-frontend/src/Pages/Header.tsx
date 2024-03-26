import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, ButtonGroup, Row, Col } from 'react-bootstrap';
import '../musicStore.css';
import { Product } from './Products';
import '../output.css'

// interface CartItem {
//   id: string;
//   member: string;
//   product: {
//     id: string;
//     name: string;
//     color: string;
//     price: number;
//     brand: string;
//     dtype: string;
//     subCategoryId: string;
//     numberOfStrings: number;
//     numberOfSoundLayers: number;
//     numberOfKeys: number;
//     diameter: number;
//     image: string;
//   };
//   quantity: number;
// }

function Header() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  // const [cart, setCart] = useState<CartItem[]>([]);
  const [numberOfCartItem, setNumberOfCartItems] = useState(0)
  const navigate = useNavigate();

  // const fetchCartData = () => {
  //   const member = localStorage.getItem("username");
  //   const token = localStorage.getItem("token");

  //   const headers: Record<string, string> = token
  //   ? { Authorization: `Bearer ${token}` }
  //   : {};

  //   fetch(`/api/cart/${member}`, { method: 'GET', headers: headers })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log(data);
  //       setCart(data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching product details:', error);
  //     });
  // };

  // useEffect(() => {
  //   fetchCartData();
  // }, []);

  const token = localStorage.getItem("token");
  console.log("token" + token)
  const splitToken = token?.split(".") || [];
  let roles = "";
  let decodedPayload = "";


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

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("wantedProducts");

    navigate("/login");
  };
  const handleLogIn = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("wantedProducts");

    navigate("/login");
  };


  useEffect(() => {
    fetchInstruments();
  }, []);

  useEffect(() => {
    filterUniqueProductsInLocaleStorage()
  }, [numberOfCartItem]);

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

  const fetchInstruments = () => {
    const token = localStorage.getItem("token");

    const headers: Record<string, string> = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    fetch('/api/mainpage/products', {
      method: 'GET',
      headers: headers
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

  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    navigate(`/category/${category}`);
  };

  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filteredProducts);
  };

  const handleCartButtonClick = () => {
    navigate('/cart');
  };

  const handeleHomeButtonClick = () => {
    navigate('/')
  }

  return (
   <nav className="bg-white shadow-lg">
      <div className="bg-gray-100 container mx-auto px-4 lg:px-5 flex justify-between items-center">
        {/* First Row */}
        <div className='mt-4 mb-4'>
          <ul className="flex items-center space-x-8">
            <li><button className="mr-5 text-gray-800 focus:outline-none" onClick={handeleHomeButtonClick}>
              Home</button></li>
            <li><a className="mr-5 text-gray-800 focus:outline-none" href="/about">About</a></li>
            <li><a className="mr-5 text-gray-800 focus:outline-none" href="/contact">Contact</a></li>
            {token && (
                    <li><a className="mr-5 text-gray-800 focus:outline-none " onClick={handleLogout}>Log Out</a></li>
                  )}
                  {!token && (
                    <li><a className="mr-5 text-gray-800 focus:outline-none "  onClick={handleLogIn}>Log In</a></li>
                  )}
          { roles && roles.includes("ROLE_ADMIN") && ( <li><a className="mr-5 text-gray-800 focus:outline-none" href="/discount">Discount</a></li>)}
          {roles && roles.includes("ROLE_ADMIN") && (
                    <>
                      <li><a className="mr-5 text-gray-800 focus:outline-none" href="/upload">Upload new product</a></li>

                    </>
                  )}
          </ul>
        </div>
        <div >
          <button className="flex items-center bg-white text-gray-800 rounded-full focus:outline-none" type="button" onClick={handleCartButtonClick}>
            <i className="bi-cart-fill"></i>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>

            Cart
            <span className="bg-gray-800 text-white px-2 py-1 ml-1 rounded-full">{numberOfCartItem}</span>
          </button>
        </div>
      </div>
      {/* Second Row */}
      <div className="container mt-4 mx-auto px-4 lg:px-5">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/4 px-4">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle variant="outline-secondary" id="categoryDropdown">
                Select Category
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {[['Guitar', 'Gitár'],
                  ['PercussionInstrument', 'Ütős'],
                  ['KeyboardInstrument', 'Billentyűs'],
                  ['WindInstrument', 'Fúvós'],
                  ['Bass', "Basszusgitár"],
                  ['SoundTechnic', "Hangtechnika"],
                  ['Merch', "Merch"]
                ].map((category, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleCategoryChange(category[0])}
                    active={selectedCategory === category[0]}
                  >
                    {category[1]}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="w-full lg:w-3/4 px-4">
            <div className="relative">
              {filteredProducts.length > 0 && (
                <Dropdown show={true}>
                  <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                    Select a product
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {filteredProducts.map(product => (
                      <Dropdown.Item
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                      >
                        {product.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )}
              <input
                list="filteredProducts"
                type="text"
                className="block w-full h-9 py-3 px-4 leading-tight focus:outline-none bg-gray-200 border-2 border-gray-300 border-solid focus:border-blue-500  mb-4"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>

  );
}

export default Header;
