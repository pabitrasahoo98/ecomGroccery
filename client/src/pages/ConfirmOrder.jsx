import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Radio, Typography } from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { clearOErrors, createOrder } from "../actions/orderAction";
import Swal from 'sweetalert2'
import { CREATE_ORDER_RESET } from "../reducers/orderReducer";



const ConfirmOrder = () => {
  const dispatch=useDispatch();
  const targetRef=useRef(null);
  const navigate=useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const{error,isplaced}=useSelector((state)=>state.newOrder);
  const [paymentType,setPaymentType]=useState(false);

  useEffect(() => {
    if(targetRef.current){
      targetRef.current.scrollIntoView({behavior:'smooth'});
    }
    if(isplaced){
      dispatch(CREATE_ORDER_RESET());
      navigate("/success");
      window.location.reload();
    }

    if(error){
      Swal.fire({
        title: "Error",
        text: error,
        icon: "warning"
      })
      dispatch(clearOErrors());
    }
  
   
  }, [dispatch,error,Swal,isplaced,navigate])

  
  

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = 0;

  const totalPrice = subtotal + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const order={shippingInfo,orderItems:cartItems,paymentInfo:"COD",itemPrice:subtotal,shippingPrice:shippingCharges,totalPrice}

  const placeOrder = (e) => {
    e.preventDefault();
    dispatch(createOrder(order));
};

  return (
    <div ref={targetRef}>
    <Layout>
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>
                    <span>
                      {item.quantity} X ₹{item.price} =
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>
            <div className="paymentSummary">
            <Typography>Payment Method</Typography>
            <div>
            <Radio 
            sx={{'& .MuiSvgIcon-root': {fontSize: 28,},}}
            value="true"
            name="paymentType"
            onChange={(e)=>setPaymentType(true)}
            checked={paymentType===true}
            
            />
                <CurrencyRupeeIcon/><Typography>Cash On Delivery</Typography>
                
            </div>
            </div>

            <button onClick={placeOrder} disabled={paymentType?false:true}>Place Order</button>
          </div>
        </div>
      </div>
    </Layout>
    </div>
  );
};

export default ConfirmOrder;
