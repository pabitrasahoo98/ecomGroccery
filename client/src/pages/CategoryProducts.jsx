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

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
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
                <Button key={key} onClick={() => handleCategoryChange(item.catagory)}>{item.catagory}</Button>
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
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={resultPerPage}
        totalItemsCount={filteredProductsCount}
        onChange={setCurrentPageNo}
        nextPageText="Next"
        prevPageText="Prev"
        firstPageText="1st"
        lastPageText="Last"
        itemClass="page-item"
        linkClass="page-link"
        activeClass="pageItemActive"
        activeLinkClass="pageLinkActive"
      />
    </div> 
  ) : (resultPerPage < productsCount) && (
    <div className="paginationBox">
      <Pagination
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
        activeLinkClass="pageLinkActive"
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