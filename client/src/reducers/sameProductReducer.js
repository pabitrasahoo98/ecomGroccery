import { createSlice } from "@reduxjs/toolkit";

export const sameProductReducer = createSlice(
    { name:'product',
       initialState:{
        sProduct:[],
        sloading:false,
        serror:null
       },
       reducers:{
        SPRODUCT_REQUEST(state){
            state.sloading= true;
            state.sProduct=[];
          },
        SPRODUCT_SUCCESS(state,action){
            state.sloading=false;
            state.sProduct=action.payload.products;
          },
        SPRODUCT_FAIL(state,action){
            state.sloading=false;
            state.serror=action.payload;
          },
    
        CLEAR_SPERRORS:(state)=>{
            state.serror=null;
          }
       }
  
    }
  );
  export const {SPRODUCT_FAIL,SPRODUCT_REQUEST,SPRODUCT_SUCCESS,CLEAR_SPERRORS}=sameProductReducer.actions
  export default sameProductReducer.reducer