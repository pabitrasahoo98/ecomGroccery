import { createSlice } from "@reduxjs/toolkit";


export const forgotPasswordReducer = createSlice(
    { name:'forgotPassword',
       initialState:{
        message:false,
        loading:false,
        error:null
       },
       reducers:{
          FORGOT_PASSWORD_REQUEST(state){
            state.loading= true;
            state.message=false;
            state.error=null;
          },
        FORGOT_PASSWORD_SUCCESS(state,action){
            state.loading=false;
            state.message=action.payload;
            state.error=null;
          },
        FORGOT_PASSWORD_FAIL(state,action){
            state.loading=false;
            state.message=false;
            state.error=action.payload;
          },
        CLEAR_FPERRORS:(state)=>{
            state.error=null;
          }
       }
  
    }
  );
  export const {FORGOT_PASSWORD_FAIL,FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_SUCCESS,CLEAR_FPERRORS}=forgotPasswordReducer.actions
  export default forgotPasswordReducer.reducer