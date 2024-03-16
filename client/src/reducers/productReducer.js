import { createSlice } from "@reduxjs/toolkit";

export const productsReducer = createSlice(
    { name:'products',
       initialState:{
        product:[],
        loading:false,
        error:null
       },
       reducers:{
        ALL_PRODUCT_REQUEST(state){
            state.loading= true;
            state.product=[];
          },
        ADMIN_PRODUCT_REQUEST(state){
            state.loading= true;
            state.product=[];
          },
        
        ALL_PRODUCT_SUCCESS(state,action){
            state.loading=false;
            state.product=action.payload.products;
            state.resultPerPage=action.payload.resultPerPage;
            state.productsCount=action.payload.productCount;
            state.filteredProductsCount=action.payload.filteredProductsCount;
          },
        ADMIN_PRODUCT_SUCCESS(state,action){
          state.loading=false;
          state.product=action.payload.products;
          },
        ALL_PRODUCT_FAIL(state,action){
            state.loading=false;
            state.error=action.payload;
          },
        ADMIN_PRODUCT_FAIL(state,action){
            state.loading=false;
            state.error=action.payload;
        },
    
        CLEAR_ERRORS:(state)=>{
            state.error=null;
          }
       } 

    }
);
export const {ALL_PRODUCT_FAIL,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,ADMIN_PRODUCT_REQUEST,ADMIN_PRODUCT_SUCCESS,ADMIN_PRODUCT_FAIL,CLEAR_ERRORS}=productsReducer.actions
export default productsReducer.reducer

