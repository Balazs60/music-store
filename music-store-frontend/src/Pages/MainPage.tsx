import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, ButtonGroup, Row, Col } from 'react-bootstrap';

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
      
      method: 'GET' ,headers: headers})
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

      <h1 className="mt-3">List of Instruments</h1>
      <ul className="list-group">
        {products.map((product, index) => (
          <li key={index} className="list-group-item" onClick={() => handleProductClick(product.id)}>
            {product.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
