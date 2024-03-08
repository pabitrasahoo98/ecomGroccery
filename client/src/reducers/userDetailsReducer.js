import { createSlice } from "@reduxjs/toolkit";

export const userDetailsReducer = createSlice(
    { name:'user',
       initialState:{
        user:{},
        loading:false,
        error:null
       },
       reducers:{
        ADMIN_USERD_REQUEST(state){
            state.loading= true;
          },
        ADMIN_USERD_SUCCESS(state,action){
            state.loading=false;
            state.error=null;
            state.user=action.payload.user;
          },
        ADMIN_USERD_FAIL(state,action){
            state.loading=false;
            state.user=null;
            state.error=action.payload;
          },
    
        CLEAR_AUDERRORS:(state)=>{
            state.error=null;
          }
       }
  
    }
  );
  export const {ADMIN_USERD_FAIL,ADMIN_USERD_REQUEST,ADMIN_USERD_SUCCESS,CLEAR_AUDERRORS}=userDetailsReducer.actions
  export default userDetailsReducer.reducer