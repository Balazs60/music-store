import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import React from 'react';



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
            <h1>{category}</h1>
            <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {subCategories.map((subcategory, index) => (
              <div key={index} className="col mb-5">
                <div className="card h-100">
                  <img className="card-img-top" onClick={() => handleSubCategoryClick(subcategory.id)} src={subcategory.image ? `data:image/jpeg;base64,${subcategory.image}` : 'default-image-url'} alt="..." />
                  <div className="card-body p-4">
                    <div className="text-center">
                      <h5 className="fw-bolder" onClick={() => handleSubCategoryClick(subcategory.id)}>{subcategory.name}</h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
            {/* <ul>
                {subCategories.map((subCategory, index) => (
                    <li key={index} onClick={() => handleSubCategoryClick(subCategory.id)}>
                        {subCategory.name}
                    </li>
                ))}
            </ul> */}
        </div>
    );
}

export default Category;
