import React from "react";
import './app.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import Pagenotfound from "./pages/Pagenotfound";
import Contact from "./pages/Contact"
import About from "./pages/About";
import Products from "./pages/Products"
import Login from "./pages/Login";
import Profile from "./pages/Profile"
import Cart from "./pages/Cart"
import Search from "./pages/Search";
import ProductDetails from "./components/layout/ProductDetails";
import store from "./Store";
import { loadUser,clearErrors } from "./actions/userAction";
import { useSelector } from "react-redux";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Shipping from "./pages/Shipping";
import ConfirmOrder from "./pages/ConfirmOrder";
import { fetchCarousel, fetchCatagories, fetchPinCodes } from "./actions/catagoryAction";
import Success from "./pages/Success";
import OrderDetails from "./pages/OrderDetails";
import Dashboard from "./components/layout/admin/Dashboard";
import OrdersList from "./components/layout/admin/OrdersList";
import AdminProducts from "./components/layout/admin/AdminProducts";
import Users from "./components/layout/admin/Users";
import Catagory from "./components/layout/admin/Catagory";
import Carousels from "./components/layout/admin/Carousels";
import AddProduct from "./components/layout/admin/AddProduct";
import UpdateProduct from "./components/layout/admin/UpdateProduct";
import ProcessOrder from "./components/layout/admin/ProcessOrder";
import UpdateUser from "./components/layout/admin/UpdateUser";
import Pincode from "./components/layout/admin/Pincode";
import AddCatagory from "./components/layout/admin/AddCatagory";
import UpdateCatagory from "./components/layout/admin/UpdateCatagory";
import AddPincode from "./components/layout/admin/AddPincode";
import UpdatePincode from "./components/layout/admin/UpdatePincode";
import AddCarousel from "./components/layout/admin/AddCarousel";
import UpdateCarousel from "./components/layout/admin/UpdateCarousel";
import CategoryProducts from "./pages/CategoryProducts";
import { fetchDE, fetchDod, fetchTD } from "./actions/dealsAction";
import webFont from "webfontloader";
import SubCatagory from "./components/layout/admin/SubCatagory";
import AddSubCatagory from "./components/layout/admin/AddSubCatagory";
import Brands from "./components/layout/admin/Brands";
import AddBrand from "./components/layout/admin/AddBrand";



function App() {
  const {loading,error,isAuthenticate,user}=useSelector(state=>state.user);
  
  React.useEffect(()=>{
    webFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
    store.dispatch(loadUser());
    store.dispatch(fetchCatagories());
    store.dispatch(fetchPinCodes());
    store.dispatch(fetchCarousel());
    store.dispatch(fetchDod());
    store.dispatch(fetchDE());
    store.dispatch(fetchTD());
    if(error){
      window.alert(error);
      store.dispatch(clearErrors);
    }
  },[])
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route exact path="/products" element={<Products/>}/>
      <Route path="/productdetails" element={<ProductDetails/>}/>
      <Route path="/products/:keyword" element={<Products/>}/>
      <Route path="/products/category/:catagory" element={<CategoryProducts/>}/>
      <Route path="/products" element={<Products/>} />
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/about" element={<About/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/password/forget" element={<ForgotPassword/>} />
      <Route path="/password/reset" element={<ResetPassword/>} />
      {isAuthenticate && <Route path="/profile/:activepage" element={<Profile/>} />}
      <Route path="/cart" element={<Cart/>} />
      <Route path="/search" element={<Search/>} />
      {isAuthenticate && <Route path="/shipping" element={<Shipping/>} />}
      {isAuthenticate && <Route path="/order/confirm" element={<ConfirmOrder/>} />}
      {isAuthenticate && <Route path="/success" element={<Success/>} />}
      {isAuthenticate && <Route path="/order/:id" element={<OrderDetails/>} />}


      {isAuthenticate&& <Route path="/admin/dashboard" element={<Dashboard role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/orders" element={<OrdersList role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/order/:id" element={<ProcessOrder role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/products" element={<AdminProducts role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/products/new" element={<AddProduct role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/product/:id" element={<UpdateProduct role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/users" element={<Users role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/user/:id" element={<UpdateUser role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/category" element={<Catagory role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/catagory/new" element={<AddCatagory role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/catagory/:id" element={<UpdateCatagory role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/pincode" element={<Pincode role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/pincode/new" element={<AddPincode role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/pincode/:id" element={<UpdatePincode role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/carousel" element={<Carousels role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/carousel/new" element={<AddCarousel role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/carousel/:id" element={<UpdateCarousel role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/subcategory" element={<SubCatagory role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/subcatagory/new" element={<AddSubCatagory role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/brand" element={<Brands role={user.role}/>} />}
      {isAuthenticate&& <Route path="/admin/brand/new" element={<AddBrand role={user.role}/>} />}

      <Route path="*" element={<Pagenotfound/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
