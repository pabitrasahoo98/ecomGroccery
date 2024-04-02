import React, { useEffect, useRef, useState } from 'react'
import Layout from '../components/layout/Layout'
import "./Products.css";
import Product from '../components/layout/Product'
import Loader from '../components/layout/Loader';
import { getProduct } from '../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {Button, MenuItem, Select, Typography} from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Swal from 'sweetalert2';
import ResponsivePagination from 'react-responsive-pagination';
import { dropEllipsis, dropNav, combine } from 'react-responsive-pagination/narrowBehaviour';
import 'bootstrap/dist/css/bootstrap.css';
import { fetchBrand, fetchSubcatagory } from '../actions/catagoryAction';


 

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
  const {subC,subCSuccess}=useSelector((state)=>state.subcatagory);
  const {brand,brandSuccess}=useSelector((state)=>state.brand);
  const [currentPage,setCurrentPage]=useState(1);
  const [sortOption, setSortOption] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [brad, setBrad] = useState('');
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
    dispatch(getProduct(keyword, currentPage, catagory, sortOption, subCategory, brad));
    
    }
  

    
  }, [dispatch,currentPage,catagory,subCategory, brad,sortOption,error])
  
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const setCurrentPageNo = (page) => {
    setCurrentPage(page);
  };
  const handleCategoryChange = (selectedCategory,id) => {
  dispatch(fetchSubcatagory(id));
  dispatch(fetchBrand(id));
  setSubCategory(''); // Reset subcategory when category changes
  setBrad(''); // Reset brand when category changes
  setCurrentPage(1);
    navigate(`/products/category/${selectedCategory}`);
  };

  const handleSubCategoryChange = (selectedSubCategory) => {
    setSubCategory(selectedSubCategory);
    setCurrentPage(1); // Reset current page to 1 when subcategory changes
  };

  const handleBrandChange = (selectedBrand) => {
    setBrad(selectedBrand);
    setCurrentPage(1); // Reset current page to 1 when brand changes
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
                }} key={key} onClick={() => handleCategoryChange(item.catagory,item._id)}>{item.catagory}</Button>
              ))}
            </Slider>
          </div>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {product && product.map((p) => (
              <Product key={p._id} product={p} />
            ))}
          </div>
          <div className='filter'>
            <div className="sortDropdown">
<Select value={sortOption}
    onChange={handleSortChange} displayEmpty style={{
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize:'10px',
    color: '#333', // Text color
    backgroundColor: '#fff', // Background color
    border: '1px solid #DAA520', // Border
    padding: '1px 5px', // Padding
    width: '200px', // Width
    
  }}
  sx={{
    '@media (max-width: 600px)': {
      width: 'auto', // Allow width to adjust dynamically on smaller screens
      minWidth: '100px', // Set a minimum width to prevent collapsing
      fontSize: '5px', // Custom font size for smaller screens
    }
  }}>
                <MenuItem value="">
                  Sort by(No Selection)
                </MenuItem>
                <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
                <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
              </Select>
            </div>

{ (catagory) &&<div className="sortDropdown">
<Select value={subCategory}
disabled={subCSuccess ? false :true}
    onChange={(e)=>handleSubCategoryChange(e.target.value)} displayEmpty style={{
    fontFamily: 'Arial',
    fontSize:'10px',
    fontWeight: 'bold',
    color: '#333', // Text color
    backgroundColor: '#fff', // Background color
    border: '1px solid #DAA520', // Border
    padding: '1px 5px', // Padding
    width: '200px', // Width
    
  }}
  sx={{
    '@media (max-width: 600px)': {
      width: 'auto', // Allow width to adjust dynamically on smaller screens
      minWidth: '100px', // Set a minimum width to prevent collapsing
      fontSize: '5px', // Custom font size for smaller screens
    }
  }}>
               <MenuItem value="">
                  Filter(No Selection)
                </MenuItem>
                {subC.map((scate) => (
                  <MenuItem key={scate.subCatagory} value={scate.subCatagory}>
                    {scate.subCatagory}
                  </MenuItem>
                ))} 
              </Select>
            </div>
}


{(catagory) &&<div className="sortDropdown">
<Select value={brad}
disabled={brandSuccess ? false :true}
    onChange={(e)=>handleBrandChange(e.target.value)} displayEmpty style={{
    fontFamily: 'Arial',
    fontSize:'10px',
    fontWeight: 'bold',
    color: '#333', // Text color
    backgroundColor: '#fff', // Background color
    border: '1px solid #DAA520', // Border
    padding: '1px 5px', // Padding
    width: '200px', // Width
    
  }}
  sx={{
    '@media (max-width: 600px)': {
      width: 'auto', // Allow width to adjust dynamically on smaller screens
      minWidth: '100px', // Set a minimum width to prevent collapsing
      fontSize: '5px', // Custom font size for smaller screens
    }
  }}>
               <MenuItem value="">
                  Brands(No Selection)
                </MenuItem>
                {brand.map((b) => (
                  <MenuItem key={b.brand} value={b.brand}>
                    {b.brand}
                  </MenuItem>
                ))}
              </Select>
            </div>
}
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