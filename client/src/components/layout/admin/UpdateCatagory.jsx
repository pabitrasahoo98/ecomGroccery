import React, { useEffect, useRef, useState } from 'react'
import Layout from '../Layout'
import CategoryIcon from '@mui/icons-material/Category';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../Loader';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_CATAGORY_RESET } from '../../../reducers/updatePrerequisitionReducer';
import {  catagoryDetails, clearCDErrors, clearUCErrors, updateCatagory } from '../../../actions/catagoryAction';
import Swal from 'sweetalert2';

const UpdateCatagory = ({role}) => {
  const targetRef=useRef(null);
  const [cata,setCata]=useState("");
  const [img,setImg]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {id}=useParams();
  const { cloading, cerror, Catagory } = useSelector((state) => state.getPre);
    
  const {
    error: updateError,
    iscupdate,
  } = useSelector((state) => state.updatePre);

  useEffect(() => {
    if(targetRef.current){
      targetRef.current.scrollIntoView({behavior:'smooth'});
    }
    if (Catagory && Catagory._id !== id) {
        dispatch(catagoryDetails(id));
      } else {
        setCata(Catagory.catagory);
        setImg(Catagory.imgLink)
      }
      if (cerror) {
        Swal.fire({
          title: "Error",
          text: cerror,
          icon: "warning"
        })
        dispatch(clearCDErrors());
      }
  
      if (updateError) {
        Swal.fire({
          title: "Error",
          text: updateError,
          icon: "warning"
        })
        dispatch(clearUCErrors());
      }
  
      if (iscupdate) {
        Swal.fire({
          title: "Succes",
          text: "Category Updated Successfully",
          icon: "success"
        })
        navigate("/admin/category");
        dispatch(UPDATE_CATAGORY_RESET());
        window.location.reload();
      }

}, [Catagory,dispatch,cerror,updateError,iscupdate,id,navigate])

const updateCatagorySubmitHandler=(e)=>{
  e.preventDefault();
  const myForm = new FormData();
  

  myForm.set("catagory", cata);
  myForm.set("imgLink", img);

  dispatch(updateCatagory(id, myForm));
}
  

  return (
    <div ref={targetRef}>
    
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

       <div>
         <CategoryIcon />
         <input
           type="text"
           placeholder="Catagory Img Link"
           value={img}
           required
           onChange={(e) => setImg(e.target.value)}
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
    </div>
)}

export default UpdateCatagory