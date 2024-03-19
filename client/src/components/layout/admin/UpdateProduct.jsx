import React, { useEffect, useRef, useState } from 'react'
import Layout from '../Layout'
import { useDispatch, useSelector } from 'react-redux';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ScaleIcon from '@mui/icons-material/Scale';
import { Button } from '@mui/material';
import "./AddProduct.css";
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { UPDATE_PRODUCT_RESET } from '../../../reducers/manipulateProductReducer';
import { updateProduct,clearUPerrors, getProductDetails, clearProductErrors} from '../../../actions/productAction';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateProduct = ({role}) => {

    const {id}=useParams();
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const {catalog}=useSelector((state)=>state.catagories)
    const { loading, error, isUpdate } = useSelector((state) => state.maniProduct);
    const { product,error:pError } = useSelector((state) => state.product);
    const [name, setName] = useState("");
    const [qty, setQty] = useState("");
    const [price, setPrice] = useState(0);
    const [mrp, setMrp] = useState(0);
    const [dod,setDod]=useState(false);
    const [de,setDe]=useState(false);
    const [td,setTd]=useState(false);
    const [description, setDescription] = useState("");
    const [catagory, setCatagory] = useState("");
    const [stock, setStock] = useState(0);
    const [oldImages, setOldImages] = useState([]);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const targetRef=useRef(null);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("mrp", mrp);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("qty", qty);
        myForm.set("catagory", catagory);
        myForm.set("stock", stock);
        myForm.set("dod",dod);
        myForm.set("td", td);
        myForm.set("de", de);

    
        images.forEach((image) => {
          myForm.append("images", image);
        });
        dispatch(updateProduct(id,myForm))
        
      }
      const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
        setOldImages([]);
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

        if(targetRef.current){
          targetRef.current.scrollIntoView({behavior:'smooth'});
        }
        if (product && product._id !== id) {
            dispatch(getProductDetails(id));
          }else{
            setName(product.name);
            setDescription(product.description);
            setMrp(product.mrp);
            setPrice(product.price);
            setQty(product.qty);
            setCatagory(product.catagory);
            setStock(product.stock);
            setDod(product.dod);
            setDe(product.de);
            setTd(product.td);
            setOldImages(product.images);
        }
        if(pError){
          Swal.fire({
            title: "Error",
            text: pError,
            icon: "warning"
          })
            dispatch(clearProductErrors());
          }
        if(error){
          Swal.fire({
            title: "Error",
            text: error,
            icon: "warning"
          })
          dispatch(clearUPerrors());
        }
        if(isUpdate){
          Swal.fire({
            title: "Success",
            text: "Product Updated successfuly",
            icon: "success"
          })
          dispatch(UPDATE_PRODUCT_RESET());
          navigate("/admin/products");
          window.location.reload();
        }
        
      }, [product,error,isUpdate,dispatch,id,pError,navigate])

  return (
    <div ref={targetRef}>
    <Layout> {(role==="admin")?<>
    <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

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
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
              />
            </div>
            <div>
              <CurrencyRupeeIcon/>
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
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
              <select onChange={(e) => setCatagory(e.target.value)} value={catagory}>
                <option value="">Choose Category</option>
                {catalog.map((cate) => (
                  <option key={cate.catagory} value={cate.catagory}>
                    {cate.catagory}
                  </option>
                ))}
              </select>
            </div>
            <div>
         <LocalOfferIcon />
         <select value={dod} onChange={(e) => setDod(e.target.value)}>
           <option value="">Set Deals of the Day</option>
           <option value="true">True</option>
           <option value="false">False</option>
         </select>
       </div>

       <div>
         <LocalOfferIcon />
         <select value={de} onChange={(e) => setDe(e.target.value)}>
           <option value="">Set Daily Essentials</option>
           <option value="true">True</option>
           <option value="false">False</option>
         </select>
       </div>

       <div>
         <LocalOfferIcon />
         <select value={td} onChange={(e) => setTd(e.target.value)}>
           <option value="">Set Trending Deals</option>
           <option value="true">True</option>
           <option value="false">False</option>
         </select>
       </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>
            <div id="createProductFormImage">
              {oldImages && oldImages.map((image, index) => (
                <img key={index} src={image.url} alt=" old Product Preview" />
              ))}
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
              Update
            </Button>
          </form>
        </div>
      
    
    
 
    </> :<h3>You are not Authorised</h3>}</Layout>
    </div>
  )
}

export default UpdateProduct