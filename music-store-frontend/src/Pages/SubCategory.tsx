import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function SubCategory() {

    const[products, setProducts] = useState([])
  const {category, subcategoryid} = useParams();
  const navigate = useNavigate();
  

  console.log("cat " +  category )
  console.log("id " + subcategoryid )

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
            .then(data => {
                console.log(data);
                setProducts(data);
            })
            .catch(error => {
                console.error('Error fetching instruments:', error);
            });
    };

    const handleProductClick = (id) => {
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
            </ul>        </div>
    );
}

export default SubCategory;
