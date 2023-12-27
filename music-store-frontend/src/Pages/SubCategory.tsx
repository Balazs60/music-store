import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slider';
import '../musicStore.css'

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
    const [minPrice, setMinPrice] = useState<number | ''>(0);
    const [maxPrice, setMaxPrice] = useState<number | ''>(0);
    const [lowestPrice, setLowestPrice] = useState<number>(0);
    const [highestPrice, setHighestPrice] = useState<number>(0);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])
    const { category, subcategoryid } = useParams();
    const [values, setValues] = useState([lowestPrice,highestPrice])
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


    function filterProductsByBrand(products : Product[]){
if(selectedBrands.length === 0){
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

   function setValuesAndMinPriceMaxPriceWithSlider(newValues : number[]){
    const [min, max] = newValues
    setMinPrice(min)
    setMaxPrice(max)
    setValues(newValues)
    }

    function setMinPriceWithInputField(e: React.ChangeEvent<HTMLInputElement>){
setMinPrice(parseFloat(e.target.value))
setValues([parseFloat(e.target.value),values[1]])

    }

    function setMaxPriceWithInputField(e: React.ChangeEvent<HTMLInputElement>){
        setMaxPrice(parseFloat(e.target.value))
        setValues([values[0],parseFloat(e.target.value)])

    }

   

    const handleProductClick = (id: string) => {
        navigate(`/product/${id}`);
    };


    return (
        <div className='subcategory'>
            <div className='filter-section'>
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
            <div className='box'>
                <label>
                    Minimum Price:
                    <input type="number" value={minPrice}  onChange={e => setMinPriceWithInputField(e)} />
                </label>
                <label>
                    Maximum Price:
                    <input type="number" value={maxPrice} onChange={e => setMaxPriceWithInputField(e)} />
                </label>
                <div>
                </div>
                <h3>Price <span>Range</span></h3>
                <div>${values[0]}-${values[1]}</div>
            <Slider className={'slider'}
            onChange={(newValues: number[]) => setValuesAndMinPriceMaxPriceWithSlider(newValues)}
            value={values}
                min={lowestPrice} 
                max={highestPrice}/>
            </div>
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
