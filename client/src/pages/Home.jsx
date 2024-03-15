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
    dispatch(getProduct());
  }, [dispatch])

  
 
  return (
    <div ref={targetRef}>
    <Layout>{loading?<Loader/>:<><Carousele className="banner" />
    <h3 className='homeHeading1'>Shop By Catagories</h3>
    <CatSlider/>
    {dodSuccess && <><h2 className='homeHeading'>Deals Of The Day</h2>
    <ProductSlick prod={dod}/></>}

    {deSuccess && <><h2 className='homeHeading'>Daily Essentials</h2>
    <ProductSlick prod={de}/></>}

    {tdSuccess && <><h2 className='homeHeading'>Top Deals</h2>
    <ProductSlick prod={td}/></>}
    <h2 className='homeHeading'>Featured Prouducts</h2>
    <div className='container' id='container'>
      {product&&product.map(p=>(<Product product={p}/>))}
      
    </div>
    <button className="view-all-btn" onClick={()=>navigate("./products")}>See More</button>
    </>}

    
    </Layout>
    </div>
  )
}

export default Home