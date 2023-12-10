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
  numberOfKeys : number;
  diameter: number;

}

const MainPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInstruments();
  }, []);

  const fetchInstruments = () => {
    fetch('/api/mainpage/products', { method: 'GET' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
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

      const handleGuitarClick = (id : string) => {
        navigate(`/product/${id}`);
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
              {[['guitars', 'Gitár'],
                 ['percussion', 'Ütős'],
                 ['key', 'Billentyűs'],
                 ['wind', 'Fúvós']].map((category, index) => (
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
            <input type="text" className="form-control" placeholder="Search..." />
          </div>
        </Col>
      </Row>

      <h1 className="mt-3">List of Instruments</h1>
      <ul className="list-group">
        {products.map((product, index) => (
          <li key={index} className="list-group-item"  onClick={() => handleGuitarClick(product.id)}>
            {product.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
