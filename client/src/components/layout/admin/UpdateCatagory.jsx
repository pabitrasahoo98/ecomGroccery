import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import CategoryIcon from '@mui/icons-material/Category';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../Loader';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_CATAGORY_RESET } from '../../../reducers/updatePrerequisitionReducer';
import {  catagoryDetails, clearCDErrors, clearUCErrors, updateCatagory } from '../../../actions/catagoryAction';

const UpdateCatagory = ({role}) => {
  const [cata,setCata]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {id}=useParams();
  const { cloading, cerror, Catagory } = useSelector((state) => state.getPre);
    
  const {
    cloading:updateLoading,
    error: updateError,
    iscupdate,
  } = useSelector((state) => state.updatePre);

  useEffect(() => {
    if (Catagory && Catagory._id !== id) {
        dispatch(catagoryDetails(id));
      } else {
        setCata(Catagory.catagory);
      }
      if (cerror) {
        window.alert(cerror);
        dispatch(clearCDErrors());
      }
  
      if (updateError) {
        window.alert(updateError);
        dispatch(clearUCErrors());
      }
  
      if (iscupdate) {
        window.alert("Catagory Updated Successfully");
        navigate("/admin/category");
        dispatch(UPDATE_CATAGORY_RESET());
      }

}, [Catagory,dispatch,cerror,updateError,iscupdate,id,navigate])

const updateCatagorySubmitHandler=(e)=>{
  e.preventDefault();
  const myForm = new FormData();

  myForm.set("catagory", cata);

  dispatch(updateCatagory(id, myForm));
}
  

  return (
    <Layout>{(role==="admin")?<>

   <div className="newProductContainer">
   {cloading ? (
     <Loader />
   ) : (
     <form
       className="createProductForm"
       encType="multipart/form-data"
       onSubmit={updateCatagorySubmitHandler}
     >    
       <h1>Update Catagory</h1>

       <div>
         <CategoryIcon />
         <input
           type="text"
           placeholder="Catagory"
           value={cata}
           required
           onChange={(e) => setCata(e.target.value)}
         />
       </div>
       <Button
         id="createProductBtn"
         type="submit"
          disabled={cloading ? true : false}
       >
         UPDATE
       </Button>
     </form>
   )}
 </div>
    
    </>:<h3>You are not Authorised</h3>}</Layout>
)}

export default UpdateCatagory