import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slider';
import Header from './Header';
import { confirmAlert } from 'react-confirm-alert';
import Product from './Product';
import React, { useState, useEffect } from 'react';
import '../output.css'


function SubCategory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [minPrice, setMinPrice] = useState<number | ''>(0);
  const [maxPrice, setMaxPrice] = useState<number | ''>(0);
  const [lowestPrice, setLowestPrice] = useState<number>(0);
  const [highestPrice, setHighestPrice] = useState<number>(0);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const { category, subcategoryid } = useParams();
  const [values, setValues] = useState([lowestPrice, highestPrice])
  const navigate = useNavigate();

  console.log("cat " + category);
  console.log("id " + subcategoryid);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setValues([lowestPrice, highestPrice]);
  }, [lowestPrice, highestPrice]);

  const fetchProducts = () => {
    const token = localStorage.getItem("token");

    const headers: Record<string, string> = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    fetch(`/api/category/${category}/subcategory/${subcategoryid}/products`, { method: 'GET', headers: headers })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Product[]) => {
        console.log(data);
        setProducts(data);
        setFilteredProducts(data);
        setMinPrice(Math.min(...data.map(product => product.price)))
        setMaxPrice(Math.max(...data.map(product => product.price)))
        setLowestPrice(Math.min(...data.map(product => product.price)))
        setHighestPrice(Math.max(...data.map(product => product.price)))

      })
      .catch(error => {
        console.error('Error fetching instruments:', error);
      });
  };



  function filterProductsByPrice() {
    const min = minPrice === '' || minPrice < lowestPrice ? lowestPrice : minPrice;
    const max = maxPrice === '' || maxPrice > highestPrice ? highestPrice : maxPrice;
    const filteredProducts = products.filter(product => product.price >= min && product.price <= max);
    return filteredProducts
  }


  function filterProductsByBrand(products: Product[]) {
    if (selectedBrands.length === 0) {
      return products
    } else {
      const filteredProducts = products.filter(product => selectedBrands.includes(product.brand))
      return filteredProducts
    }
  }

  const handleBrandCheckboxChange = (brand: string) => {
    const updatedSelectedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];

    setSelectedBrands(updatedSelectedBrands);
  };

  const handleSearch = () => {
    const filteredProductsByPrice = filterProductsByPrice();
    setFilteredProducts(filteredProductsByPrice);
  };

  function setValuesAndMinPriceMaxPriceWithSlider(newValues: number[]) {
    const [min, max] = newValues
    setMinPrice(min)
    setMaxPrice(max)
    setValues(newValues)
  }

  function setMinPriceWithInputField(e: React.ChangeEvent<HTMLInputElement>) {
    setMinPrice(parseFloat(e.target.value))
    setValues([parseFloat(e.target.value), values[1]])

  }

  function setMaxPriceWithInputField(e: React.ChangeEvent<HTMLInputElement>) {
    setMaxPrice(parseFloat(e.target.value))
    setValues([values[0], parseFloat(e.target.value)])

  }



  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  const fetchProductById = async (productId: string): Promise<Product | null> => {
    try {
      const token = localStorage.getItem("token");
      const headers: Record<string, string> = token
        ? { Authorization: `Bearer ${token}` }
        : {};

      const response = await fetch(`/api/product/${productId}`, { method: 'GET', headers: headers });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  };



  function isProductInTheCart(productId: string) {
    const storedWantedProducts = localStorage.getItem("wantedProducts");
    const wantedProducts: Product[] = storedWantedProducts ? JSON.parse(storedWantedProducts) : [];

    for (let i = 0; i < wantedProducts.length; i++) {
      console.log(wantedProducts[i].name);
      if (wantedProducts[i].id === productId) {
        return true;
      }
    }

    // If the loop completes and no match is found, return false
    return false;
  }

  const handleAddToCartButtonClick = async (productId: string) => {
    try {
      const product = await fetchProductById(productId);

      if (!product) {
        console.error("Product not found.");
        return;
      }
      const wantedProduct: Product = product;
      wantedProduct.quantity = 1



      const storedWantedProducts = localStorage.getItem("wantedProducts");
      const wantedProducts: Product[] = storedWantedProducts ? JSON.parse(storedWantedProducts) : [];

      if (isProductInTheCart(productId)) {
        console.log("benne van")
        for (let i = 0; i < wantedProducts.length; i++) {
          if (wantedProducts[i].id === productId) {
            wantedProducts[i].quantity += 1
            // wantedProducts[i].price += product.price
          }
        }
      } else {
        console.log("nincs benne")
        wantedProducts.push(wantedProduct);
      }

      localStorage.setItem("wantedProducts", JSON.stringify(wantedProducts));
      console.log("wantedproductLength " + wantedProducts[0].id);


      confirmAlert({
        title: 'Product added to the cart',
        message: 'Move to the cart or continue shopping?',
        buttons: [
          {
            label: 'Cart',
            onClick: () => navigate("/cart"),
            className: 'bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mr-2', 
          },
          {
            label: 'Shopping',
            className: 'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded', 
          },
        ],
        customUI: ({ onClose }) => (
          <div className="custom-ui">
            <h1 className="text-xl font-bold mb-4">Product added to the cart</h1> {/* Style the title text */}
            <p className="text-lg mb-4">Move to the cart or continue shopping?</p> {/* Style the message text */}
            <button onClick={() => { onClose(); navigate("/cart"); }} className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mr-2">Cart</button> {/* Style the "Cart" button */}
            <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Shopping</button> {/* Style the "Shopping" button */}
          </div>
        ),
      });
      
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };


  return (
    <div>
    <Header />
    <div className='m-4 grid grid-cols-1 md:grid-cols-3 gap-4'>
      <div className='col-span-1'>
      <div className="bg-gray-100 p-4 rounded-lg mb-4 ">
        {/* Brand filter checkboxes */}
        <h4 className="text-lg font-semibold mb-2">Filter by Brand:</h4>
        {products.length > 0 && (
          <div>
            {Array.from(new Set(products.map(product => product.brand))).map(brand => (
              <div key={brand} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-indigo-600"
                  id={brand}
                  value={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandCheckboxChange(brand)}
                />
                <label className="ml-2 text-sm" htmlFor={brand}>
                  {brand}
                </label>
              </div>
            ))}
          </div>
        )}
        {/* Search by price section */}
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h5 className="text-lg font-semibold mb-2">Search by price</h5>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col">
              <label className="text-sm">
                Minimum Price:
                <input type="number" className="form-input mt-1" value={minPrice} onChange={e => setMinPriceWithInputField(e)} />
              </label>
              <label className="text-sm">
                Maximum Price:
                <input type="number" className="form-input mt-1" value={maxPrice} onChange={e => setMaxPriceWithInputField(e)} />
              </label>
            </div>
           
          </div>
          <div className="mt-4 mb-4 slider-container w-3/5"> {/* Adjust the width as needed */}
              <h3 className="text-lg font-semibold">Price Range</h3>
              <div className="text-sm">${values[0]} - ${values[1]}</div>
              <div className="mt-2">
                <Slider
                  className="w-full"
                  thumbClassName="bg-blue-500 w-6 h-6 rounded-full shadow-md focus:outline-none focus:shadow-outline"
                  trackClassName="h-1 bg-blue-500"
                  min={lowestPrice}
                  max={highestPrice}
                  value={values}
                  onChange={(newValues: number[]) => setValuesAndMinPriceMaxPriceWithSlider(newValues)}
                />
              </div>
            </div>

            <button 
  className="mt-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded" 
  onClick={handleSearch}
>
  Search
</button>        </div>
      </div>
      </div>
      {/* Product listings */}
      <div className='col-span-2 gap-4'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filterProductsByBrand(filteredProducts).map(product => (
            <div key={product.id} className="bg-white rounded-lg p-4 shadow-md">
              <img onClick={() => handleProductClick(product.id)} src={product.image ? `data:image/jpeg;base64,${product.image}` : 'default-image-url'} alt="..." />
              <h3 className="text-lg font-semibold mb-2" onClick={() => handleProductClick(product.id)}>{product.name}</h3>
              <p className="text-gray-700">${product.price}$</p>
              {product.quantity > 0 && <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-4" type="button" onClick={() => handleAddToCartButtonClick(product.id)}>Add to Cart</button>}
              {product.quantity === 0 && <p className='text-red-500'>No more products in stock</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
}

export default SubCategory;
