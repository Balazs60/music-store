import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

interface SubCategory {
    name: string;
    category: string;
    id: string;
}

function Category() {
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const navigate = useNavigate();
    const {category} = useParams();

    console.log(category)


    useEffect(() => {
        fetchSubCategories();
    }, []);

    const fetchSubCategories = () => {
        fetch(`/api/category/${category}/subcategories`, { method: 'GET' })
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
            <h1>{category}</h1>
            <ul>
                {subCategories.map((subCategory, index) => (
                    <li key={index} onClick={() => handleSubCategoryClick(subCategory.id)}>
                        {subCategory.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Category;
