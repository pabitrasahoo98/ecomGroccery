import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { Button, Typography } from '@mui/material'
import "./ProcessOrder.css"
import { useSelector, useDispatch } from "react-redux";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { clearODErrors, clearUOErrors, getOrderDetails,updateOrder} from '../../../actions/orderAction'
import Loader from '../Loader';
import { UPDATE_ORDER_RESET } from '../../../reducers/manipulateOrderReducer';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


const ProcessOrder = ({role}) => {
    const [status, setStatus] = useState("");
    const navigate=useNavigate();
    const {id}=useParams();
    const dispatch=useDispatch();
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdate } = useSelector((state) => state.maniOrder);
    useEffect(() => {
        if (error) {
          Swal.fire({
            title: "Error",
            text: error,
            icon: "warning"
          })
            dispatch(clearODErrors());
          }
          if (updateError) {
            Swal.fire({
              title: "Error",
              text: updateError,
              icon: "warning"
            })
            dispatch(clearUOErrors());
          }
          if (isUpdate) {
            Swal.fire({
              title: "Success",
              text: "Order updated Successfully",
              icon: "success"
            })
            dispatch(UPDATE_ORDER_RESET());
            navigate("/admin/orders")
          }
      
        dispatch(getOrderDetails(id));
    }, [dispatch,error,updateError,isUpdate,Swal,navigate])
    
    const updateOrderSubmitHandler=(e)=>{
        e.preventDefault();
        
        const myForm = new FormData();

        myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
    }
  return (
    <Layout>
    {(role==="admin")?
   <> 
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
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
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <a  onClick={()=>{navigate("/productdetails",{state:{id:item.product}})}}>
                            {item.name}
                          </a>{" "}
                          <span>
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
    
   </>
   :<h3>You are not Authorised</h3>}</Layout>
  )
}

export default ProcessOrder