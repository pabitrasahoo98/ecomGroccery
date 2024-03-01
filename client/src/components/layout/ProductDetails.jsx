import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import "./ProductDetails.css"
import {useDispatch, useSelector } from 'react-redux'
import { getProductDetails, getSProducts } from '../../actions/productAction'
import { useLocation} from 'react-router-dom'
import { Paper, Rating, Typography } from '@mui/material'
import Layout from './Layout'
import Loader from './Loader'
import { addItemsToCart } from '../../actions/cartAction'
import Product from '../layout/Product'

const ProductDetails = () => {
    const dispatch=useDispatch();
    const location=useLocation();
    const id=location.state.id;
    const {product,loading,error}=useSelector(state=>state.product)
    
    useEffect(() => {
      dispatch(getProductDetails(id))
      dispatch(getSProducts(product.catagory))
    }, [dispatch,id]);
    
    const {sProduct,sloading,serror}=useSelector(state=>state.sameProduct)
    const options = {
        size: "large",
        value: 4.5,
        isHalf:true,
        readOnly: true,
        precision: 0.5,
      };

      const [quantity,setquantity]=useState(1);
    const increaseQuantity=()=>{
     if(product.stock<=quantity)return
      const qty=quantity+1;
      setquantity(qty);
    }
    const decreaseQuantity=()=>{
      if(1>=quantity)return
      const qty=quantity-1;
      setquantity(qty);
    }
    const addToCartHandller=(e)=>{
      e.preventDefault();
      dispatch(addItemsToCart(id,quantity))
      window.alert("item added successfully");

    }
    
    
  return (
    <Layout>
        <>{loading?<Loader/>:<>
    <div className='ProductDetails'>
        <div>
        <Carousel className='CarouselImage'>
          
                {product.images &&
                  product.images.map((item, i) => (
                    <Paper><img
                    
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                      style={{width:"100%",height:"25vh"}}
                    ></img></Paper>
                    
                  ))} 
                  
              </Carousel>
        </div>
        <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
              </div>
              <div className="detailsBlock-3">
                <span><s>{`₹${product.mrp}`}</s><span>{Math.ceil((product.mrp-product.price)/product.mrp*100)}% off<span>{`₹${product.price}`}</span></span></span>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input disabled type="number" name='quantity' value={quantity}/>
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={addToCartHandller}
                    disabled={product.stock < 1 ? true : false}
                
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
</div>
 </div>
 <div>
 <h2 className='ProductsHeading'>Similar Products</h2>
 <div className="Products">
         {sProduct &&
         sProduct.map((p) => (
         <Product key={p._id} product={p}/>))}
         </div>
 </div></>
 }</>
    </Layout>
  )
}

export default ProductDetails