import { createSlice } from "@reduxjs/toolkit";


export const dealsProductReducer = createSlice(
    { name:'Deals',
       initialState:{
        dod:[],
        dodSuccess:false,
        de:[],
        deSuccess:false,
        td:[],
        tdSuccess:false
        
       },
       reducers:{
          SAVE_DOD_INFO(state,action){
              state.dod=action.payload.products;
              state.dodSuccess=action.payload.success;
            
          },
          SAVE_DE_INFO(state,action){
              state.de=action.payload.products;
              state.deSuccess=action.payload.success;
            
          },
          SAVE_TD_INFO(state,action){
                state.td=action.payload.products;
                state.tdSuccess=action.payload.success;
          }
       }
  
    }
  );
  export const {SAVE_DOD_INFO,SAVE_DE_INFO,SAVE_TD_INFO}=dealsProductReducer.actions
  export default dealsProductReducer.reducer