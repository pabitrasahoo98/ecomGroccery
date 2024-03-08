import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { addPincode, clearAAPErrors } from '../../../actions/catagoryAction';
import { ADD_PINCODE_RESET } from '../../../reducers/addPrerequisitionReducer';


const AddPincode = ({role}) => {
  const {ploading,psuccess,perror}=useSelector((state)=>state.addPre)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [pinCode, setPinCode] = useState("");
  useEffect(() => {
    if(perror){
      window.alert(perror);
      dispatch(clearAAPErrors());
    }
    if(psuccess){
      window.alert("Pincode added succesfully");
      dispatch(ADD_PINCODE_RESET());
      navigate("/admin/pincode");
    }
    
  }, [perror,psuccess,dispatch])
  
  const addPincodeSubmitHandler=(e)=>{
    e.preventDefault();
    
    const myForm = new FormData();

    myForm.set("pinCode", pinCode);
    dispatch(addPincode(myForm))

  }
  return (
    <Layout>{(role==="admin")?<>

   <div className="newProductContainer">
   {ploading ? (
     <Loader />
   ) : (
     <form
       className="createProductForm"
       encType="multipart/form-data"
       onSubmit={addPincodeSubmitHandler}
     >    
       <h1>Add Pincode</h1>

       <div>
         <PersonPinCircleIcon />
         <input
           type="text"
           placeholder="PinCode"
           value={pinCode}
           required
           onChange={(e) => setPinCode(e.target.value)}
         />
       </div>
       <Button
         id="createProductBtn"
         type="submit"
          disabled={ploading ? true : false}
       >
         ADD
       </Button>
     </form>
   )}
 </div>
    
    </>:<h3>You are not Authorised</h3>}</Layout>
  )
}

export default AddPincode