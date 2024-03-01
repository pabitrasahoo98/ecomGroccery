import { createSlice } from "@reduxjs/toolkit";


export const userUpdateReducer = createSlice(
    { name:'profile',
       initialState:{
        isUpdate:false,
        loading:false,
        error:null
       },
       reducers:{
          UPDATE_PASSWORD_REQUEST(state){
            state.loading= true;
            state.isUpdate=false;
            state.error=null;
          },
        UPDATE_PASSWORD_SUCCESS(state,action){
            state.loading=false;
            state.isUpdate=action.payload;
            state.error=null;
          },
        UPDATE_PASSWORD_FAIL(state,action){
            state.loading=false;
            state.isUpdate=false;
            state.error=action.payload;
          },
        UPDATE_PASSWORD_RESET(state){
            state.loading=false;
            state.isUpdate=false;
            state.error=null;
          },
          UPDATE_PROFILE_REQUEST(state){
            state.loading= true;
            state.isUpdate=false;
            state.error=null;
          },
        UPDATE_PROFILE_SUCCESS(state,action){
            state.loading=false;
            state.isUpdate=action.payload;
            state.error=null;
          },
        UPDATE_PROFILE_FAIL(state,action){
            state.loading=false;
            state.isUpdate=false;
            state.error=action.payload;
          },
        UPDATE_PROFILE_RESET(state,action){
            state.loading=false;
            state.isUpdate=false;
            state.error=null;
          },
    
        CLEAR_PERRORS:(state)=>{
            state.error=null;
          }
       }
  
    }
  );
  export const {UPDATE_PASSWORD_FAIL,UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_SUCCESS,UPDATE_PASSWORD_RESET,UPDATE_PROFILE_FAIL,UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_RESET,CLEAR_PERRORS}=userUpdateReducer.actions
  export default userUpdateReducer.reducer