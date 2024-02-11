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
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label className="form-label">Brand:</label>
        <input type="text" className="form-control" name="brand" value={product.brand} onChange={handleInputChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Category:</label>
        <select className="form-select" name="Category" value={product.dtype} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Subcategory:</label>
        <select className="form-select" name="subCategoryId" value={product.subCategoryId} onChange={handleInputChange}>
          <option value="">Select Subcategory</option>
          {subCategories.map(subCategory => (
            <option key={subCategory.id} value={subCategory.id}>
              {subCategory.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Name:</label>
        <input type="text" className="form-control" name="name" value={product.name} onChange={handleInputChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Price:</label>
        <input type="number" className="form-control" name="price" value={product.price} onChange={handleInputChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Quantity:</label>
        <input type="number" className="form-control" name="quantity" value={product.quantity} onChange={handleInputChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Color:</label>
        <input type="text" className="form-control" name="color" value={product.color} onChange={handleInputChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Image:</label>
        <input type="file" className="form-control" name="image" onChange={handleImageChange} />
      </div>
      <button type="submit" className="btn btn-primary">Create Product</button>
    </form>
  );
};

export default Upload;
