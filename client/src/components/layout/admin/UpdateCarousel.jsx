import React, { useEffect, useRef, useState } from 'react'
import Layout from '../Layout'
import PostAddIcon from '@mui/icons-material/PostAdd';
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import { useSelector, useDispatch } from "react-redux";
import Loader from '../Loader';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_CAROUSEL_RESET} from '../../../reducers/updatePrerequisitionReducer';
import { carouselDetails, clearCARDErrors, clearUCARErrors, updateCarousel} from '../../../actions/catagoryAction';
import Swal from 'sweetalert2';

const UpdateCarousel = ({role}) => {
  const [carouselLink,setCarouselLink]=useState("");
  const [carouselName,setCarouselName]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {id}=useParams();
  const { carloading, carerror, Carousel } = useSelector((state) => state.getPre);
    
  const {
    carerror: updateError,
    iscarupdate,
  } = useSelector((state) => state.updatePre);

  const targetRef=useRef(null);

  useEffect(() => {
    if(targetRef.current){
      targetRef.current.scrollIntoView({behavior:'smooth'});
    }
    if (Carousel && Carousel._id !== id) {
        dispatch(carouselDetails(id));
      } else {
        setCarouselLink(Carousel.carouselLink);
        setCarouselName(Carousel.carouselName);
      }
      if (carerror) {
        Swal.fire({
          title: "Error",
          text: carerror,
          icon: "warning"
        })
        dispatch(clearCARDErrors());
      }
  
      if (updateError) {
        Swal.fire({
          title: "Error",
          text: updateError,
          icon: "warning"
        })
        dispatch(clearUCARErrors());
      }
  
      if (iscarupdate) {
        Swal.fire({
          title: "Success",
          text: "Carousel Updated succesfully",
          icon: "success"
        })
        navigate("/admin/carousel");
        dispatch(UPDATE_CAROUSEL_RESET());
        window.location.reload();
      }

}, [Carousel,dispatch,carerror,updateError,iscarupdate,id,navigate])

const updateCarouselSubmitHandler=(e)=>{
  e.preventDefault();
  const myForm = new FormData();
  myForm.set("carouselLink", carouselLink);
  myForm.set("carouselName", carouselName);

  dispatch(updateCarousel(id, myForm));
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
       onSubmit={updateCarouselSubmitHandler}
     >    
       <h1>Update Carousel</h1>

       <div>
         <PostAddIcon/>
         <input
           type="text"
           placeholder="CarouselLink"
           value={carouselLink}
           required
           onChange={(e) => setCarouselLink(e.target.value)}
         />
       </div>
       <div>
         <SpellcheckIcon/>
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
         UPDATE
       </Button>
     </form>
   )}
 </div>
    
    </>:<h3>You are not Authorised</h3>}</Layout>
    </div>
  )
}

export default UpdateCarousel