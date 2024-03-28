import React, { useEffect, useRef, useState } from 'react'
import Layout from '../components/layout/Layout'
import "./Products.css";
import Product from '../components/layout/Product'
import Loader from '../components/layout/Loader';
import { getProduct } from '../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import {Button, MenuItem, Select, Typography} from '@mui/material';
import Slider from 'react-slick';
import Swal from 'sweetalert2';
import ResponsivePagination from 'react-responsive-pagination';
import { dropEllipsis, dropNav, combine } from 'react-responsive-pagination/narrowBehaviour';
import 'bootstrap/dist/css/bootstrap.css';


 

const CategoryProducts = () => {
  const targetRef=useRef(null);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };


  let {catagory}=useParams();
  const {catalog}=useSelector((state)=>state.catagories);
  const [currentPage,setCurrentPage]=useState(1);
  const [sortOption, setSortOption] = useState('');
  const navigate=useNavigate();
  
  const dispatch=useDispatch();
  const keyword="";
  const { loading, error, product, productsCount, resultPerPage ,filteredProductsCount} = useSelector((state) => state.products);

  
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
    if(catagory){
    dispatch(getProduct(keyword,currentPage,catagory,sortOption));
    
    }
  

    
  }, [dispatch,currentPage,catagory,sortOption,error])
  
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const setCurrentPageNo = (page) => {
    setCurrentPage(page);
  };
  const handleCategoryChange = (selectedCategory) => {
    setCurrentPage(1); // Reset current page to 1 when category changes
    navigate(`/products/category/${selectedCategory}`);
  };

  return (
    <div ref={targetRef}>
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Typography align="center" variant="h5" style={{ color: 'black', fontWeight: 'bold', borderBottom: '2px solid goldenrod' }}>Categories</Typography>
          <div className="product-list">
            <Slider {...settings}>
              {catalog && catalog.map((item, key) => (
                <Button  sx={{
                  fontSize: '16px', // Default font size
                  width: '150px', // Add a fixed width to prevent overlapping
                  mr: '10px', // Add margin-right between buttons
                  mb: '10px', // Add margin-bottom below buttons
                  '@media (max-width: 768px)': { // Media query for smaller screens
                    fontSize: '9px', // Decrease font size for smaller screens
                    width: '120px', // Decrease width for smaller screens
                  },
                }} key={key} onClick={() => handleCategoryChange(item.catagory)}>{item.catagory}</Button>
              ))}
            </Slider>
          </div>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {product && product.map((p) => (
              <Product key={p._id} product={p} />
            ))}
          </div>

          <div className="sortDropdown">
<Select value={sortOption}
    onChange={handleSortChange} displayEmpty style={{
    fontFamily: 'Arial',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333', // Text color
    backgroundColor: '#fff', // Background color
    border: '1px solid #DAA520', // Border
    padding: '1px 5px', // Padding
    width: '200px', // Width
    
  }}>
                <MenuItem value="" disabled>
                  Sort by
                </MenuItem>
                <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
                <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
              </Select>
            </div>

          <div>{
  catagory ? (currentPage <= Math.ceil(filteredProductsCount / resultPerPage)) && (
    <div className="paginationBox">
       <ResponsivePagination
                  narrowBehaviour={combine(dropNav, dropEllipsis)}
                  current={currentPage}
                  total={Math.ceil(filteredProductsCount / resultPerPage)}
                  onPageChange={page => setCurrentPageNo(page)}
                />
    </div> 
  ) : (resultPerPage < productsCount) && (
    <div className="paginationBox">
      <ResponsivePagination
                  narrowBehaviour={combine(dropNav, dropEllipsis)}
                  current={currentPage}
                  total={Math.ceil(productsCount / resultPerPage) }
                  onPageChange={page => setCurrentPageNo(page)}
                />
    </div>
  )
}</div>
         
        </>
      )}
    </Layout>
  </div>
  )
}

export default CategoryProducts