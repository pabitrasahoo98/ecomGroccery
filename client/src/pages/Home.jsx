import React, { useEffect } from 'react'
import Layout from '../components/layout/Layout'
import './home.css'
import Product from '../components/layout/Product'
import Carousele from '../components/layout/Carousele';
import Loader from '../components/layout/Loader';
import { getProduct } from '../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import CatSlider from '../components/layout/CatSlider';


const Home = () => {
  const dispatch=useDispatch();
  const{loading,error,product}=useSelector((state)=>state.products);
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch])

  
 
  return (
    <Layout>{loading?<Loader/>:<><Carousele className="banner" />
    <h3 className='homeHeading1'>Featured Catagories</h3>
    <CatSlider/>
    <h2 className='homeHeading'>Top Deals</h2>
    <div className='container' id='container'>
      {product&&product.map(p=>(<Product product={p}/>))}
      
    </div></>}

    
    </Layout>
  )
}

export default Home