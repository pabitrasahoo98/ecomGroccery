import React, { useEffect, useState } from 'react'
import "./Shipping.css"
import Layout from '../components/layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import {saveShippingInfo } from '../actions/cartAction'
import PinDropIcon from '@mui/icons-material/PinDrop';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIcon from '@mui/icons-material/Phone';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { useNavigate } from 'react-router-dom'


const Shipping = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {user}=useSelector((state)=>state.user)
    const {shippingInfo}=useSelector((state)=>state.cart);
    
    const {shippingPinCodes}=useSelector((state)=>state.catagories);

    const [address,setAdress]=useState(shippingInfo.address);
    const city=(shippingInfo.city?shippingInfo.city:"Bhubaneswar");
    const state=(shippingInfo.state?shippingInfo.state:"Odisha");
    const country=(shippingInfo.country?shippingInfo.country:"India");
    const [pinCode,setPinCode]=useState(shippingInfo.pinCode);
    const [phoneNo,setPhoneNo]=useState(shippingInfo.phoneNo?shippingInfo.phoneNo:user.mobileNo);



    const shippingSubmit=(e)=>{
        e.preventDefault();
        if(phoneNo.length<10||phoneNo.length>10){
            window.alert("Mobile number should be 10 Digit");
            return
        }
        dispatch(saveShippingInfo({address,city,state,country,pinCode,phoneNo}));
        navigate("/order/confirm");

    }

  return (
    <Layout>

<div className="shippingContainer">
  <div className="shippingBox">
    <h2 className="shippingHeading">Shipping Details</h2>

    <form
      className="shippingForm"
      encType="multipart/form-data"
      onSubmit={shippingSubmit}

    >
      <div>
        <HomeIcon />
        <input
          type="text"
          placeholder="Address"
          required
          value={address}
          onChange={(e) => setAdress(e.target.value)}

        
        />
      </div>

      <div>
        <LocationCityIcon />
        <input
          type="text"
          disabled
          value={city}
        />
      </div>

      <div>
        <PinDropIcon />
        <select
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              >
                <option value="">Pincode</option>
                
                  {shippingPinCodes.map((item) => (
                    <option key={item.pinCode} value={item.pinCode}>
                      {item.pinCode}
                    </option>
                  ))}
              </select>
      </div>

      <div>
        <PhoneIcon />
        <input
          type="number"
          placeholder="Phone Number"
          required
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          size="10"
        />
      </div>

      <div>
        <PublicIcon />

        <input
        type='text'
          disabled
          value={country}
        >
        </input>
      </div>

        <div>
          <TransferWithinAStationIcon />

          <input
        type='text'
          disabled
          value={state}
        >
        </input>
        </div>

      <input
        type="submit"
        value="Continue"
        className="shippingBtn"
      />
    </form>
  </div>
</div>

    </Layout>
  )
}

export default Shipping