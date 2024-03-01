import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice(
    { name:'user',
       initialState:{
        user:{},
        isAuthenticate:false,
        loading:false,
        error:null
       },
       reducers:{
        LOGIN_REQUEST(state){
            state.loading= true;
            state.isAuthenticate=false;
          },
        LOGIN_SUCCESS(state,action){
            state.loading=false;
            state.isAuthenticate=true;
            state.error=null;
            state.user=action.payload.user;
          },
        LOGIN_FAIL(state,action){
            state.loading=false;
            state.isAuthenticate=false;
            state.user=null;
            state.error=action.payload;
          },
          REGISTER_REQUEST(state){
            state.loading= true;
            state.isAuthenticate=false;
          },
        REGISTER_SUCCESS(state,action){
            state.loading=false;
            state.isAuthenticate=true;
            state.error=null;
            state.user=action.payload;
          },
        REGISTER_FAIL(state,action){
            state.loading=false;
            state.isAuthenticate=false;
            state.user=null;
            state.error=action.payload;
          },
          LOAD_USER_REQUEST(state){
            state.loading= true;
            state.isAuthenticate=false;
          },
        LOAD_USER_SUCCESS(state,action){
            state.loading=false;
            state.isAuthenticate=true;
            state.error=null;
            state.user=action.payload.user;
          },
        LOAD_USER_FAIL(state,action){
            state.loading=false;
            state.isAuthenticate=false;
            state.user=null;
            state.error=action.payload;
          },
        LOGOUT_SUCCESS(state,action){
            state.loading=false;
            state.isAuthenticate=false;
            state.user=null;
            state.error=null;
          },
        LOGOUT_FAIL(state,action){
            state.loading=false;
            state.error=action.payload;
          },
    
        CLEAR_ERRORS:(state)=>{
            state.error=null;
          }
       }
  
    }
  );
  export const {LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS,CLEAR_ERRORS,REGISTER_FAIL, REGISTER_REQUEST,REGISTER_SUCCESS,LOAD_USER_FAIL,LOAD_USER_REQUEST,LOAD_USER_SUCCESS,LOGOUT_SUCCESS,LOGOUT_FAIL}=userReducer.actions
  export default userReducer.reducer