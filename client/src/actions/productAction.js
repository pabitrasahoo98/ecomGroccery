import axios from "axios";
import { ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,CLEAR_ERRORS} from "../reducers/productReducer"
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS} from "../reducers/productDetailsReducer"
import { SPRODUCT_FAIL, SPRODUCT_REQUEST, SPRODUCT_SUCCESS,CLEAR_SPERRORS } from "../reducers/sameProductReducer";
import { ADD_PRODUCT_FAIL,ADD_PRODUCT_SUCCESS,ADD_PRODUCT_REQUEST,CLEAR_NPERRORS } from "../reducers/addProductReducer";

//get all product
export const getProduct =(keyword="",currentPage=1,category) =>
  async (dispatch) => {
    try {
      dispatch(ALL_PRODUCT_REQUEST());
      let link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}`;

     if (category) {
        link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&catagory=${category}`;
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



  export const getSProducts =(category) =>
  async (dispatch) => {
    try {
      dispatch(SPRODUCT_REQUEST());
  
      let link = `http://localhost:4000/api/v1/products?catagory=${category}`;
  
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

  //add products
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
//clear orderErrors
export const clearNPrrors =() =>
async (dispatch) => {
dispatch( CLEAR_NPERRORS());
};