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
    numberOfKeys: number;
    diameter: number;

}

function SubCategory() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [minPrice, setMinPrice] = useState<string | ''>('');
    const [maxPrice, setMaxPrice] = useState<string | ''>('');
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])
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
                setFilteredProducts(data);
            })
            .catch(error => {
                console.error('Error fetching instruments:', error);
            });
    };

    function filterProductsByPrice() {
        let min = minPrice === '' ? 0 : parseFloat(minPrice);
        let max = maxPrice === '' ? Number.MAX_SAFE_INTEGER : parseFloat(maxPrice);
        let filteredProducts = products.filter(product => product.price >= min && product.price <= max);
        return filteredProducts
    }

    function filterProductsByBrand(products : product[]){
if(selectedBrands.length === 0){
    return products
} else {
    let filteredProducts = products.filter(product => selectedBrands.includes(product.brand))
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

    const handleProductClick = (id: string) => {
        navigate(`/product/${id}`);
    };


    return (
        <div>
            <div>
                <label>Filter by Brand:</label>
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
            </div>
            <div>
                <label>
                    Minimum Price:
                    <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                </label>
                <label>
                    Maximum Price:
                    <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                </label>
                <button onClick={handleSearch}>Search</button>
            </div>
            <ul>
                {filterProductsByBrand(filteredProducts).map((product, index) => (
                    <li key={index} onClick={() => handleProductClick(product.id)}>
                        Name: {product.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SubCategory;
