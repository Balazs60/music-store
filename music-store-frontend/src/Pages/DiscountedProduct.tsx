// NonDiscountedProducts.tsx
import React from 'react';
import { Product, getDiscountPrice } from './Products';
import './sildeshow.css'; // Corrected filename

interface NonDiscountedProductsProps {
  products: Product[];
}

const NonDiscountedProducts: React.FC<NonDiscountedProductsProps> = ({ products }) => {
  // Filter out products where regular price is not equal to discounted price
  const nonDiscountedProducts = products.filter(product => {
    const discountedPrice = getDiscountPrice(product);
    return product.price !== discountedPrice;
  });

  return (
    <div className="slide-in" style={{ background: '#f2f2f2', padding: '10px', borderRadius: '8px', margin: '20px 0', width: '100%' }}>
     
      <div style={{ display: 'flex', overflowX: 'auto' }}>
        {nonDiscountedProducts.map(product => (
          <div key={product.id} style={{ marginRight: '20px', flex: '0 0 auto', maxWidth: '300px', border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }}>
            <img className="card-img-top" src={product.image ? `data:image/jpeg;base64,${product.image}` : 'default-image-url'} alt="..." style={{ width: '100%', borderRadius: '8px' }} />
            <div style={{ marginTop: '10px' }}>
              <strong>{product.name}</strong>
            </div>
            <div>Regular Price: ${product.price}</div>
            <div>Discounted Price: ${getDiscountPrice(product)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NonDiscountedProducts;
