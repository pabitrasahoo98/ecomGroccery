import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import "./ForgotPassword.css"
import { useDispatch,useSelector } from 'react-redux';
import { forgotPassword,clearFPErrors } from '../actions/userAction';
import Loader from '../components/layout/Loader';


const ForgotPassword = () => {
    const dispatch=useDispatch();
    const {error,message,loading}=useSelector((state)=>state.forgotPassword);
    const [email,setEmail]=useState("");
    const forgotPasswordSubmit=(e)=>{
        e.preventDefault();
        dispatch(forgotPassword(email))
    }
    useEffect(() => {
    if(error){
    window.alert(error);
    dispatch(clearFPErrors());
    }
    if(message){
    window.alert(message);
    }

    },[dispatch,message,error])
    
  return (
    
    <Layout>{loading?<Loader/>:
    <>
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>}</Layout>
  )
}

export default ForgotPassword