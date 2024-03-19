import React, { useEffect, useRef, useState } from 'react'
import Layout from '../Layout'
import PostAddIcon from '@mui/icons-material/PostAdd';
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import { useSelector, useDispatch } from "react-redux";
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { addCarousel, clearAACARErrors } from '../../../actions/catagoryAction';
import { ADD_CAROUSEL_RESET } from '../../../reducers/addPrerequisitionReducer';
import Swal from 'sweetalert2' 

const AddCarousel = ({role}) => {

  const targetRef=useRef(null);
  const {carloading,carsuccess,carerror}=useSelector((state)=>state.addPre)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [carouselLink, setCarousellink] = useState("");
  const [carouselName, setCarouselName] = useState("");
  useEffect(() => {
    if(targetRef.current){
      targetRef.current.scrollIntoView({behavior:'smooth'});
    }
    if(carerror){
      Swal.fire({
        title: "Error",
        text: carerror,
        icon: "warning"
      });
      dispatch(clearAACARErrors());
    }
    if(carsuccess){
      Swal.fire({
        title: "Success",
        text: "Carousel is live now",
        icon: "success"
      });
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
    <div ref={targetRef}>
    
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
    </div>
  )
}

export default AddCarousel