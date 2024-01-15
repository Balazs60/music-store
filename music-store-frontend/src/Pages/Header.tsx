import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, ButtonGroup, Row, Col } from 'react-bootstrap';
import '../musicStore.css';
import { Product } from './Products';

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
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container px-4 px-lg-5">
          <button className="btn btn-link nav-link" onClick={handeleHomeButtonClick}>
            Music Shop
          </button>          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              <button className="btn btn-link nav-link active" aria-current="page" onClick={handeleHomeButtonClick}>
                Home
              </button>
              <li className="nav-item"><a className="nav-link" href="/about">About</a></li>
              <li className="nav-item"><a className="nav-link" href="/contact">Contact</a></li>
              <li className="nav-item"><a className="nav-link" href="/discount">Discount</a></li>
            </ul>
            <form className="d-flex">
              <button className="btn btn-outline-dark" type="button" onClick={handleCartButtonClick}>
                <i className="bi-cart-fill me-1"></i>
                Cart
                <span className="badge bg-dark text-white ms-1 rounded-pill">{numberOfCartItem}</span>
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
      </div>
    </div>
  );
}

export default Header;
