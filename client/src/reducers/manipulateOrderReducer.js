import { createSlice } from "@reduxjs/toolkit";

export const manipulateOrderReducer = createSlice(
    { name:'MOrder',
       initialState:{
        isDeleted:false,
        isUpdate:false,
        loading:false,
        error:null
       },
       reducers:{
        DELETE_ORDER_REQUEST(state){
        return{
            ...state,
            loading:true
            };
          },
        DELETE_ORDER_SUCCESS(state,action){
            return{
            ...state,
            loading:false,
            isDeleted:action.payload
            }
          },
        DELETE_ORDER_RESET(state,action){
            return{
              ...state,
              isDeleted:false,
            }
           
          },
        DELETE_ORDER_FAIL(state,action){
            return{
            loading:false,
            error:action.payload
            }
          },
          CLEAR_DOERRORS:(state)=>{
            return{
            ...state,
            error:null
            }
          },
          
        UPDATE_ORDER_REQUEST(state){
          return{
              ...state,
              loading:true
              };
            },
          UPDATE_ORDER_SUCCESS(state,action){
              return{
              ...state,
              loading:false,
              isUpdate:action.payload
              }
            },
          UPDATE_ORDER_RESET(state,action){
              return{
                ...state,
                isUpdate:false,
              }
             
            },
          UPDATE_ORDER_FAIL(state,action){
              return{
              loading:false,
              error:action.payload
              }
            },
            CLEAR_UOERRORS:(state)=>{
              return{
              ...state,
              error:null
              }
            }
        }
    })
        export const {DELETE_ORDER_FAIL,DELETE_ORDER_REQUEST,DELETE_ORDER_SUCCESS,DELETE_ORDER_RESET,CLEAR_DOERRORS,UPDATE_ORDER_FAIL,UPDATE_ORDER_REQUEST,UPDATE_ORDER_RESET,UPDATE_ORDER_SUCCESS,CLEAR_UOERRORS}=manipulateOrderReducer.actions
        export default manipulateOrderReducer.reducer