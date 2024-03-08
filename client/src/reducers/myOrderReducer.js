import { createSlice } from "@reduxjs/toolkit";

export const myOrderReducer = createSlice(
    { name:'myorder',
       initialState:{
        myOrders:[]
       },
       reducers:{
        MY_ORDERS_REQUEST(state){
        return{
            ...state,
            loading:true
            };
          },
        MY_ORDERS_SUCCESS(state,action){
            return{
            ...state,
            loading:false,
            myOrders:action.payload
            }
          },
        MY_ORDERS_FAIL(state,action){
            return{
            loading:true,
            error:action.payload
            }
          },
          CLEAR_MOERRORS:(state)=>{
            return{
            ...state,
            error:null
            }
          }
      }
    })
        export const {MY_ORDERS_FAIL,MY_ORDERS_REQUEST,MY_ORDERS_SUCCESS,CLEAR_MOERRORS}=myOrderReducer.actions
        export default myOrderReducer.reducer