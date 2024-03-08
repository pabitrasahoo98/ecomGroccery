import { createSlice } from "@reduxjs/toolkit";

export const manipulateUserReducer = createSlice(
    { name:'MUser',
       initialState:{
        isDeleted:false,
        isUpdate:false,
        loading:false,
        error:null
       },
       reducers:{
        DELETE_USER_REQUEST(state){
        return{
            ...state,
            loading:true
            };
          },
        DELETE_USER_SUCCESS(state,action){
            return{
            ...state,
            loading:false,
            isDeleted:action.payload
            }
          },
        DELETE_USER_RESET(state,action){
            return{
              ...state,
              isDeleted:false,
            }
           
          },
        DELETE_USER_FAIL(state,action){
            return{
            loading:false,
            error:action.payload
            }
          },
          CLEAR_DUERRORS:(state)=>{
            return{
            ...state,
            error:null
            }
          },
          
        UPDATE_USER_REQUEST(state){
          return{
              ...state,
              loading:true
              };
            },
          UPDATE_USER_SUCCESS(state,action){
              return{
              ...state,
              loading:false,
              isUpdate:action.payload
              }
            },
          UPDATE_USER_RESET(state,action){
              return{
                ...state,
                isUpdate:false,
              }
             
            },
          UPDATE_USER_FAIL(state,action){
              return{
              loading:false,
              error:action.payload
              }
            },
            CLEAR_UUERRORS:(state)=>{
              return{
              ...state,
              error:null
              }
            }
        }
    })
        export const {DELETE_USER_FAIL,DELETE_USER_REQUEST,DELETE_USER_SUCCESS,DELETE_USER_RESET,CLEAR_DUERRORS,UPDATE_USER_FAIL,UPDATE_USER_REQUEST,UPDATE_USER_RESET,UPDATE_USER_SUCCESS,CLEAR_UUERRORS}=manipulateUserReducer.actions
        export default manipulateUserReducer.reducer