import React, { useEffect, useRef, useState } from 'react'
import Layout from '../Layout'
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import CategoryIcon from '@mui/icons-material/Category';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../Loader';
import { Button } from '@mui/material';
import { addBrand, clearBErrors } from '../../../actions/catagoryAction';
import { ADD_BRAND_RESET } from '../../../reducers/addPrerequisitionReducer';
import Swal from 'sweetalert2' 
import { useNavigate } from 'react-router-dom';

const AddBrand = ({role}) => {
  const navigate=useNavigate();
  const {bloading,bsuccess,berror}=useSelector((state)=>state.addPre);
  const { catalog } = useSelector((state) => state.catagories);
  const targetRef=useRef(null);
  const dispatch=useDispatch();
  const [brand, setBrand] = useState("");
  const [catagoryId, setCatagoryId] = useState("");
  useEffect(() => {
    if(targetRef.current){
      targetRef.current.scrollIntoView({behavior:'smooth'});
    }
    if(berror){
      Swal.fire({
        title: "Error",
        text: berror,
        icon: "warning"
      });
      dispatch(clearBErrors());
    }
    if(bsuccess){
        Swal.fire({
          title: "Success",
          text: "Brand is live now",
          icon: "success"
        })
      dispatch(ADD_BRAND_RESET());
      navigate("/admin/brand");
    }
    
  }, [berror,bsuccess,dispatch,navigate])
  
  const addBrandSubmitHandler=(e)=>{
    e.preventDefault();
    
    const myForm = new FormData();

    myForm.set("brand",brand);
    myForm.set("catagory",catagoryId);
    dispatch(addBrand(myForm))

  }
  return (

    <div ref={targetRef}>
    
    <Layout>{(role==="admin")?<>

   <div className="newProductContainer">
   {bloading ? (
     <Loader />
   ) : (
     <form
       className="createProductForm"
       encType="multipart/form-data"
       onSubmit={addBrandSubmitHandler}
     >    
       <h1>Add Brands</h1>

       <div>
         <BrandingWatermarkIcon />
         <input
           type="text"
           placeholder="Brand name"
           value={brand}
           required
           onChange={(e) => setBrand(e.target.value)}
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

       <Button
         id="createProductBtn"
         type="submit"
          disabled={bloading ? true : false}
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

export default AddBrand