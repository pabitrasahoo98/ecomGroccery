import { createSlice } from "@reduxjs/toolkit";


export const catagoryReducer = createSlice(
    { name:'PreRequisition',
       initialState:{
        catalog:[],
        shippingPinCodes:[],
        carousel:[]
        
       },
       reducers:{
          SAVE_CATAGORY_INFO(state,action){
              state.catalog=action.payload.catagories;
            
          },
          SAVE_PINCODE_INFO(state,action){
              state.shippingPinCodes=action.payload.pincodes;
            
          },
          SAVE_CAROUSEL_INFO(state,action){
                state.carousel=action.payload.carousels;
          }
       }
  
    }
  );
  export const {SAVE_CATAGORY_INFO,SAVE_PINCODE_INFO,SAVE_CAROUSEL_INFO}=catagoryReducer.actions
  export default catagoryReducer.reducer