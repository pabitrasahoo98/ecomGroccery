import { createSlice } from "@reduxjs/toolkit";


export const forgotPasswordReducer = createSlice(
    { name:'forgotPassword',
       initialState:{
        isSent:false,
        message:false,
        loading:false,
        error:null
       },
       reducers:{
          FORGOT_PASSWORD_REQUEST(state){
            state.loading= true;
            state.isSent=false;
            state.message=false;
            state.error=null;
          },
        FORGOT_PASSWORD_SUCCESS(state,action){
            state.loading=false;
            state.message=action.payload.messege;
            state.isSent=action.payload.success;
            state.error=null;
          },
        FORGOT_PASSWORD_FAIL(state,action){
            state.loading=false;
            state.message=false;
            state.isSent=false;
            state.error=action.payload;
          },
          FORGOT_PASSWORD_RESET(state,action){
            state.loading=false;
            state.message=false;
            state.isSent=false;
            state.error=null;
          },
        CLEAR_FPERRORS:(state)=>{
            state.error=null;
          }
       }
  
    }
  );
  export const {FORGOT_PASSWORD_FAIL,FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_RESET,CLEAR_FPERRORS}=forgotPasswordReducer.actions
  export default forgotPasswordReducer.reducer