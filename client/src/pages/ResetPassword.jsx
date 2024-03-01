import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import "./ResetPassword.css"
import { useDispatch,useSelector } from 'react-redux';
import { resetPassword,clearRPErrors} from '../actions/userAction';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/layout/Loader';

const ResetPassword = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {token}=useParams();
    const {error,success,loading}=useSelector((state)=>state.resetPassword);
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const resetPasswordSubmit=(e)=>{
        e.preventDefault();
        dispatch(resetPassword(token,password,confirmPassword))

    }
    useEffect(() => {
      if(error){
      window.alert(error);
      dispatch(clearRPErrors());
      }
      if(success){
      window.alert("Password changed successfull");
      navigate("/login");
    
      }
  
      },[dispatch,success,error])
  return (
    <Layout>{loading?<Loader/>:<>
    <div className="resetPasswordContainer">
      <div className="resetPasswordBox">
        <h2 className="resetPasswordHeading">Reset Password</h2>

        <form
          className="resetPasswordForm"
          onSubmit={resetPasswordSubmit}
        >
          <div>
            <LockOpenIcon />
            <input
              type="password"
              placeholder="New Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="loginPassword">
          <LockOpenIcon />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Update"
            className="resetPasswordBtn"
          />
        </form>
      </div>
    </div>
  </>}</Layout>
  )
}

export default ResetPassword