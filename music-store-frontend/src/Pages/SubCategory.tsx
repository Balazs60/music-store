import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slider';
import '../musicStore.css'
import Header from './Header';
import { confirmAlert } from 'react-confirm-alert';
import Product from './Product';
import React, { useState, useEffect } from 'react';
import './src/output.css'




// interface Product {
//     id: string;
//     name: string;
//     color: string;
//     price: number;
//     brand: string;
//     dtype: string;
//     subCategoryId: string;
//     numberOfStrings: number;
//     numberOfSoundLayers: number;
//     numberOfKeys: number;
//     diameter: number;
//     image:string
// }


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
          },
          {
            label: 'Shopping',
          },
        ],
        customUI: ({ onClose }) => (
          <div className="custom-ui">
            <h1>Product added to the cart</h1>
            <p>Move to the cart or continue shopping?</p>
            <button onClick={() => { onClose(); navigate("/cart"); }}>Cart</button>
            <button onClick={onClose}>Shopping</button>
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
      <div className='subcategory'>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className='filter-section'>
                <div className='box'>
                  <h5>Filter by Brand:</h5>
                  {Array.from(new Set(products.map(product => product.brand))).map(brand => (
                    <div key={brand}>
                      <input
                        type="checkbox"
                        value={brand}
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandCheckboxChange(brand)}
                      />
                      {brand}
                    </div>
                  ))}
                  <h5>Search by price</h5>
                  <label>
                    Minimum Price:
                    <input type="number" value={minPrice} onChange={e => setMinPriceWithInputField(e)} />
                  </label>
                  <label>
                    Maximum Price:
                    <input type="number" value={maxPrice} onChange={e => setMaxPriceWithInputField(e)} />
                  </label>
                  <h3>Price <span>Range</span></h3>
                  <div>${values[0]}-${values[1]}</div>
                  <Slider className={'slider'}
                    onChange={(newValues: number[]) => setValuesAndMinPriceMaxPriceWithSlider(newValues)}
                    value={values}
                    min={lowestPrice}
                    max={highestPrice} />
                </div>
                <button onClick={handleSearch}>Search</button>
              </div>
            </div>
            <div className="col-lg-8">
              <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                  <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {filterProductsByBrand(filteredProducts).map((product, index) => (
                      <div key={index} className="col mb-5 product-card">
                        <div className="card h-100">
                          <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>
                            Sale
                          </div>
                          <img className="card-img-top" onClick={() => handleProductClick(product.id)} src={product.image ? `data:image/jpeg;base64,${product.image}` : 'default-image-url'} alt="..." />
                          <div className="card-body p-4">
                            <div className="text-center">
                              <h5 className="fw-bolder" onClick={() => handleProductClick(product.id)}>{product.name}</h5>
                              {product.price}$
                            </div>
                          </div>
                          <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div className="text-center">
                              {product.quantity > 0 && <button className="btn btn-outline-dark mt-auto" type="button" onClick={() => handleAddToCartButtonClick(product.id)}>Add to cart</button>}
                              {product.quantity === 0 && <p style={{ color: 'red' }}>No more products in stock</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubCategory;
