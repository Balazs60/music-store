import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import React from 'react';
import SubCategory from './SubCategory';



interface SubCategory {
    name: string;
    category: string;
    id: string;
    image: string;
}

function Category() {
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const navigate = useNavigate();
    const {category} = useParams();

    console.log(category)


    useEffect(() => {
        fetchSubCategories();
    }, [category]);

    const fetchSubCategories = () => {
        const token = localStorage.getItem("token");

        const headers: Record<string, string> = token
        ? { Authorization: `Bearer ${token}` }
        : {};
        
        fetch(`/api/category/${category}/subcategories`, {  
                 method: 'GET', headers: headers
    })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                setSubCategories(data);
            })
            .catch(error => {
                console.error('Error fetching instruments:', error);
            });
    };

    const handleSubCategoryClick = (id: string) => {
        navigate(`subcategory/${id}`);
    };

    return (
        <div>
          <Header/>
            <div>
              <div className='grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gird-cols-4 gap-4 m-4 '>
                {subCategories.map((subcategory,index) => (
                  <div key={index} className='bg-gray-100 rounded-lg p-4 shadow md'>
                                      <img className="card-img-top" onClick={() => handleSubCategoryClick(subcategory.id)} src={subcategory.image ? `data:image/jpeg;base64,${subcategory.image}` : 'default-image-url'} alt="..." />
                                      <h5 className="text-lg font semibold mb2 text-center mt-4" onClick={() => handleSubCategoryClick(subcategory.id)}>{subcategory.name}</h5>
                  </div>
                ))}
              </div>
            </div>
        </div>
    );
}

export default Category;
