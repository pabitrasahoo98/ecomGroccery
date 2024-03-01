import React, { useEffect } from 'react'
import "./OrderDetails.css";
import Layout from '../components/layout/Layout';
import { Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearODErrors, getOrderDetails } from '../actions/orderAction';
import Loader from '../components/layout/Loader';


const OrderDetails = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {id}=useParams();
    const {order,loading,error}=useSelector((state)=>state.orderDetails);
    useEffect(() => {
      if(error){
        window.alert(error);
        dispatch(clearODErrors());
      }
      dispatch(getOrderDetails(id));
    }, [dispatch,error])
    

  return (
    <Layout>
        <>{loading?<Loader/>:<>
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo === "COD"
                        ? "redColor"
                        : "greenColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo === "COD"
                      ? "COD"
                      : "PRE PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <a onClick={()=>{navigate("/productdetails",{state:{id:item.product}})}}>
                        {item.name}
                      </a>
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          </>}
        </>
    </Layout>
  )
}

export default OrderDetails