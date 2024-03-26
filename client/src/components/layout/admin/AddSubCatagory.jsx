import React, { useEffect, useRef, useState } from 'react'
import Layout from '../Layout'
import ClassIcon from '@mui/icons-material/Class';
import CategoryIcon from '@mui/icons-material/Category';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../Loader';
import { Button } from '@mui/material';
import { addSubCatagory, clearASCErrors } from '../../../actions/catagoryAction';
import { ADD_SUBCATAGORY_RESET } from '../../../reducers/addPrerequisitionReducer';
import Swal from 'sweetalert2' 
import { useNavigate } from 'react-router-dom';


const AddSubCatagory = ({role}) => {
  const navigate=useNavigate();
  const {scloading,scsuccess,scerror}=useSelector((state)=>state.addPre);
  const { catalog } = useSelector((state) => state.catagories);
  const targetRef=useRef(null);
  const dispatch=useDispatch();
  const [subCatagory, setSubCatagory] = useState("");
  const [catagoryId, setCatagoryId] = useState("");
  const [imgLink, setImgLink] = useState("");
  useEffect(() => {
    if(targetRef.current){
      targetRef.current.scrollIntoView({behavior:'smooth'});
    }
    if(scerror){
      Swal.fire({
        title: "Error",
        text: scerror,
        icon: "warning"
      });
      dispatch(clearASCErrors());
    }
    if(scsuccess){
        Swal.fire({
          title: "Success",
          text: "SubCatagory is live now",
          icon: "success"
        })
      dispatch(ADD_SUBCATAGORY_RESET());
      navigate("/admin/Subcategory");
    }
    
  }, [scerror,scsuccess,dispatch,navigate])
  
  const addSubCatagorySubmitHandler=(e)=>{
    e.preventDefault();
    
    const myForm = new FormData();

    myForm.set("subCatagory",subCatagory);
    myForm.set("catagory",catagoryId);
    myForm.set("imgLink", imgLink);
    dispatch(addSubCatagory(myForm))

  }
  return (

    <div ref={targetRef}>
    
    <Layout>{(role==="admin")?<>

   <div className="newProductContainer">
   {scloading ? (
     <Loader />
   ) : (
     <form
       className="createProductForm"
       encType="multipart/form-data"
       onSubmit={addSubCatagorySubmitHandler}
     >    
       <h1>Add Sub-Category</h1>

       <div>
         <ClassIcon />
         <input
           type="text"
           placeholder="Sub-Category"
           value={subCatagory}
           required
           onChange={(e) => setSubCatagory(e.target.value)}
         />
       </div>
       <div>
        <CategoryIcon />
        <select
                required
                value={catagoryId}
                onChange={(e) => setCatagoryId(e.target.value)}
              >
                <option value="">none</option>
                
                  {catalog.map((item,index) => (
                    <option key={index} value={item._id}>
                      {item.catagory}
                    </option>
                  ))}
              </select>
      </div>

       <div>
         <ClassIcon />
         <input
           type="text"
           placeholder="Sub-Category Image Link"
           value={imgLink}
           required
           onChange={(e) => setImgLink(e.target.value)}
         />
       </div>
       <Button
         id="createProductBtn"
         type="submit"
          disabled={scloading ? true : false}
       >
         ADD
       </Button>
     </form>
   )}
 </div>
    
    </>:<h3>You are not Authorised</h3>}</Layout>
    </div>
  )
}

export default AddSubCatagory