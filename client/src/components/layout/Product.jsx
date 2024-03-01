import React from 'react'
import ReactStars from 'react-rating-stars-component'
import './product.css';
import { useNavigate } from 'react-router-dom';


const options={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth<600?20:25,
    value:4.5,
    isHalf:true,
};

const Product = ({product}) => {
  const navigate=useNavigate();
  return (
    <a className='productCard' onClick={()=>{navigate("/productdetails",{state:{id:product._id}})}}>
    <img src={product.images[0].url} alt={product.name}/>
    <p>{product.name}</p>
    <div>
        <ReactStars {...options}/>
        <span className="productCardSpan">
          (256 Reviews)
        </span>
    </div>
    <span className='mrp'>MRP <s>{`₹${product.mrp}`}</s><span>{Math.ceil((product.mrp-product.price)/product.mrp*100)}% off</span></span>
    
    <span className='price'>{`₹${product.price}`}</span> 
    </a>
  )
}

export default Product