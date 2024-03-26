import axios from "axios";
import { CLEAR_OERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS } from "../reducers/orderReducer";
import {MY_ORDERS_FAIL,MY_ORDERS_REQUEST,MY_ORDERS_SUCCESS,CLEAR_MOERRORS} from "../reducers/myOrderReducer"
import { ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS ,CLEAR_ODERRORS} from "../reducers/orderDetailsReducer";
import { CLEAR_DOERRORS, CLEAR_UOERRORS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS } from "../reducers/manipulateOrderReducer";
import { ADMIN_ORDERS_FAIL ,ADMIN_ORDERS_REQUEST, ADMIN_ORDERS_SUCCESS,CLEAR_AOERRORS} from "../reducers/orderListReducer";
import { CANCEL_ORDER_FAIL, CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, CLEAR_COERRORS } from "../reducers/cancelOrderReducer";
//create order
export const createOrder=(order)=>async(dispatch)=>{

    try {
        dispatch(CREATE_ORDER_REQUEST())
        const config={headers:{"Content-Type":"application/json"},withCredentials:true}
        const {data}=await axios.post(`http://localhost:4000/api/v1/order/new`,order,config);
        dispatch(CREATE_ORDER_SUCCESS(data));
        localStorage.removeItem('cartItems');
        
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


 //get  orders--admin
 export const getAdminOrders =() =>
 async (dispatch) => {
   try {
     dispatch(ADMIN_ORDERS_REQUEST());
 
     let link = `http://localhost:4000/api/v1/admin/orders`;
 
     const { data } = await axios.get(link,{withCredentials:true});
 
     dispatch(ADMIN_ORDERS_SUCCESS(data)); 
     
   } catch (error) {
     dispatch(ADMIN_ORDERS_FAIL(error.response.data.message));
   }
 };

 export const clearAOErrors =() =>
async (dispatch) => {
dispatch( CLEAR_AOERRORS());
};


 //delete orders--admin
 export const deleteOrder=(id)=>async(dispatch)=>{

   try {
       dispatch(DELETE_ORDER_REQUEST())
       const config={headers:{"Content-Type":"application/json"},withCredentials:true}
       const {data}=await axios.delete(`http://localhost:4000/api/v1/admin/order/${id}`,config);
       dispatch(DELETE_ORDER_SUCCESS(data.success));
       
   } catch (error) {
   dispatch(DELETE_ORDER_FAIL(error.response.data.message))
   }
 
 }
  //clear dELETE Order error
  export const clearDOErrors =() =>
  async (dispatch) => {
  dispatch( CLEAR_DOERRORS());
  };


  //update products--admin
  export const updateOrder=(id,orderData)=>async(dispatch)=>{

   try {
       dispatch(UPDATE_ORDER_REQUEST())
       const config={headers:{"Content-Type":"application/json"},withCredentials:true}
       const {data}=await axios.put(`http://localhost:4000/api/v1/admin/order/${id}`,orderData,config);
       dispatch(UPDATE_ORDER_SUCCESS(data.success));
       
   } catch (error) {
   dispatch(UPDATE_ORDER_FAIL(error.response.data.message))
   }
 
 }

  //clear update Product error
  export const clearUOErrors =() =>
  async (dispatch) => {
  dispatch( CLEAR_UOERRORS());

  };

   //cancel orders--user
 export const cancelOrder=(id)=>async(dispatch)=>{

  try {
      dispatch(CANCEL_ORDER_REQUEST())
      const config={headers:{"Content-Type":"application/json"},withCredentials:true}
      const {data}=await axios.delete(`http://localhost:4000/api/v1/cancelorder/${id}`,config);
      dispatch(CANCEL_ORDER_SUCCESS(data.success));
      
  } catch (error) {
  dispatch(CANCEL_ORDER_FAIL(error.response.data.message))
  }

}
 //clear CANCEL Order error
 export const clearCOErrors =() =>
 async (dispatch) => {
 dispatch( CLEAR_COERRORS());
 };