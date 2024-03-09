import React, { useEffect, useState } from 'react'
import './AccountSetting.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearProfileErrors, loadUser, updateProfile } from '../../../actions/userAction';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PROFILE_RESET } from '../../../reducers/userUpdateReducer';
import Swal from 'sweetalert2';


const AccountSettings = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const{user}=useSelector((state)=>state.user);
  const {error,isUpdate,loading}=useSelector((state)=>state.profile);
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[mobileNo,setMobileNo]=useState("");
  useEffect(() => {
    if(user){
      setName(user.name);
      setEmail(user.email);
      setMobileNo(user.mobileNo);
    }
    if(error){
      Swal.fire({
        title: "Error",
        text: error,
        icon: "warning"
      })
      dispatch(clearProfileErrors);
    }
    if(isUpdate){
      Swal.fire({
        title: "Success",
        text: "Profile Update Successful",
        icon: "success"
      })
      dispatch(loadUser());
      navigate("/profile/accountsettings");
      dispatch(UPDATE_PROFILE_RESET());
    }
  }, [dispatch,user,isUpdate,error,Swal,navigate])

  const handleSaveChanges=(e)=>{
    e.preventDefault();
    dispatch(updateProfile(name,email,mobileNo));
  }
  
  
  return (
    <div className='accountsettings'>
      <h1 className='mainhead1'>Personal Information</h1>

      <div className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Your Name <span>*</span></label>
          <input type='text' name='name' id='name' value={name}  onChange={(e)=>setName(e.target.value)}/>
        </div>

        <div className='form-group'>
          <label htmlFor='phone'>Phone/Mobile <span>*</span></label>
          <input type='text' name='mobileNo' id='phone' value={mobileNo} onChange={(e)=>setMobileNo(e.target.value)}/>
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email <span>*</span></label>
          <input type='email' name='email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>

      
      </div>

      <button className='mainbutton1' onClick={handleSaveChanges}>Save Changes</button>
    </div>
  )
}

export default AccountSettings