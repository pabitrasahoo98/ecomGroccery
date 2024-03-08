import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import PostAddIcon from '@mui/icons-material/PostAdd';
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import { useSelector, useDispatch } from "react-redux";
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { addCarousel, clearAACARErrors } from '../../../actions/catagoryAction';
import { ADD_CAROUSEL_RESET } from '../../../reducers/addPrerequisitionReducer';

const AddCarousel = ({role}) => {

  const {carloading,carsuccess,carerror}=useSelector((state)=>state.addPre)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [carouselLink, setCarousellink] = useState("");
  const [carouselName, setCarouselName] = useState("");
  useEffect(() => {
    if(carerror){
      window.alert(carerror);
      dispatch(clearAACARErrors());
    }
    if(carsuccess){
      window.alert("Carousel added succesfully");
      dispatch(ADD_CAROUSEL_RESET());
      navigate("/admin/carousel");
    }
    
  }, [carerror,carsuccess,dispatch])
  
  const addCarouselSubmitHandler=(e)=>{
    e.preventDefault();
    
    const myForm = new FormData();

    myForm.set("carouselLink", carouselLink);
    myForm.set("carouselName", carouselName);
    dispatch(addCarousel(myForm))

  }
  return (
    
    <Layout>{(role==="admin")?<>

   <div className="newProductContainer">
   {carloading ? (
     <Loader />
   ) : (
     <form
       className="createProductForm"
       encType="multipart/form-data"
       onSubmit={addCarouselSubmitHandler}
     >    
       <h1>Add Carousel</h1>

       <div>
         <PostAddIcon />
         <input
           type="text"
           placeholder="CarouselLink"
           value={carouselLink}
           required
           onChange={(e) => setCarousellink(e.target.value)}
         />
       </div>
       <div>
         <SpellcheckIcon />
         <input
           type="text"
           placeholder="Carousel Name"
           value={carouselName}
           required
           onChange={(e) => setCarouselName(e.target.value)}
         />
       </div>
       <Button
         id="createProductBtn"
         type="submit"
          disabled={carloading ? true : false}
       >
         ADD
       </Button>
     </form>
   )}
 </div>
    
    </>:<h3>You are not Authorised</h3>}</Layout>
  )
}

export default AddCarousel