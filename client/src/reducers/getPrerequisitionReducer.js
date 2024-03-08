import { createSlice } from "@reduxjs/toolkit";

export const getPrerequisitionReducer = createSlice(
    { name:'getpre',
       initialState:{
        Catagory:{},
        Pincode:{},
        Carousel:{},
        cloading:false,
        cerror:null,
        ploading:false,
        perror:null,
        carloading:false,
        carerror:null
       },
       reducers:{
        CATAGORY_DETAILS_REQUEST:(state)=>{
            state.cloading= true;
          },
        CATAGORY_DETAILS_SUCCESS:(state,action)=>{
            state.cloading=false;
            state.cerror=null;
            state.Catagory=action.payload.catagory;
          },
        CATAGORY_DETAILS_FAIL:(state,action)=>{
            state.cloading=false;
            state.Catagory=null;
            state.cerror=action.payload;
          },
    
        CLEAR_CDERRORS:(state)=>{
            state.cerror=null;
          },

        PINCODE_DETAILS_REQUEST:(state)=>{
            state.ploading= true;
          },
        PINCODE_DETAILS_SUCCESS:(state,action)=>{
            state.ploading=false;
            state.perror=null;
            state.Pincode=action.payload.pincode;
          },
        PINCODE_DETAILS_FAIL:(state,action)=>{
            state.ploading=false;
            state.Pincode=null;
            state.perror=action.payload;
          },
    
        CLEAR_PDERRORS:(state)=>{
            state.perror=null;
          },
        CAROUSEL_DETAILS_REQUEST:(state)=>{
            state.carloading= true;
          },
        CAROUSEL_DETAILS_SUCCESS:(state,action)=>{
            state.carloading=false;
            state.carerror=null;
            state.Carousel=action.payload.carousel;
          },
        CAROUSEL_DETAILS_FAIL:(state,action)=>{
            state.carloading=false;
             state.Carousel=null;
            state.carerror=action.payload;
          },
    
        CLEAR_CARDERRORS:(state)=>{
            state.carerror=null;
          }
       }
  
    }
  );
  export const {CATAGORY_DETAILS_FAIL,CATAGORY_DETAILS_REQUEST,CATAGORY_DETAILS_SUCCESS,CLEAR_CDERRORS,PINCODE_DETAILS_FAIL,PINCODE_DETAILS_REQUEST,PINCODE_DETAILS_SUCCESS,CLEAR_PDERRORS,CAROUSEL_DETAILS_FAIL,CAROUSEL_DETAILS_REQUEST,CAROUSEL_DETAILS_SUCCESS,CLEAR_CARDERRORS}=getPrerequisitionReducer.actions
  export default getPrerequisitionReducer.reducer