import axios from "axios";
import { LOGIN_FAIL,
        LOGIN_REQUEST,
        LOGIN_SUCCESS,
        CLEAR_ERRORS,
        REGISTER_FAIL,
        REGISTER_REQUEST,
        REGISTER_SUCCESS,
        LOAD_USER_FAIL,
        LOAD_USER_REQUEST,
        LOAD_USER_SUCCESS,
        LOGOUT_SUCCESS,
        LOGOUT_FAIL} from "../reducers/userReducer"
import { UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  CLEAR_PERRORS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS} from "../reducers/userUpdateReducer";
import { FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_FAIL,CLEAR_FPERRORS } from "../reducers/forgotPasswordReducer";
import { RESET_PASSWORD_SUCCESS,RESET_PASSWORD_REQUEST,RESET_PASSWORD_FAIL,CLEAR_RPERRORS } from "../reducers/resetPasswordReducer";
import { ADMIN_USERS_FAIL, ADMIN_USERS_REQUEST, ADMIN_USERS_SUCCESS, CLEAR_AUERRORS } from "../reducers/allUserReducer";
import { CLEAR_DUERRORS, CLEAR_UUERRORS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "../reducers/manipulateUserReducer";
import { ADMIN_USERD_FAIL, ADMIN_USERD_REQUEST, ADMIN_USERD_SUCCESS, CLEAR_AUDERRORS } from "../reducers/userDetailsReducer";
//LOGIN
export const login =(email,password) =>
  async (dispatch) => {
    try {
      dispatch(LOGIN_REQUEST());
      const config={headers:{"Content-Type":"application/json"},withCredentials:true}
      let link = `http://localhost:4000/api/v1/login`;

      const { data } = await axios.post(link,{email,password},config);

      dispatch(LOGIN_SUCCESS(data));
      
    } catch (error) {
      dispatch(LOGIN_FAIL(error.response.data.message));
    }
  };
  //clear errors
  
  export const clearErrors =() =>
  async (dispatch) => {
    dispatch( CLEAR_ERRORS)
  };
  //register user
export const register =(name,email,mobileNo,password) =>
async (dispatch) => {
  try {
    dispatch(REGISTER_REQUEST());
    const config={headers:{"Content-Type":"application/json"},withCredentials:true}
    let link = `http://localhost:4000/api/v1/register`;

    const { data } = await axios.post(link,{name,email,mobileNo,password},config);

    dispatch(REGISTER_SUCCESS(data.user));
    
  } catch (error) {
    dispatch(REGISTER_FAIL(error.response.data.message));
  }
};
//load user
export const loadUser =() =>
  async (dispatch) => {
    try {
      dispatch(LOAD_USER_REQUEST());
      let link = `http://localhost:4000/api/v1/me`;

      const { data } = await axios.get(link,{withCredentials:true});

      dispatch(LOAD_USER_SUCCESS(data));
      
    } catch (error) {
      dispatch(LOAD_USER_FAIL(error.response.data.message));
    }
  };
  //Logout
  export const logout =() =>
  async (dispatch) => {
    try {
      let link = `http://localhost:4000/api/v1/logout`;
      await axios.get(link,{withCredentials:true});

      dispatch(LOGOUT_SUCCESS());
      
    } catch (error) {
      dispatch(LOGOUT_FAIL(error.response.data.message));
    }
  };
  //UPDATE PASSWORD
export const updatePassword =(oldPassword,newPassword,confirmPassword) =>
async (dispatch) => {
  try {
    dispatch(UPDATE_PASSWORD_REQUEST());
    const config={headers:{"Content-Type":"application/json"},withCredentials:true}
    let link = `http://localhost:4000/api/v1/password/update`;

    const { data } = await axios.put(link,{oldPassword,newPassword,confirmPassword},config);

    dispatch(UPDATE_PASSWORD_SUCCESS(data.success));
    
  } catch (error) {
    dispatch(UPDATE_PASSWORD_FAIL(error.response.data.message));
  }
};
//UPDATE PROFILE
export const updateProfile =(name,email,mobileNo) =>
async (dispatch) => {
  try {
    dispatch(UPDATE_PROFILE_REQUEST());
    const config={headers:{"Content-Type":"application/json"},withCredentials:true}
    let link = `http://localhost:4000/api/v1/me/update`;

    const { data } = await axios.put(link,{name,email,mobileNo},config);

    dispatch(UPDATE_PROFILE_SUCCESS(data.success));
    
  } catch (error) {
    dispatch(UPDATE_PROFILE_FAIL(error.response.data.message));
  }
};
//CLEAR PROFILE ERRORS
export const clearProfileErrors =() =>
async (dispatch) => {
  dispatch( CLEAR_PERRORS());
};
//forgot password
export const forgotPassword =(email) =>
  async (dispatch) => {
    try {
      dispatch(FORGOT_PASSWORD_REQUEST());
      const config={headers:{"Content-Type":"application/json"},withCredentials:true}
      let link = `http://localhost:4000/api/v1/password/forgot`;

      const { data } = await axios.post(link,{email},config);

      dispatch(FORGOT_PASSWORD_SUCCESS(data));
      
    } catch (error) {
      dispatch(FORGOT_PASSWORD_FAIL(error.response.data.message));
    }
  };


//CLEAR FORGOT PASSWORD ERRORS
export const clearFPErrors =() =>
async (dispatch) => {
  dispatch( CLEAR_FPERRORS());
};
//RESET PASSWORD
export const resetPassword =(otp,newPassword) =>
  async (dispatch) => {
    try {
      dispatch(RESET_PASSWORD_REQUEST());
      const config={headers:{"Content-Type":"application/json"},withCredentials:true}
      let link = `http://localhost:4000/api/v1/password/reset`;

      const { data } = await axios.put(link,{otp,newPassword},config);

      dispatch(RESET_PASSWORD_SUCCESS(data.success));
      
    } catch (error) {
      dispatch(RESET_PASSWORD_FAIL(error.response.data.message));
    }
  };

//CLEAR RESET PASSWORD ERRORS
export const clearRPErrors =() =>
async (dispatch) => {
  dispatch( CLEAR_RPERRORS());
};



 //get  all user--admin
 export const getAdminUsers =() =>
 async (dispatch) => {
   try {
     dispatch(ADMIN_USERS_REQUEST());
 
     let link = `http://localhost:4000/api/v1/admin/users`;
 
     const { data } = await axios.get(link,{withCredentials:true});
 
     dispatch(ADMIN_USERS_SUCCESS(data.users)); 
     
   } catch (error) {
     dispatch(ADMIN_USERS_FAIL(error.response.data.message));
   }
 };

 export const clearAUErrors =() =>
async (dispatch) => {
dispatch( CLEAR_AUERRORS());
};


 //delete USERS--admin
 export const deleteUser=(id)=>async(dispatch)=>{

   try {
       dispatch(DELETE_USER_REQUEST())
       const config={headers:{"Content-Type":"application/json"},withCredentials:true}
       const {data}=await axios.delete(`http://localhost:4000/api/v1/admin/user/${id}`,config);
       dispatch(DELETE_USER_SUCCESS(data.success));
       
   } catch (error) {
   dispatch(DELETE_USER_FAIL(error.response.data.message))
   }
 
 }
  //clear dELETE Order error
  export const clearDUErrors =() =>
  async (dispatch) => {
  dispatch( CLEAR_DUERRORS());
  };


  //update USERS--admin
  export const updateUser=(id,orderData)=>async(dispatch)=>{

   try {
       dispatch(UPDATE_USER_REQUEST())
       const config={headers:{"Content-Type":"application/json"},withCredentials:true}
       const {data}=await axios.put(`http://localhost:4000/api/v1/admin/user/${id}`,orderData,config);
       dispatch(UPDATE_USER_SUCCESS(data.success));
       
   } catch (error) {
   dispatch(UPDATE_USER_FAIL(error.response.data.message))
   }
 
 }

  //clear update USER error
  export const clearUUErrors =() =>
  async (dispatch) => {
  dispatch( CLEAR_UUERRORS());

  };

  //ADMIN --USER DETAILS 

  export const userDetails =(id) =>
  async (dispatch) => {
    try {
      dispatch(ADMIN_USERD_REQUEST());
      let link = `http://localhost:4000/api/v1/admin/user/${id}`;

      const { data } = await axios.get(link,{withCredentials:true});

      dispatch(ADMIN_USERD_SUCCESS(data));
      
    } catch (error) {
      dispatch(ADMIN_USERD_FAIL(error.response.data.message));
    }
  };
  //ADMIN-- CLEAR USER DETAILS ERROR
   export const clearAUDErrors =() =>
   async (dispatch) => {
   dispatch( CLEAR_AUDERRORS());
 
   }; 



