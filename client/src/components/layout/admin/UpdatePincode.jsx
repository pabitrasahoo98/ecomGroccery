import React, { useEffect, useRef, useState } from 'react'
import Layout from '../Layout'
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../Loader';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_PINCODE_RESET } from '../../../reducers/updatePrerequisitionReducer';
import { clearPDErrors, clearUPErrors, pincodeDetails, updatePincode } from '../../../actions/catagoryAction';
import Swal from 'sweetalert2';


const UpdatePincode = ({role}) => {
  
  const [pin,setPin]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {id}=useParams();
  const { ploading, perror, Pincode } = useSelector((state) => state.getPre);
  const targetRef=useRef(null);
    
  const {
    ploading:updateLoading,
    perror: updateError,
    ispupdate,
  } = useSelector((state) => state.updatePre);

  useEffect(() => {
    if(targetRef.current){
      targetRef.current.scrollIntoView({behavior:'smooth'});
    }
    if (Pincode && Pincode._id !== id) {
        dispatch(pincodeDetails(id));
      } else {
        setPin(Pincode.pinCode);
      }
      if (perror) {
        Swal.fire({
          title: "Error",
          text: perror,
          icon: "warning"
        })
        dispatch(clearPDErrors());
      }
  
      if (updateError) {
        Swal.fire({
          title: "Error",
          text: updateError,
          icon: "warning"
        })
        dispatch(clearUPErrors());
      }
  
      if (ispupdate) {
        Swal.fire({
          title: "Success",
          text: "Update pincode successful",
          icon: "success"
        })
        
        dispatch(UPDATE_PINCODE_RESET());
        navigate("/admin/pincode");
        window.location.reload();
      }

}, [Pincode,dispatch,perror,updateError,ispupdate,id,navigate,Swal])

const updatePincodeSubmitHandler=(e)=>{
  e.preventDefault();
  const myForm = new FormData();

  myForm.set("pinCode", pin);

  dispatch(updatePincode(id, myForm));
}

  
  return (
    <div ref={targetRef}>
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
    </div>
  )
}

export default UpdatePincode