// NonDiscountedProducts.tsx
import React from 'react';
import { Product, getDiscountPrice } from './Products';
import './sildeshow.css'; // Corrected filename
import '../musicStore.css';

interface NonDiscountedProductsProps {
  products: Product[];
  handleProductClick: (id: string) => void;
}

const NonDiscountedProducts: React.FC<NonDiscountedProductsProps> = ({ products, handleProductClick }) => {
  // Filter out products where regular price is not equal to discounted price
  const nonDiscountedProducts = products.filter(product => {
    const discountedPrice = getDiscountPrice(product);
    return product.price !== discountedPrice;
  });

  return (
    <div className="slide-in bg-gray-200 p-4 rounded-md my-5">
      <div className="flex overflow-x-auto">
        {nonDiscountedProducts.map((product, index) => (
          <div key={index} className="col m-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-md relative">
              <div className="badge absolute top-0.5 right-0.5 bg-black text-white px-2 py-1">
                Sale
              </div>
              <img
                className="w-full cursor-pointer"
                onClick={() => handleProductClick(product.id)}
                src={product.image ? `data:image/jpeg;base64,${product.image}` : 'default-image-url'}
                alt="..."
              />
              <div className="p-4">
                <div className="text-center">
                  <h5 className="font-semibold cursor-pointer" onClick={() => handleProductClick(product.id)}>
                    {product.name}
                  </h5>
                  <p className="mt-2">Original Price: {product.price}$</p>
                  <p>Discount Price: {getDiscountPrice(product)}</p>
                </div>
              </div>
              <div className="p-4 pt-0 border-t-0 bg-transparent">
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
  );
};

export default NonDiscountedProducts;
