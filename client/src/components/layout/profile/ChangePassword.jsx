import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearProfileErrors, loadUser, updatePassword } from '../../../actions/userAction';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET } from '../../../reducers/userUpdateReducer';
import Swal from 'sweetalert2';



const ChangePassword = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {error,isUpdate,loading}=useSelector((state)=>state.profile);
    const[oldPassword,setOldPassword]=useState("");
    const[newPassword,setNewPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");
    useEffect(() => {
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
                text: "Password Update Successful",
                icon: "success"
              })
          dispatch(loadUser());
          navigate("/profile/changepassword");
          dispatch(UPDATE_PASSWORD_RESET());
        }
      }, [dispatch,isUpdate,error,Swal,navigate])
    const handleSaveChanges=(e)=>{
        e.preventDefault();
        dispatch(updatePassword(oldPassword,newPassword,confirmPassword))
    }
    return (
        <div className='accountsettings'>
            <h1 className='mainhead1'>Change Password</h1>

            <div className='form'>
                <div className='form-group'>
                    <label htmlFor='oldpass'>Old Password <span>*</span></label>
                    <input type="password" onChange={(e)=>setOldPassword(e.target.value)}/>
                </div>

                <div className='form-group'>
                    <label htmlFor='newpass'>New Password <span>*</span></label>
                    <input type="password" onChange={(e)=>setNewPassword(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='conpass'>Confirm Password <span>*</span></label>
                    <input type="password" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </div>


            </div>

            <button className='mainbutton1' onClick={handleSaveChanges}>Save Changes</button>
        </div>
    )
}

export default ChangePassword