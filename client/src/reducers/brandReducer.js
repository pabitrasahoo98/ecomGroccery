import { createSlice } from "@reduxjs/toolkit";


export const brandReducer = createSlice(
    { name:'Brand',
       initialState:{
        brand:[],
        brandSuccess:false,
        
       },
       reducers:{
          SAVE_BRAND_INFO(state,action){
              state.brand=action.payload.brand;
              state.brandSuccess=action.payload.success;
            
          },
       }
  
    }
  );
  export const {SAVE_BRAND_INFO}=brandReducer.actions
  export default brandReducer.reducer