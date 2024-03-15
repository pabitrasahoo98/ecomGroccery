import axios from "axios";
import { SAVE_DE_INFO, SAVE_DOD_INFO, SAVE_TD_INFO } from "../reducers/dealsProductReducer";
  
//saving dod
export const fetchDod =() =>
  async (dispatch) => {
    
      let link = `http://localhost:4000/api/v1/dodproducts`;
      const { data } = await axios.get(link);
      dispatch(SAVE_DOD_INFO(data))
    
    }
//saving de
  export const fetchDE =() =>
  async (dispatch) => {
    
      let link = `http://localhost:4000/api/v1/deproducts`;
      const { data } = await axios.get(link);
      dispatch(SAVE_DE_INFO(data))
    
    }

//saving td
export const fetchTD =() =>
async (dispatch) => {
  
    let link = `http://localhost:4000/api/v1/tdproducts`;
    const { data } = await axios.get(link);
    dispatch(SAVE_TD_INFO(data))
  
  }