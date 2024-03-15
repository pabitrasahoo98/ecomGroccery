import { createSlice } from "@reduxjs/toolkit";

export const newOrderReducer = createSlice(
    { name:'order',
       initialState:{
        order:{},
        loading:false,
        error:null,
        isplaced:false,
       },
       reducers:{
        CREATE_ORDER_REQUEST(state){
        return{
            ...state,
            loading:true 
            };
          },
        CREATE_ORDER_SUCCESS(state,action){
            return{
            ...state,
            loading:false,
            order:action.payload.order,
            isplaced:action.payload.success
            }
          },
        CREATE_ORDER_FAIL(state,action){
            return{
            loading:false,
            error:action.payload,
            messege:action.payload.messege
            }
          },
          CREATE_ORDER_RESET(state,action){
            return{
              ...state,
            isplaced:false
            }
          },
          CLEAR_OERRORS:(state)=>{
            return{
            ...state,
            error:null
            }
          }
        }
    })
        export const {CREATE_ORDER_FAIL,CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS,CREATE_ORDER_RESET,CLEAR_OERRORS}=newOrderReducer.actions
        export default newOrderReducer.reducer