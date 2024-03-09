import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import CategoryIcon from '@mui/icons-material/Category';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { addCatagory, clearAACErrors } from '../../../actions/catagoryAction';
import { ADD_CATAGORY_RESET } from '../../../reducers/addPrerequisitionReducer';
import Swal from 'sweetalert2'

const AddCatagory = ({role}) => {

  const {cloading,csuccess,cerror}=useSelector((state)=>state.addPre)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [catagory, setCatagory] = useState("");
  useEffect(() => {
    if(cerror){
      Swal.fire({
        title: "Error",
        text: cerror,
        icon: "warning"
      });
      dispatch(clearAACErrors());
    }
    if(csuccess){
        Swal.fire({
          title: "Success",
          text: "Catagory is live now",
          icon: "success"
        })
      dispatch(ADD_CATAGORY_RESET());
      navigate("/admin/category");
    }
    
  }, [cerror,csuccess,dispatch,Swal])
  
  const addCatagorySubmitHandler=(e)=>{
    e.preventDefault();
    
    const myForm = new FormData();

    myForm.set("catagory", catagory);
    dispatch(addCatagory(myForm))

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
       onSubmit={addCatagorySubmitHandler}
     >    
       <h1>Add Catagory</h1>

       <div>
         <CategoryIcon />
         <input
           type="text"
           placeholder="Catagory"
           value={catagory}
           required
           onChange={(e) => setCatagory(e.target.value)}
         />
       </div>
       <Button
         id="createProductBtn"
         type="submit"
          disabled={cloading ? true : false}
       >
         ADD
       </Button>
     </form>
   )}
 </div>
    
    </>:<h3>You are not Authorised</h3>}</Layout>
  )
}

export default AddCatagory