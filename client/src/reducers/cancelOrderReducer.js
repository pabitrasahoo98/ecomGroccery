import { createSlice } from "@reduxjs/toolkit";

export const cancelOrderReducer = createSlice(
    { name:'COrder',
       initialState:{
        isCanceled:false,
        loading:false,
        error:null
       },
       reducers:{
        CANCEL_ORDER_REQUEST(state){
        return{
            ...state,
            loading:true
            };
          },
        CANCEL_ORDER_SUCCESS(state,action){
        return{
            ...state,
            loading:false,
            isCanceled:action.payload
            }
          },
        CANCEL_ORDER_RESET(state,action){
            return{
              ...state,
              isCanceled:false,
            }
           
          },
        CANCEL_ORDER_FAIL(state,action){
            return{
            loading:false,
            error:action.payload
            }
          },
          CLEAR_COERRORS:(state)=>{
            return{
            ...state,
            error:null
            }
          }
        }
    })
        export const {CANCEL_ORDER_FAIL,CANCEL_ORDER_REQUEST,CANCEL_ORDER_SUCCESS,CANCEL_ORDER_RESET,CLEAR_COERRORS}=cancelOrderReducer.actions
        export default cancelOrderReducer.reducer