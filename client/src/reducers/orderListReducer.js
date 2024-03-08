import { createSlice } from "@reduxjs/toolkit";

export const orderListReducer = createSlice(
    { name:'orders',
       initialState:{
        Orders:[]
       },
       reducers:{
        
        ADMIN_ORDERS_REQUEST(state){
            return{
                ...state,
                loading:true
                };
              },
            ADMIN_ORDERS_SUCCESS(state,action){
                return{
                ...state,
                loading:false,
                Orders:action.payload.orders
                }
              },
            ADMIN_ORDERS_FAIL(state,action){
                return{
                loading:true,
                error:action.payload
                }
             },
             CLEAR_AOERRORS:(state)=>{
                return{
                ...state,
                error:null
                }
              }
      }
    })
        export const {ADMIN_ORDERS_FAIL,ADMIN_ORDERS_REQUEST,ADMIN_ORDERS_SUCCESS,CLEAR_AOERRORS}=orderListReducer.actions
        export default orderListReducer.reducer