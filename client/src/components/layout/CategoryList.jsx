import React from 'react';
import CategoryCard from './CategoryCard.jsx';
import { useSelector } from 'react-redux';
import './CategoryCard.css';

const CategoryList = () => {

    const {catalog}=useSelector((state)=>state.catagories)
return (
    

    <div className="category_container">
      {catalog.map((category,index) => (
        <CategoryCard key={index} category={category} />
      ))}
    </div>
    


  )
}

export default CategoryList