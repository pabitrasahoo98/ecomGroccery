import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import AdminOptions from './admin/AdminOptions'
import { useSelector } from 'react-redux'

const Layout = ({children}) => {
  const {isAuthenticate,user}=useSelector(state=>state.user);
  const[isAdmin,setIsAdmin]=useState(false);
  useEffect(() => {
    if(isAuthenticate){
        if(user.role==="admin"){
        setIsAdmin(true);
        }}
}, [isAuthenticate])

  return (<>
    <Header/>
    {isAdmin&&<AdminOptions/>}
    <div>{children}</div>
    <Footer/>
    </>
  )
}

export default Layout