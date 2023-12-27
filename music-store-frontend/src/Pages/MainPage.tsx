import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, ButtonGroup, Row, Col } from 'react-bootstrap';
import '../musicStore.css';


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
  image:string
}

const MainPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInstruments();
  }, []);

  const fetchInstruments = () => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
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
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item"><a className="nav-link active" aria-current="page" href="#!">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="#!">About</a></li>
                                              <li className="nav-item"><a className="nav-link" href="#!">Contact</a></li>
                    </ul>
                    <form className="d-flex">
                        <button className="btn btn-outline-dark" type="submit">
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
        </header>
           <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {products.map((product, index) => (
              <div key={index} className="col mb-5">
                <div className="card h-100">
                  <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>
                    Sale
                  </div>
                  <img className="card-img-top" onClick={() => handleProductClick(product.id)} src={product.image ? `data:image/jpeg;base64,${product.image}` : 'default-image-url'} alt="..." />
                  <div className="card-body p-4">
                    <div className="text-center">
                      <h5 className="fw-bolder" onClick={() => handleProductClick(product.id)}>{product.name}</h5>
                      {product.price}$
                    </div>
                  </div>
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                      <a className="btn btn-outline-dark mt-auto" href="#">
                        Add to cart
                      </a>
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
