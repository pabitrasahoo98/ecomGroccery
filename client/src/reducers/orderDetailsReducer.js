import { createSlice } from "@reduxjs/toolkit";

export const orderDetailsReducer = createSlice(
    { name:'orderDetails',
       initialState:{
        order:[]
       },
       reducers:{
        ORDER_DETAILS_REQUEST(state){
        return{
            ...state,
            loading:true
            };
          },
        ORDER_DETAILS_SUCCESS(state,action){
            return{
            ...state,
            loading:false,
            order:action.payload
            }
          },
        ORDER_DETAILS_FAIL(state,action){
            return{
            loading:true,
            error:action.payload
            }
          },
          CLEAR_ODERRORS:(state)=>{
            return{
            ...state,
            error:null
            }
          }
        }
    })
        export const {ORDER_DETAILS_FAIL,ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS,CLEAR_ODERRORS}=orderDetailsReducer.actions
        export default orderDetailsReducer.reducer