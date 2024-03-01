import axios from "axios";
import { SAVE_CATAGORY_INFO ,SAVE_PINCODE_INFO,SAVE_CAROUSEL_INFO} from "../reducers/catagoryReducer";

  //saving CATAGORIES
  export const fetchCatagories =() =>
  async (dispatch) => {
    
      let link = `http://localhost:4000/api/v1/catagories`;
      const { data } = await axios.get(link);
      dispatch(SAVE_CATAGORY_INFO(data))
    
    }
//saving pincodes
  export const fetchPinCodes =() =>
  async (dispatch) => {
    
      let link = `http://localhost:4000/api/v1/pincodes`;
      const { data } = await axios.get(link);
      dispatch(SAVE_PINCODE_INFO(data))
    
    }

//saving carousels
export const fetchCarousel =() =>
async (dispatch) => {
  
    let link = `http://localhost:4000/api/v1/carousel`;
    const { data } = await axios.get(link);
    dispatch(SAVE_CAROUSEL_INFO(data))
  
  }