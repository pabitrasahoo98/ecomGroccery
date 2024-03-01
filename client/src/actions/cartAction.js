import axios from "axios";
import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../reducers/cartReducer";



//add to cart product
export const addItemsToCart =(id,quantity) =>
  async (dispatch,getState) => {
    
      let link = `http://localhost:4000/api/v1/product/${id}`;

      const { data } = await axios.get(link);
      const product=data.product._id;
      const name=data.product.name;
      const price=data.product.price;
      const image=data.product.images[0].url;
      const stock=data.product.stock;
      

      dispatch(ADD_TO_CART({product,name,price,image,stock,quantity}));
      localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
  };
  //Removing from cart
  export const removeItemFromCart =(id) =>
  async (dispatch,getState) => {
    dispatch(REMOVE_CART_ITEM(id));
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
 }
 //saving shipping info

 export const saveShippingInfo =(data) =>
  async (dispatch) => {
    dispatch(SAVE_SHIPPING_INFO(data))
    localStorage.setItem("shippingInfo",JSON.stringify(data));
  }




