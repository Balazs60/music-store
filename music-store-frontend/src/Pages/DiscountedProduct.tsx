import React, { useRef } from 'react';
import { Product, getDiscountPrice } from './Products';
import './sildeshow.css'; 
import '../musicStore.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";




interface NonDiscountedProductsProps {
  products: Product[];
  handleProductClick: (id: string) => void;
  handleAddToCartButtonClick: (id: string) => void;
}

const NonDiscountedProducts: React.FC<NonDiscountedProductsProps> = ({ products, handleProductClick, handleAddToCartButtonClick }) => {

  const nonDiscountedProducts = products.filter(product => {
    const discountedPrice = getDiscountPrice(product);
    return product.price !== discountedPrice;
  });

  const sliderRef = useRef<typeof Slider>(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,

  }


  return (
    <div className=" w-full m-auto">
      <h2 className=" m-4 text-2xl font-bold text-center my-4">Discounts</h2>
      <div >
        <Slider ref={sliderRef} {...settings}>
          {nonDiscountedProducts.map((product) => (
            <div key={product.id} className="bg-gray-100 rounded-lg p-4 shadow-md relative">
              <div className="badge absolute top-0.5 right-0.5 bg-black text-white px-2 py-1">
                -{product.discount}%
              </div>
              <img className='cursor-pointer' onClick={() => handleProductClick(product.id)} src={product.image ? `data:image/jpeg;base64,${product.image}` : 'default-image-url'} alt="..." />
              <h3 className="text-lg font-semibold mb-2 cursor-pointer" onClick={() => handleProductClick(product.id)}>{product.name}</h3>
              <p className="text-gray-700">Original price: ${product.price}$</p>
              <p>Discount Price: {getDiscountPrice(product)}</p>
              {product.quantity > 0 && <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-4" type="button" onClick={() => handleAddToCartButtonClick(product.id)}>Add to Cart</button>}
              {product.quantity === 0 && <p className='text-red-500'>No more products in stock</p>}
            </div>
          ))}
        </Slider>
        <div className="flex justify-center mt-4">
          <button className="button mr-2" onClick={() => sliderRef?.current?.slickPrev()}>
            Previous
          </button>
          <button className="button" onClick={() => sliderRef?.current?.slickNext()}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default NonDiscountedProducts;
