import {configureStore} from '@reduxjs/toolkit';
import { productsReducer } from './reducers/productReducer';
import {productDetailsReducer} from './reducers/productDetailsReducer';
import {userReducer} from './reducers/userReducer';
import {userUpdateReducer} from './reducers/userUpdateReducer';
import {forgotPasswordReducer} from './reducers/forgotPasswordReducer';
import {resetPasswordReducer} from './reducers/resetPasswordReducer';
import {cartReducer} from './reducers/cartReducer';
import {catagoryReducer} from './reducers/catagoryReducer';
import { newOrderReducer } from './reducers/orderReducer';
import {myOrderReducer} from './reducers/myOrderReducer';
import {orderDetailsReducer} from './reducers/orderDetailsReducer';
import {sameProductReducer} from './reducers/sameProductReducer';
import { addProductReducer } from './reducers/addProductReducer';


const store=configureStore({
    reducer:{
        products:productsReducer.reducer,
        product:productDetailsReducer.reducer,
        catagories:catagoryReducer.reducer,
        user:userReducer.reducer,
        profile:userUpdateReducer.reducer,
        forgotPassword:forgotPasswordReducer.reducer,
        resetPassword:resetPasswordReducer.reducer,
        cart:cartReducer.reducer,
        newOrder:newOrderReducer.reducer,
        myOrders:myOrderReducer.reducer,
        orderDetails:orderDetailsReducer.reducer,
        sameProduct:sameProductReducer.reducer,
        addProduct:addProductReducer.reducer,
    }
    

})
export default store;
