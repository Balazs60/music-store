import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, ButtonGroup, Row, Col } from 'react-bootstrap';

const MainPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [instruments, setInstruments] = useState<string[]>([]);

  useEffect(() => {
    fetchInstruments();
  }, []);


    const fetchInstruments = () => {
      fetch('/api/products' ,{method:"GET"})
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data)
          setInstruments(data);
        })
        .catch(error => {
          console.error('Error fetching instruments:', error);
        });
    };
    

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
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
              {['Pengetős', 'Ütős', 'Billentyűs', 'Fúvós'].map((category, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => handleCategoryChange(category)}
                  active={selectedCategory === category}
                >
                  {category}
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
        {instruments.map((instrument, index) => (
          <li key={index} className="list-group-item">
            {instrument.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
