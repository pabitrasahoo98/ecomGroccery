import React from 'react'
import "./footer.css"
import ContactNumber from './ContactNumber'

const Footer = () => {
  return (
  <div className='contact_us'>
    <ContactNumber/>
    <div className='footer'>
        <div className='leftFooter'>
            <h4>DOWNLOAD OUR APP</h4>
            <p>Downlod App for Android and IOS mobile phone</p>
        </div>
        <div className='midFooter'>
            <h1>NowGrocery</h1> 
            <p>High quality is our first priority</p>
            <p>Copyright 2024 &copy; NowGrocery</p>
        </div>
        <div className='rightFooter'>
            <h4>FOLLOW US</h4>

        </div>
    </div>
    </div>
  )
}

export default Footer