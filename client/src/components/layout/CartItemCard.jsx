import React from 'react'
import "./CartItemCard.css";
import {useNavigate } from 'react-router-dom';

const CartItemCard = ({item,deleteCartItems}) => {
  const navigate=useNavigate();
  return (
    <div className="CartItemCard">
    <img src={item.image} alt="ssa" />
    <div>
      <a  onClick={()=>{navigate("/productdetails",{state:{id:item.product}})}}>{item.name}</a>
      <span>{`Price: ₹${item.price}`}</span>
      <p onClick={()=>deleteCartItems(item.product)}>Remove</p>
    </div>
  </div>
  )
}

export default CartItemCard