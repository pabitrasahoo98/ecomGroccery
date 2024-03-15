import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { useDispatch, useSelector } from 'react-redux';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ScaleIcon from '@mui/icons-material/Scale';
import { Button } from '@mui/material';
import "./AddProduct.css";
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { ADD_PRODUCT_RESET } from '../../../reducers/addProductReducer';
import { clearNPrrors, createProduct } from '../../../actions/productAction';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const AddProduct = ({role}) => {

    const navigate=useNavigate();
    const dispatch = useDispatch();
    const {catalog}=useSelector((state)=>state.catagories)
    const { loading, error, success } = useSelector((state) => state.addProduct);
  
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [mrp, setMrp] = useState(0);
    const [description, setDescription] = useState("");
    const [qty, setQty] = useState("");
    const [catagory, setCatagory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("mrp", mrp);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("qty", qty);
        myForm.set("catagory", catagory);
        myForm.set("stock", stock);
    
        images.forEach((image) => {
          myForm.append("images", image);
        });
        dispatch(createProduct(myForm))
        
      }
      const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPreview([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
              setImages((old) => [...old, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
      };
      useEffect(() => {
        if(error){
          Swal.fire({
            title: "Error",
            text: error,
            icon: "warning"
          })
          dispatch(clearNPrrors());
        }
        if(success){
          Swal.fire({
            title: "Success",
            text: "Product is live now",
            icon: "success"
          })
          dispatch(ADD_PRODUCT_RESET());
          navigate("/admin/products");
        }
        
      }, [error,success,dispatch,Swal,navigate])
      
  return (
    <Layout>{(role==="admin")?<>

<div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <ScaleIcon />
              <input
                type="text"
                placeholder="Product Weight or Quantity"
                required
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </div>

            <div>
              <PriceCheckIcon/>
              <input
                type="number"
                placeholder="MRP"
                required
                onChange={(e) => setMrp(e.target.value)}
              />
            </div>
            <div>
              <CurrencyRupeeIcon/>
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            
            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCatagory(e.target.value)}>
                <option value="">Choose Category</option>
                {catalog.map((cate) => (
                  <option key={cate.catagory} value={cate.catagory}>
                    {cate.catagory}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      
    
    
    </>:<h3>You are not Authorised</h3>}</Layout>
  )
}

export default AddProduct