import { createSlice } from "@reduxjs/toolkit";

export const addProductReducer = createSlice(
    { name:'AddProduct',
       initialState:{
        Addproduct:{},
        success:false,
        loading:false,
        error:null
       },
       reducers:{
        ADD_PRODUCT_REQUEST(state){
        return{
            ...state,
            loading:true
            };
          },
        ADD_PRODUCT_SUCCESS(state,action){
            return{
            ...state,
            loading:false,
            success:action.payload.success,
            Addproduct:action.payload.product
            }
          },
        ADD_PRODUCT_RESET(state,action){
            return{
              ...state,
              success:false,
            }
           
          },
        ADD_PRODUCT_FAIL(state,action){
            return{
            loading:false,
            error:action.payload
            }
          },
          CLEAR_NPERRORS:(state)=>{
            return{
            ...state,
            error:null
            }
          }
        }
    })
        export const {ADD_PRODUCT_FAIL,ADD_PRODUCT_REQUEST,ADD_PRODUCT_SUCCESS,ADD_PRODUCT_RESET,CLEAR_NPERRORS}=addProductReducer.actions
        export default addProductReducer.reducer