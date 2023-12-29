// ProductList.tsx

import React, { useState } from 'react';
import { Product } from './Products'; // Import the Product type
import '../musicStore.css'; // Import your CSS file

interface ProductListProps {
  products: Product[];
  onProductClick: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  // State to store discount percentage for each product
  const [discounts, setDiscounts] = useState<{ [productId: string]: number }>({});

  const handleDiscountChange = (product: Product, discount: number) => {
    setDiscounts(prevState => ({
      ...prevState,
      [product.id]: discount,
    }));
    product.discount = discount;
    console.log(product);
  };

  const handleAddDiscountClick = (product: Product) => {
    const productId: string=product.id;
    const productSale:number=product.discount;
    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

    fetch(`/api/products/${productId}/productdiscount/${productSale}`, {
      method: 'POSt',
      headers: headers,
     
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Handle the response from the backend if needed
        console.log('Discount added successfully:', data);
      })
      .catch(error => {
        console.error('Error adding discount:', error);
      });
  };

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {products.map((product, index) => (
            <div key={index} className="col mb-5">
              <div className="card h-100">
                <img
                  className="card-img-top"
                  src={product.image ? `data:image/jpeg;base64,${product.image}` : 'default-image-url'}
                  alt="..."
                />
                <div className="card-body p-4">
                  <div className="text-center">
                    <h5 className="fw-bolder">{product.name}</h5>
                    Original Price: {product.price}$
                    <br />
                    {/* Input field for discount percentage */}
                    <input
                      type="number"
                      placeholder="Discount %"
                      value={discounts[product.id] || ''}
                      onChange={(e) => handleDiscountChange(product, +e.target.value)}
                    />
                  </div>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div className="text-center">
                    <button
                      className="btn btn-outline-dark mt-auto"
                      onClick={() => handleAddDiscountClick(product)}
                    >
                      Add discount
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
