import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Upload: React.FC = () => {
  interface SubCategory {
    name: string;
    category: string;
    id: string;
    image: string;
  }

  const [product, setProduct] = useState({
    id: '',
    brand: '',
    subCategoryId: '',
    name: '',
    price: 0,
    color: '',
    dtype: '',
    numberOfStrings: 0,
    numberOfSoundLayers: 0,
    numberOfKeys: 0,
    diameter: 0,
    image: '',
    discount: 0,
    quantity: 0,
    getDiscountPrice: () => 0,
  });

  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [category, setCategory] = useState("");

  const categories = ['Guitar', 'PercussionInstrument', 'KeyboardInstrument', 'WindInstrument', 'Bass', 'SoundTechnic', 'Merch'];

  useEffect(() => {
    if (category) {
      fetchSubCategories();
    }
  }, [category]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setProduct((prevProduct) => ({
            ...prevProduct,
            image: reader.result as string,
          }));
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const fetchSubCategories = () => {
    const token = localStorage.getItem("token");
    const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

    fetch(`/api/category/${category}/subcategories`, {
      method: 'GET',
      headers: headers
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setSubCategories(data);
      })
      .catch(error => {
        console.error('Error fetching instruments:', error);
      });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setProduct(prevProduct => ({
      ...prevProduct,
      dtype: selectedCategory,
    }));
    console.log(`Selected Category: ${selectedCategory}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    product.id = uuidv4();
    console.log(JSON.stringify(product));
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      const response = await fetch('/api/product/newproduct', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log('Product created successfully');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto mt-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Brand:</label>
        <input type="text" className="form-input mt-1 block w-full border border-gray-300" name="brand" value={product.brand} onChange={handleInputChange} />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Category:</label>
        <select className="form-select mt-1 block w-full border border-gray-300" name="Category" value={product.dtype} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Subcategory:</label>
        <select className="form-select mt-1 block w-full border border-gray-300" name="subCategoryId" value={product.subCategoryId} onChange={handleInputChange}>
          <option value="">Select Subcategory</option>
          {subCategories.map(subCategory => (
            <option key={subCategory.id} value={subCategory.id}>
              {subCategory.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name:</label>
        <input type="text" className="form-input mt-1 block w-full border border-gray-300" name="name" value={product.name} onChange={handleInputChange} />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Price:</label>
        <input type="number" className="form-input mt-1 block w-full border border-gray-300" name="price" value={product.price} onChange={handleInputChange} />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Quantity:</label>
        <input type="number" className="form-input mt-1 block w-full border border-gray-300" name="quantity" value={product.quantity} onChange={handleInputChange} />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Color:</label>
        <input type="text" className="form-input mt-1 block w-full border border-gray-300" name="color" value={product.color} onChange={handleInputChange} />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Image:</label>
        <input type="file" className="form-input mt-1 block w-full border border-gray-300" name="image" onChange={handleImageChange} />
      </div>
      <button type="submit" className="mb-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
        Create Product
      </button>
    </form>
  );
};

export default Upload;
