import { createSlice } from "@reduxjs/toolkit";

export const productDetailsReducer = createSlice(
    { name:'product',
       initialState:{
        product:{},
        loading:false,
        error:null
       },
       reducers:{
        PRODUCT_DETAILS_REQUEST:(state)=>{
            state.loading= true;
          },
        PRODUCT_DETAILS_SUCCESS:(state,action)=>{
            state.loading=false;
            state.error=null;
            state.product=action.payload.product;
          },
        PRODUCT_DETAILS_FAIL:(state,action)=>{
            state.loading=false;
            state.product=null;
            state.error=action.payload;
          },
    
        CLEAR_ERRORS:(state)=>{
            state.error=null;
          }
       }
  
    }
  );
  export const {PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,CLEAR_ERRORS}=productDetailsReducer.actions
  export default productDetailsReducer.reducer