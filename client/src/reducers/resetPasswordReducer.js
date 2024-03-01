import { createSlice } from "@reduxjs/toolkit";


export const resetPasswordReducer = createSlice(
    { name:'resetPassword',
       initialState:{
        success:false,
        loading:false,
        error:null
       },
       reducers:{
          RESET_PASSWORD_REQUEST(state){
            state.loading= true;
            state.success=false;
            state.error=null;
          },
        RESET_PASSWORD_SUCCESS(state,action){
            state.loading=false;
            state.success=action.payload;
            state.error=null;
          },
        RESET_PASSWORD_FAIL(state,action){
            state.loading=false;
            state.success=false;
            state.error=action.payload;
          },
        CLEAR_RPERRORS:(state)=>{
            state.error=null;
          }
       }
  
    }
  );
  export const {RESET_PASSWORD_FAIL,RESET_PASSWORD_REQUEST,RESET_PASSWORD_SUCCESS,CLEAR_RPERRORS}=resetPasswordReducer.actions
  export default resetPasswordReducer.reducer