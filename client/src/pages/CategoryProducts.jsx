import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import "./Products.css";
import Product from '../components/layout/Product'
import Loader from '../components/layout/Loader';
import { getProduct } from '../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import {Typography} from '@mui/material';

 

const CategoryProducts = () => {
  let {catagory}=useParams();
  const {catalog}=useSelector((state)=>state.catagories);
  const [currentPage,setCurrentPage]=useState(1);
  const [category,setCategory]=useState("");
  
  const dispatch=useDispatch();
  const keyword="";
  const{loading,error,product,productsCount,resultPerPage}=useSelector((state)=>state.products);
  
  useEffect(() => { 
    if(catagory){
    dispatch(getProduct(keyword,currentPage,catagory));
    catagory=null;
    
    }
    if(category){
        dispatch(getProduct(keyword,currentPage,category));
    }

    
  }, [dispatch,currentPage,category])
  const setCurrentPageNo=(e)=>{
    setCurrentPage(e);

  }
  return (
    <Layout>
        {loading?<Loader/>
        :<> 
        <h2 className="productsHeading">Products</h2>
        <div className="products">
        {product &&
        product.map((p) => (
        <Product key={p._id} product={p}/>))}
        </div>
        <div className='filterBox'>
        <Typography  className='filterBoxT'>MORE CATEGORIES</Typography>
            <ul className="categoryBox">
              {catalog.map((item) => (
                <li
                  className="category-link"
                  key={item.catagory}
                  onClick={() => setCategory(item.catagory)}
                >
                  {item.catagory}
                </li>
              ))}
            </ul>

        </div>
        {resultPerPage<productsCount &&<div className='paginationBox'><Pagination 
        activePage={currentPage}
        itemsCountPerPage={resultPerPage}
        totalItemsCount={productsCount}
        onChange={setCurrentPageNo}
        nextPageText="Next"
        prevPageText="Prev"
        firstPageText="1st"
        lastPageText="Last"
        itemClass="page-item"
        linkClass="page-link"
        activeClass="pageItemActive"
        activeLinkClass="pageLinkActive"/></div>}
        </>}
    </Layout>
    
  )
}

export default CategoryProducts