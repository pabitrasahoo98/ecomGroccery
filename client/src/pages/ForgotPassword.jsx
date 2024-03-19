import React, { useEffect, useRef, useState } from 'react'
import Layout from '../components/layout/Layout'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import "./ForgotPassword.css"
import { useDispatch,useSelector } from 'react-redux';
import { forgotPassword,clearFPErrors } from '../actions/userAction';
import Loader from '../components/layout/Loader';
import { useNavigate } from 'react-router-dom';
import { FORGOT_PASSWORD_RESET } from '../reducers/forgotPasswordReducer';
import Swal from 'sweetalert2'


const ForgotPassword = () => {
    const inputRef=useRef(null);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {error,message,loading,isSent}=useSelector((state)=>state.forgotPassword);
    const [email,setEmail]=useState("");
    const forgotPasswordSubmit=(e)=>{
        e.preventDefault();
        dispatch(forgotPassword(email))
    }
    useEffect(() => {
      inputRef.current.focus();
    if(error){
      Swal.fire({
        title: "Error",
        text: error,
        icon: "warning"
      })
    dispatch(clearFPErrors());
    }
    if(message){
      Swal.fire({
        title: "Success",
        text: message,
        icon: "success"
      })
    if(isSent){
      dispatch(FORGOT_PASSWORD_RESET());
      navigate("/password/reset");
    }
    }

    },[dispatch,message,error,isSent,navigate]) 
    
  return (
    <div>
    
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
                   ref={inputRef}
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
        </div>
  )
}

export default ForgotPassword