import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { addPincode, clearAAPErrors } from '../../../actions/catagoryAction';
import { ADD_PINCODE_RESET } from '../../../reducers/addPrerequisitionReducer';
import Swal from 'sweetalert2';


const AddPincode = ({role}) => {
  const {ploading,psuccess,perror}=useSelector((state)=>state.addPre)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [pinCode, setPinCode] = useState("");
  useEffect(() => {
    if(perror){
        Swal.fire({
          title: "Error",
          text: perror,
          icon: "warning"
        })
      dispatch(clearAAPErrors());
    }
    if(psuccess){
      Swal.fire({
        title: "Success",
        text: "Pincode is live now",
        icon: "success"
      })
      dispatch(ADD_PINCODE_RESET());
      navigate("/admin/pincode");
    }
    
  }, [perror,psuccess,dispatch,Swal,navigate])
  
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