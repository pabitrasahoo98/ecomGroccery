import { createSlice } from "@reduxjs/toolkit";


export const subCatagoryReducer = createSlice(
    { name:'Subcatagory',
       initialState:{
        subC:[],
        subCSuccess:false,
        
       },
       reducers:{
          SAVE_SUBCATAGORY_INFO(state,action){
              state.subC=action.payload.scata;
              state.subCSuccess=action.payload.success;
            
          },
       }
  
    }
  );
  export const {SAVE_SUBCATAGORY_INFO}=subCatagoryReducer.actions
  export default subCatagoryReducer.reducer