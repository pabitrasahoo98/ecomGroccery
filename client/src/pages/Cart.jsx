import React, { useEffect, useRef } from 'react'
import Layout from '../components/layout/Layout'
import "./Cart.css";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CartItemCard from '../components/layout/CartItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemFromCart } from '../actions/cartAction';
import { Link, useNavigate } from 'react-router-dom';
import ProductSlick from '../components/layout/ProductSlick';


const Cart = () => {

  const targetRef=useRef(null);
  
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {cartItems}=useSelector((state)=>state.cart);
  const{td,tdSuccess}=useSelector((state)=>state.deals);
  useEffect(() => {
    if(targetRef.current){
      targetRef.current.scrollIntoView({behavior:'smooth'});
    }
  }, [])
  

  
  const increaseQuantity=(id,quantity,stock)=>{
    const newQty=quantity+1;
    if(stock<=quantity){
      return;
    }
      dispatch(addItemsToCart(id,newQty))
  }
  const decreaseQuantity=(id,quantity)=>{
    const newQty=quantity-1;
    if(1>=quantity){
      return;
    }
      dispatch(addItemsToCart(id,newQty))
  }
  const deleteCartItems=(id)=>{
    dispatch(removeItemFromCart(id));
  }
  const checkOutHandler=(e)=>{
    e.preventDefault();
    navigate("/login?redirect=shipping");
  }

  return (
    <div ref={targetRef}>
    <Layout>
       <>{cartItems.length===0? <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <h3>No Product in Your Cart</h3>
          <Link to="/products">View Products</Link>
        </div>:<>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {cartItems && cartItems.map((item)=>(
            <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems}/>
                  <div className="cartInput">
                    <button onClick={()=>decreaseQuantity(item.product,item.quantity)}>
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
            </div>))}
            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkOutHandler}>Check Out</button>
              </div>
            </div>
            </div>
            </>}</>
            {tdSuccess && <><h3 className='homeHeading'>Now Trending</h3>
    <ProductSlick prod={td}/></>}
    </Layout>
    </div>
    
  )
}

export default Cart