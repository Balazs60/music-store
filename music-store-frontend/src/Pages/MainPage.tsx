import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, ButtonGroup, Row, Col } from 'react-bootstrap';
import '../musicStore.css';
import { Product } from './Products';
import { confirmAlert } from 'react-confirm-alert';


import DiscountedProducts from './DiscountedProduct'

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

interface WantedProduct {
  productId: string;
  productQuantity: number;
}


const MainPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();


  const token = localStorage.getItem("token");
  console.log("token"+token)
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



  useEffect(() => {
    fetchInstruments();
  }, []);
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

  const fetchInstruments = () => {
    const token = localStorage.getItem("token");
    console.log("token most"+token)

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    if(token){
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
      });}
      if(!token){ 
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

  const handleAddToCart = (productId: string) => {
    const token = localStorage.getItem("token");
    const member = localStorage.getItem("username");
  
    // if (!token || !member || !productid) {
    //   console.error('Invalid token, member, or productid');
    //   // Handle the error or notify the user
    //   return;
    // }
  
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
   if(token){
  
    fetch(`/api/cart/${member}/${productId}/${"1"}`, {
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
      })
      .catch(error => {
        console.error('Error adding product to cart:', error);
        // Handle errors during the fetch or non-successful response
        // You can show an error message to the user if needed
      });
    }
  };

  const handleAddToCartButtonClick = (productId: string) => {
    if(token){
    handleAddToCart(productId);
    }  else {
      const wantedProduct: WantedProduct = {
        productId: productId,
        productQuantity: 1,
      };
  
      const storedWantedProducts = localStorage.getItem("wantedProducts");
      const wantedProducts: WantedProduct[] = storedWantedProducts ? JSON.parse(storedWantedProducts) : [];
      
      const existingProductIndex = wantedProducts.findIndex(item => item.productId === productId);
  
      if (existingProductIndex !== -1) {
        wantedProducts[existingProductIndex].productQuantity += 1;
      } else {
        wantedProducts.push(wantedProduct);
      }
  
      localStorage.setItem("wantedProducts", JSON.stringify(wantedProducts));
      console.log("wantedproductLength " + wantedProducts.length)
      console.log("wandtedproducts 1 quantity " + wantedProducts[0].productQuantity)
    }
    confirmAlert({
      title: 'Product added to the cart',
      message: 'Move to the cart or continue shopping?',
      buttons: [
        {
          label: 'Cart',
          onClick: () => navigate("/cart"),
        },
        {
          label: 'Shopping',
        },
      ],
      customUI: ({ onClose }) => (
        <div className="custom-ui">
          <h1>Product added to the cart</h1>
          <p>Move to the cart or continue shopping?</p>
          <button onClick={() => { onClose(); navigate("/cart"); }}>Cart</button>
          <button onClick={onClose}>Shopping</button>
        </div>
      ),
    });
 
  };


  return (
   
   
  
    <div lang='en'>
         <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Shop Homepage - Start Bootstrap Template</title>
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        <link href="css/styles.css" rel="stylesheet" />
    </head>
    <body>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container px-4 px-lg-5">
    <a className="navbar-brand" href="#!">Music Shop</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
        <li className="nav-item"><a className="nav-link active" aria-current="page" href="#!">Home</a></li>
        <li className="nav-item"><a className="nav-link" href="/about">About</a></li>
        <li className="nav-item"><a className="nav-link" href="/contact">Contact</a></li>
        {token && (
              <li className="nav-item"><a className="nav-link" href="#" onClick={handleLogout}>Log Out</a></li>
            )}
       {!token && (
              <li className="nav-item"><a className="nav-link" href="#" onClick={handleLogIn}>Log In</a></li>
            )}
        {roles && roles.includes("ROLE_ADMIN") && (
          <>
            <li className="nav-item"><a className="nav-link" href="/discount">Discount</a></li>
         
          </>
        )}
      </ul>
      <form className="d-flex">
        <button className="btn btn-outline-dark" type="button" onClick={handleCartButtonClick}>
          <i className="bi-cart-fill me-1"></i>
          Cart
          <span className="badge bg-dark text-white ms-1 rounded-pill">0</span>
        </button>
      </form>
    </div>
  </div>
</nav>

    <div className="container mt-4">
      <Row>
        <Col md={3}>
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
        </Col>
        <Col md={9}>
          <div className="input-group">
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
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </Col>
      </Row>

             <header className="bg-dark py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="text-center text-white">
                    <h1 className="display-4 fw-bolder">Music Shop</h1>
                    <p className="lead fw-normal text-white-50 mb-0">Hangszerek széles választéka</p>
                </div>
            </div>
            <div lang='en'>
      {/* ... (your existing JSX) */}

      <section className="py-5">
        
     <div >
      
        </div>
        
      </section>
    </div>
        </header>
           <section className="py-5">
           <div >
          <DiscountedProducts products={products} />

        </div>
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {products.map((product, index) => (
              <div key={index} className="col mb-5">
                <div className="card h-100">
                
                  <img className="card-img-top" onClick={() => handleProductClick(product.id)} src={product.image ? `data:image/jpeg;base64,${product.image}` : 'default-image-url'} alt="..." />
                  <div className="card-body p-4">
                    <div className="text-center">
                      <h5 className="fw-bolder" onClick={() => handleProductClick(product.id)}>{product.name}</h5>
                      {product.price}$
                    </div>
                  </div>
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                      {/* <a className="btn btn-outline-dark mt-auto" href="#">
                        Add to cart
                      </a> */}
                        <button className="btn btn-outline-dark mt-auto" type="button" onClick={()=> handleAddToCartButtonClick(product.id)}>Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
        </div>
        </body>
        </div>
  );
};

export default MainPage;
