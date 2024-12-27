import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const ProductCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const topCategories = [...categories].sort((a, b) => b.rating - a.rating).slice(0, 5);

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://workintech-fe-ecommerce.onrender.com/categories"
        );
        const data = await response.json();
        setCategories(data); // Assuming the API returns an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  return (
    <div className="flex flex-col items-center" >
      <h2 style={{ marginBottom: "20px" }}>Product Categories</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
        {topCategories.map((category) => (
          <div className="relative group"
            key={category.id}
            
          >
            <img className="w-full h-[300px] object-cover"
              src={category.img}
              alt={category.title}
        
            />
            <div style={{ padding: "10px" }}>
              <h3
                style={{
                  fontSize: "16px",
                  margin: "0 0 10px",
                  fontWeight: "bold",
                }}
              >
                {category.title}
              </h3>
              <p style={{ margin: "0 0 5px", fontSize: "14px" }}>
                Gender: {category.gender === "k" ? "Women" : "Men"}
              </p>
              <p style={{ margin: "0", fontSize: "14px" }}>
                Rating: {category.rating} ★
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategoryList;
