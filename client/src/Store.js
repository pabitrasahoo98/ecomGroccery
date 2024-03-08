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
import {manipulateProductReducer} from './reducers/manipulateProductReducer';
import {manipulateOrderReducer} from './reducers/manipulateOrderReducer';
import {orderListReducer} from './reducers/orderListReducer';
import { userListReducer } from './reducers/allUserReducer';
import {manipulateUserReducer} from './reducers/manipulateUserReducer';
import {userDetailsReducer} from './reducers/userDetailsReducer';
import {allPrerequisitionReducer} from './reducers/allPrerequisitionReducer';
import {deletePreReducer} from './reducers/deletePreReducer';
import {addPrerequisitionReducer} from './reducers/addPrerequisitionReducer';
import {updatePrerequisitionReducer} from './reducers/updatePrerequisitionReducer';
import {getPrerequisitionReducer} from './reducers/getPrerequisitionReducer';
import {cancelOrderReducer} from './reducers/cancelOrderReducer';


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
        cancelOrder:cancelOrderReducer.reducer,
        sameProduct:sameProductReducer.reducer,
        addProduct:addProductReducer.reducer,
        maniProduct:manipulateProductReducer.reducer,
        orderList:orderListReducer.reducer,
        maniOrder:manipulateOrderReducer.reducer,
        userList:userListReducer.reducer,
        userDetails:userDetailsReducer.reducer,
        maniUser:manipulateUserReducer.reducer,
        allPre:allPrerequisitionReducer.reducer,
        delPre:deletePreReducer.reducer,
        addPre:addPrerequisitionReducer.reducer,
        updatePre:updatePrerequisitionReducer.reducer,
        getPre:getPrerequisitionReducer.reducer,
        
    }
    

})
export default store;
