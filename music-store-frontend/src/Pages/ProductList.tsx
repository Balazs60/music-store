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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div key={index} className="flex flex-col items-center mb-5">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img
                  className="w-full"
                  src={product.image ? `data:image/jpeg;base64,${product.image}` : 'default-image-url'}
                  alt="..."
                />
                <div className="p-4">
                  <div className="text-center">
                    <h5 className="font-semibold">{product.name}</h5>
                    <p>Original Price: {product.price}$</p>
                    {/* Input field for discount percentage */}
                    <input
                      type="number"
                      placeholder="Discount %"
                      value={discounts[product.id] || ''}
                      onChange={(e) => handleDiscountChange(product, +e.target.value)}
                      className="border p-2 mt-2 w-full"
                    />
                    <button
                      className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-4"
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
