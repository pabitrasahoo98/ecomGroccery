import axios from "axios";
import { CLEAR_OERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS } from "../reducers/orderReducer";
import {MY_ORDERS_FAIL,MY_ORDERS_REQUEST,MY_ORDERS_SUCCESS,CLEAR_MOERRORS} from "../reducers/myOrderReducer"
import { ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS ,CLEAR_ODERRORS} from "../reducers/orderDetailsReducer";
//create order
export const createOrder=(order)=>async(dispatch)=>{

    try {
        dispatch(CREATE_ORDER_REQUEST())
        const config={headers:{"Content-Type":"application/json"},withCredentials:true}
        const {data}=await axios.post(`http://localhost:4000/api/v1/order/new`,order,config);
        dispatch(CREATE_ORDER_SUCCESS(data));
        
    } catch (error) {
    dispatch(CREATE_ORDER_FAIL(error.response.data.message))
    }

}
//clear orderErrors
export const clearOErrors =() =>
async (dispatch) => {
  dispatch( CLEAR_OERRORS());
};

//myOrders

export const myOrder=()=>async(dispatch)=>{

  try {
      dispatch(MY_ORDERS_REQUEST())
      const {data}=await axios.get(`http://localhost:4000/api/v1/orders/me`,{withCredentials:true});
      dispatch(MY_ORDERS_SUCCESS(data.orders));
      
  } catch (error) {
  dispatch(MY_ORDERS_FAIL(error.response.data.message))
  }

}
//clear orderErrors
export const clearMOErrors =() =>
async (dispatch) => {
dispatch( CLEAR_MOERRORS());
};

//orderDetails


export const getOrderDetails=(id)=>async(dispatch)=>{

  try {
      dispatch(ORDER_DETAILS_REQUEST())
      const {data}=await axios.get(`http://localhost:4000/api/v1/order/${id}`,{withCredentials:true});
      dispatch(ORDER_DETAILS_SUCCESS(data.order));
      
  } catch (error) {
  dispatch(ORDER_DETAILS_FAIL(error.response.data.message))
  }

}
//clear orderdetails Errors
export const clearODErrors =() =>
async (dispatch) => {
dispatch( CLEAR_ODERRORS());
};
