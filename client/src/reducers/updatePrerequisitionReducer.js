import { createSlice } from "@reduxjs/toolkit";


export const updatePrerequisitionReducer = createSlice(
    { name:'updatePre',
       initialState:{
        iscupdate:false,
        cloading:false,
        cerror:null,
        ispupdate:false,
        ploading:false,
        perror:null,
        iscarupdate:false,
        carloading:false,
        carerror:null,
        
       },
       reducers:{
          UPDATE_CATAGORY_REQUEST(state){
            state.cloading= true;
            state.iscupdate=false;
            state.cerror=null;
          },
        UPDATE_CATAGORY_SUCCESS(state,action){
            state.cloading=false;
            state.iscupdate=action.payload;
            state.cerror=null;
          },
        UPDATE_CATAGORY_FAIL(state,action){
            state.cloading=false;
            state.iscupdate=false;
            state.cerror=action.payload;
          },
        UPDATE_CATAGORY_RESET(state){
            state.cloading=false;
            state.iscupdate=false;
            state.cerror=null;
          },
          CLEAR_UCERRORS:(state)=>{
            state.cerror=null;
          },
          UPDATE_PINCODE_REQUEST(state){
            state.ploading= true;
            state.ispupdate=false;
            state.perror=null;
          },
        UPDATE_PINCODE_SUCCESS(state,action){
            state.ploading=false;
            state.ispupdate=action.payload;
            state.perror=null;
          },
        UPDATE_PINCODE_FAIL(state,action){
            state.ploading=false;
            state.ispupdate=false;
            state.perror=action.payload;
          },
        UPDATE_PINCODE_RESET(state,action){
            state.ploading=false;
            state.ispupdate=false;
            state.perror=null;
          },
    
        CLEAR_UPERRORS:(state)=>{
            state.perror=null;
          },
       UPDATE_CAROUSEL_REQUEST(state){
        state.carloading= true;
        state.iscarupdate=false;
        state.carerror=null;
      },
    UPDATE_CAROUSEL_SUCCESS(state,action){
        state.carloading=false;
        state.iscarupdate=action.payload;
        state.carerror=null;
      },
    UPDATE_CAROUSEL_FAIL(state,action){
        state.carloading=false;
        state.iscarupdate=false;
        state.carerror=action.payload;
      },
    UPDATE_CAROUSEL_RESET(state,action){
        state.carloading=false;
        state.iscarupdate=false;
        state.carerror=null;
      },

    CLEAR_UCARERRORS:(state)=>{
        state.carerror=null;
      }
  
    }
  }
  );
  export const {UPDATE_CATAGORY_FAIL,UPDATE_CATAGORY_REQUEST,UPDATE_CATAGORY_SUCCESS,UPDATE_CATAGORY_RESET,CLEAR_UCERRORS,UPDATE_PINCODE_FAIL,UPDATE_PINCODE_REQUEST,UPDATE_PINCODE_SUCCESS,UPDATE_PINCODE_RESET,CLEAR_UPERRORS,UPDATE_CAROUSEL_FAIL,UPDATE_CAROUSEL_REQUEST,UPDATE_CAROUSEL_SUCCESS,UPDATE_CAROUSEL_RESET,CLEAR_UCARERRORS}=updatePrerequisitionReducer.actions
  export default updatePrerequisitionReducer.reducer