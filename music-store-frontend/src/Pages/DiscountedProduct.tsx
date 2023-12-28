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
    <div className="slide-in" style={{ background: '#f2f2f2', padding: '10px', borderRadius: '8px', margin: '20px 0', width: '100%' }}>
      <div className="card-container" style={{ display: 'flex', overflowX: 'auto' }}>
        {nonDiscountedProducts.map((product, index) => (
          <div key={index} className="card-wrapper col mb-5">
            <div className="card h-100">
              <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>
                Sale
              </div>
              <img
                className="card-img-top"
                onClick={() => handleProductClick(product.id)}
                src={product.image ? `data:image/jpeg;base64,${product.image}` : 'default-image-url'}
                alt="..."
              />
              <div className="card-body p-4">
                <div className="text-center">
                  <h5 className="fw-bolder" onClick={() => handleProductClick(product.id)}>
                    {product.name}
                  </h5>
                  Original Price: {product.price}$
                  <br />
                  Discount Price: {getDiscountPrice(product)}
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
  );
};

export default NonDiscountedProducts;
