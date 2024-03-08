import { createSlice } from "@reduxjs/toolkit";

export const manipulateProductReducer = createSlice(
    { name:'MProduct',
       initialState:{
        isDeleted:false,
        isUpdate:false,
        loading:false,
        error:null
       },
       reducers:{
        DELETE_PRODUCT_REQUEST(state){
        return{
            ...state,
            loading:true
            };
          },
        DELETE_PRODUCT_SUCCESS(state,action){
            return{
            ...state,
            loading:false,
            isDeleted:action.payload.success
            }
          },
        DELETE_PRODUCT_RESET(state,action){
            return{
              ...state,
              isDeleted:false,
            }
           
          },
        DELETE_PRODUCT_FAIL(state,action){
            return{
            loading:false,
            error:action.payload
            }
          },
          CLEAR_DPERRORS:(state)=>{
            return{
            ...state,
            error:null
            }
          },
          
        UPDATE_PRODUCT_REQUEST(state){
          return{
              ...state,
              loading:true
              };
            },
          UPDATE_PRODUCT_SUCCESS(state,action){
              return{
              ...state,
              loading:false,
              isUpdate:action.payload
              }
            },
          UPDATE_PRODUCT_RESET(state,action){
              return{
                ...state,
                isUpdate:false,
              }
             
            },
          UPDATE_PRODUCT_FAIL(state,action){
              return{
              loading:false,
              error:action.payload
              }
            },
            CLEAR_UPERRORS:(state)=>{
              return{
              ...state,
              error:null
              }
            }
        }
    })
        export const {DELETE_PRODUCT_FAIL,DELETE_PRODUCT_REQUEST,DELETE_PRODUCT_SUCCESS,DELETE_PRODUCT_RESET,CLEAR_DPERRORS,UPDATE_PRODUCT_FAIL,UPDATE_PRODUCT_REQUEST,UPDATE_PRODUCT_RESET,UPDATE_PRODUCT_SUCCESS,CLEAR_UPERRORS}=manipulateProductReducer.actions
        export default manipulateProductReducer.reducer