import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

function SubCategory() {
  const [products, setProducts] = useState<Product[]>([]);
  const { category, subcategoryid } = useParams();
  const navigate = useNavigate();

  console.log("cat " + category);
  console.log("id " + subcategoryid);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch(`/api/category/${category}/subcategory/${subcategoryid}/products`, { method: 'GET' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Product[]) => {
        console.log(data);
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching instruments:', error);
      });
  };

  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <div>
      <ul>
        {products.map((product, index) => (
          <li key={index} onClick={() => handleProductClick(product.id)}>
            Name: {product.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubCategory;
