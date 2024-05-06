import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import '../musicStore.css';
import {Product} from './Products';
import ProductList from './ProductList';

const Discounter: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchInstruments();
  }, []);

  const fetchInstruments = () => {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    fetch('/api/mainpage/products', {
      method: 'GET',
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching instruments:', error);
      });
  };

  const handleProductClick = (productId: string) => {
    console.log(`Product clicked: ${productId}`);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <Row className="mb-4">
      <Col>
        <h2 className="text-2xl font-bold">Product List</h2>
      </Col>
    </Row>

    <ProductList products={products} onProductClick={handleProductClick} />
  </div>
  );
};

export default Discounter;
