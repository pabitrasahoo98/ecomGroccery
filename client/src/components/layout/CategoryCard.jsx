import React from 'react';
import './CategoryCard.css';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link  to={`/products/category/${category.catagory}`}>
    
    <div className="category-card">
      <img src={category.imgLink} alt={category.name} />
      <h3>{category.catagory}</h3>
    </div>
    
    </Link>
  );
};

export default CategoryCard;
