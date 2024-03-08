import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../Loader';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_PINCODE_RESET } from '../../../reducers/updatePrerequisitionReducer';
import { clearPDErrors, clearUPErrors, pincodeDetails, updatePincode } from '../../../actions/catagoryAction';


const UpdatePincode = ({role}) => {
  
  const [pin,setPin]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {id}=useParams();
  const { ploading, perror, Pincode } = useSelector((state) => state.getPre);
    
  const {
    ploading:updateLoading,
    perror: updateError,
    ispupdate,
  } = useSelector((state) => state.updatePre);

  useEffect(() => {
    if (Pincode && Pincode._id !== id) {
        dispatch(pincodeDetails(id));
      } else {
        setPin(Pincode.pinCode);
      }
      if (perror) {
        window.alert(perror);
        dispatch(clearPDErrors());
      }
  
      if (updateError) {
        window.alert(updateError);
        dispatch(clearUPErrors());
      }
  
      if (ispupdate) {
        window.alert("Pincode Updated Successfully");
        navigate("/admin/pincode");
        dispatch(UPDATE_PINCODE_RESET());
      }

}, [Pincode,dispatch,perror,updateError,ispupdate,id,navigate])

const updatePincodeSubmitHandler=(e)=>{
  e.preventDefault();
  const myForm = new FormData();

  myForm.set("pinCode", pin);

  dispatch(updatePincode(id, myForm));
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
       onSubmit={updatePincodeSubmitHandler}
     >    
       <h1>Update Pincode</h1>

       <div>
         <PersonPinCircleIcon/>
         <input
           type="text"
           placeholder="Pincode"
           value={pin}
           required
           onChange={(e) => setPin(e.target.value)}
         />
       </div>
       <Button
         id="createProductBtn"
         type="submit"
          disabled={ploading ? true : false}
       >
         UPDATE
       </Button>
     </form>
   )}
 </div>
    
    </>:<h3>You are not Authorised</h3>}</Layout>
  )
}

export default UpdatePincode