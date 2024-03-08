import { createSlice } from "@reduxjs/toolkit";

export const userListReducer = createSlice(
    { name:'Users',
       initialState:{
        Users:[]
       },
       reducers:{
        
        ADMIN_USERS_REQUEST(state){
            return{
                ...state,
                loading:true
                };
              },
            ADMIN_USERS_SUCCESS(state,action){
                return{
                ...state,
                loading:false,
                Users:action.payload
                }
              },
            ADMIN_USERS_FAIL(state,action){
                return{
                loading:true,
                error:action.payload
                }
             },
             CLEAR_AUERRORS:(state)=>{
                return{
                ...state,
                error:null
                }
              }
      }
    })
        export const {ADMIN_USERS_FAIL,ADMIN_USERS_REQUEST,ADMIN_USERS_SUCCESS,CLEAR_AUERRORS}=userListReducer.actions
        export default userListReducer.reducer