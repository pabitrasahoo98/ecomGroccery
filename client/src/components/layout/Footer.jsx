import React from 'react'
import "./footer.css"
import ContactNumber from './ContactNumber'
import playStore from "../../images/playstore.png"
import  appStore from "../../images/Appstore.png"
import  Logo from "../../images/logo.png"

const Footer = () => {
  return (
  <div className='contact_us'>
    <ContactNumber/> 
    <div className='footer'>
        <div className='leftFooter'>
            <h4>DOWNLOAD OUR APP</h4>
            <p>Downlod App for Android and IOS mobile phone</p>
            <img src={playStore} alt="playstore" />
            <img src={appStore} alt="Appstore" />
        </div>
        <div className='midFooter'>
            <img src={Logo} alt="NowGrocceries" />
            <p>High quality is our first priority</p>
            <p>Copyright 2024 &copy; NowGrocery</p>
        </div>
        <div className='rightFooter'>
            <h4>FOLLOW US</h4>
            
        <a href="https://www.instagram.com/nowgrocceries/">Instagram</a>
        <a href="https://www.facebook.com/profile.php?id=61557393482487"h>Facebook</a>

        </div>
    </div>
    </div>
  )
}

export default Footer