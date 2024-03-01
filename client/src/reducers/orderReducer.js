import { createSlice } from "@reduxjs/toolkit";

export const newOrderReducer = createSlice(
    { name:'order',
       initialState:{
        order:{},
        loading:false,
        error:null
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
            order:action.payload
            }
          },
        CREATE_ORDER_FAIL(state,action){
            return{
            loading:false,
            error:action.payload
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
        export const {CREATE_ORDER_FAIL,CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS,CLEAR_OERRORS}=newOrderReducer.actions
        export default newOrderReducer.reducer