import React, { useEffect, useRef } from 'react'
import Layout from '../components/layout/Layout'
import './home.css' 
import Product from '../components/layout/Product'
import Carousele from '../components/layout/Carousele';
import Loader from '../components/layout/Loader';
import { getProduct } from '../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import CatSlider from '../components/layout/CatSlider';
import ProductSlick from '../components/layout/ProductSlick';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Dod from "../images/dod.png"
import CategoryList from '../components/layout/CategoryList';

const Home = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const{loading,error,product}=useSelector((state)=>state.products);
  const{dod,de,td,tdSuccess,dodSuccess,deSuccess,}=useSelector((state)=>state.deals);
  const targetRef=useRef(null);


  useEffect(() => {
    if(targetRef.current){
      targetRef.current.scrollIntoView({behavior:'smooth'});
    }
    if(error){
      Swal.fire({
        title: "Error",
        text: error,
        icon: "warning"
      })
    }
    dispatch(getProduct());
  }, [dispatch,error])

  
 
  return (
    <div ref={targetRef}>
    <Layout>{loading?<Loader/>:<><Carousele className="banner" />
    <h3 className='homeHeading1'>Catagories</h3>
    <CatSlider/>
    {dodSuccess && <>
      <div className="baner">
      <img src={Dod} alt="Banner" className="baner-img" />
    </div>
    <h2 className='homeHeading'>Blockbuster Deals</h2>
    <ProductSlick prod={dod}/></>}

    
    {tdSuccess && <><h2 className='homeHeading'>Trending Deals</h2>
    <ProductSlick prod={td}/></>}

 


    <h2 className='homeHeading'>Shop By Categories</h2>
    <CategoryList/>


    
    {deSuccess && <><h2 className='homeHeading'>Daily Essentials</h2>
    <ProductSlick prod={de}/></>}

   


    <h2 className='homeHeading'>Featured Prouducts</h2>
    <div className='container1'>
      {product&&product.map((p,index)=>(<Product key={index} product={p}/>))}
      
    </div>
    <button className="view-all-btn" onClick={()=>navigate("./products")}>See More</button>
    </>}

    
    </Layout>
    </div>
  )
}

export default Home