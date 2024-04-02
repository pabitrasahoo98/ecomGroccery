import axios from "axios";
import { ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,CLEAR_ERRORS} from "../reducers/productReducer"
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS} from "../reducers/productDetailsReducer"
import { SPRODUCT_FAIL, SPRODUCT_REQUEST, SPRODUCT_SUCCESS,CLEAR_SPERRORS } from "../reducers/sameProductReducer";
import { ADD_PRODUCT_FAIL,ADD_PRODUCT_SUCCESS,ADD_PRODUCT_REQUEST,CLEAR_NPERRORS } from "../reducers/addProductReducer";
import { CLEAR_DPERRORS, CLEAR_UPERRORS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "../reducers/manipulateProductReducer";
 
//get all product
export const getProduct = (keyword = "", currentPage = 1, category, sortOption, subcatagory, brand) =>
  async (dispatch) => {
    try {
      dispatch(ALL_PRODUCT_REQUEST());
      let link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&sort=${sortOption}`;

      if (category) {
        link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&sort=${sortOption}&catagory=${category}`;
      }

      if (subcatagory) {
        link += `&subcatagory=${subcatagory}`;
      }

      if (brand) {
        link += `&brand=${brand}`;
      }

      const { data } = await axios.get(link);

      dispatch(ALL_PRODUCT_SUCCESS(data));
      
    } catch (error) {
      dispatch(ALL_PRODUCT_FAIL(error.response.data.message));
    }
  };
  //get a product
export const getProductDetails =(id) =>
async (dispatch) => {
  try {
    dispatch(PRODUCT_DETAILS_REQUEST());

    let link = `http://localhost:4000/api/v1/product/${id}`;

    const { data } = await axios.get(link);

    dispatch(PRODUCT_DETAILS_SUCCESS(data));
    
  } catch (error) {
    dispatch(PRODUCT_DETAILS_FAIL(error.response.data.message));
  }
};
//clear product Errors
export const clearProductErrors =() =>
async (dispatch) => {
  dispatch( CLEAR_ERRORS());
};

//get similar products



  export const getSProducts =(category,subcategory) =>
  async (dispatch) => {
    try {
      dispatch(SPRODUCT_REQUEST());
      let link = `http://localhost:4000/api/v1/products?catagory=${category}`;
      if (subcategory) {
        link += `&subcatagory=${subcategory}`;
      }
  
      const { data } = await axios.get(link);
  
      dispatch(SPRODUCT_SUCCESS(data)); 
      
    } catch (error) {
      dispatch(SPRODUCT_FAIL(error.response.data.message));
    }
  };
  //clear product Errors
  export const clearSProductErrors =() =>
  async (dispatch) => {
    dispatch( CLEAR_SPERRORS())
  };

  //get  products--admin
  export const getAdminProducts =() =>
  async (dispatch) => {
    try {
      dispatch(ADMIN_PRODUCT_REQUEST());
  
      let link = `http://localhost:4000/api/v1/admin/products`;
  
      const { data } = await axios.get(link,{withCredentials:true});
  
      dispatch(ADMIN_PRODUCT_SUCCESS(data)); 
      
    } catch (error) {
      dispatch(ADMIN_PRODUCT_FAIL(error.response.data.message));
    }
  };

  //add products--admin
export const createProduct=(productData)=>async(dispatch)=>{

  try {
      dispatch(ADD_PRODUCT_REQUEST())
      const config={headers:{"Content-Type":"application/json"},withCredentials:true}
      const {data}=await axios.post(`http://localhost:4000/api/v1/admin/product/new`,productData,config);
      dispatch(ADD_PRODUCT_SUCCESS(data));
      
  } catch (error) {
  dispatch(ADD_PRODUCT_FAIL(error.response.data.message))
  }

}
//clear add Product error
export const clearNPrrors =() =>
async (dispatch) => {
dispatch( CLEAR_NPERRORS());
};


  //delete products--admin
  export const deleteProduct=(id)=>async(dispatch)=>{

    try {
        dispatch(DELETE_PRODUCT_REQUEST())
        const config={headers:{"Content-Type":"application/json"},withCredentials:true}
        const {data}=await axios.delete(`http://localhost:4000/api/v1/admin/product/${id}`,config);
        dispatch(DELETE_PRODUCT_SUCCESS(data));
        
    } catch (error) {
    dispatch(DELETE_PRODUCT_FAIL(error.response.data.message))
    }
  
  }
   //clear dELETE Product error
   export const clearDPrrors =() =>
   async (dispatch) => {
   dispatch( CLEAR_DPERRORS());
   };
 

   //update products--admin
   export const updateProduct=(id,productData)=>async(dispatch)=>{

    try {
        dispatch(UPDATE_PRODUCT_REQUEST())
        const config={headers:{"Content-Type":"application/json"},withCredentials:true}
        const {data}=await axios.put(`http://localhost:4000/api/v1/admin/product/${id}`,productData,config);
        dispatch(UPDATE_PRODUCT_SUCCESS(data.success));
        
    } catch (error) {
    dispatch(UPDATE_PRODUCT_FAIL(error.response.data.message))
    }
  
  }
 
   //clear update Product error
   export const clearUPerrors =() =>
   async (dispatch) => {
   dispatch( CLEAR_UPERRORS());
 
   };