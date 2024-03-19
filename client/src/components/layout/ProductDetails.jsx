import React, { useEffect, useRef, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import "./ProductDetails.css"
import {useDispatch, useSelector } from 'react-redux'
import { getProductDetails, getSProducts } from '../../actions/productAction'
import { useLocation} from 'react-router-dom'
import { Paper, Rating} from '@mui/material'
import Layout from './Layout'
import Loader from './Loader'
import { addItemsToCart } from '../../actions/cartAction'
import Swal from 'sweetalert2'
import ProductSlick from './ProductSlick'

const ProductDetails = () => {
  const targetRef=useRef(null);
    const dispatch=useDispatch();
    const location=useLocation();
    const id=location.state.id;
    const {product,loading,error}=useSelector(state=>state.product)
    const {sProduct,serror}=useSelector(state=>state.sameProduct)
    let pc=product.catagory;
    
    useEffect(() => {
      if(error){
        Swal.fire({
          title: "Error",
          text: error,
          icon: "warning"
        })
      }
      if(serror){
        Swal.fire({
          title: "Error",
          text: error,
          icon: "warning"
        })
      }
      if(targetRef.current){
        targetRef.current.scrollIntoView({behavior:'smooth'});
      }
      dispatch(getProductDetails(id))
      dispatch(getSProducts(pc))
    }, [dispatch,id,pc,error,serror]);
    
    
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
      Swal.fire({
        title: "Success",
        text: "Product Added To Cart",
        icon: "success"
      })

    }
    
    
  return (
    <div ref={targetRef}>
    <Layout>
        <>{loading?<Loader/>:<>
    <div className='ProductDetails'>
        <div>
        <Carousel className='CarouselImage'>
          
                {product.images &&
                  product.images.map((item, i) => (
                    <Paper key={i}><img
                    
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
                <p>Quantity:<span className='productweight'>{product.qty}</span></p>
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
 {sProduct &&<>
 <h2 className='ProductsHeading'>Similar Products</h2>
 <div><ProductSlick prod={sProduct}/></div></>}

 </div></>
 }</>
    </Layout>
    </div>
  )
}

export default ProductDetails