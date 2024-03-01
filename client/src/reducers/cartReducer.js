import { createSlice } from "@reduxjs/toolkit";


export const cartReducer = createSlice(
    { name:'cart',
       initialState:{
        cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
        shippingInfo:localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippingInfo")):[]
       },
       reducers:{
          ADD_TO_CART(state,action){
            const item=action.payload;
           const isItemExist=state.cartItems.find((i)=>i.product===item.product);
            if(isItemExist)
            return{
                ...state,
                cartItems:state.cartItems.map((i)=>i.product===isItemExist.product?item:i)
            }
            else
            return{
                ...state,
                cartItems:[...state.cartItems,item]
            }
          },
          REMOVE_CART_ITEM(state,action){
            return{
              ...state,
              cartItems:state.cartItems.filter((i)=>i.product!=action.payload)
            }

          },
          SAVE_SHIPPING_INFO(state,action){
            return{
              ...state,
              shippingInfo:action.payload
            }
          }
       }
  
    }
  );
  export const {ADD_TO_CART,REMOVE_CART_ITEM,SAVE_SHIPPING_INFO}=cartReducer.actions
  export default cartReducer.reducer