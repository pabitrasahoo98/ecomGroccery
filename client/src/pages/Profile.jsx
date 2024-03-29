import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import './profile.css'
import UserSidebar from '../components/layout/profile/UserSidebar'
import AccountSettings from '../components/layout/profile/AccountSetting'
import ChangePassword from '../components/layout/profile/ChangePassword'
import YourOrders from '../components/layout/profile/YourOrders'
import LegalNotice from '../components/layout/profile/LegalNotice'
import Logout from '../components/layout/profile/Logout'
const Profile = () => {
  useEffect(() => {
    if(targetRef.current){
      targetRef.current.scrollIntoView({behavior:'smooth'});
    }
  }, [])
  

  const targetRef=useRef(null);
 
  const {activepage} = useParams();
  return (
    <div ref={targetRef}>
    
<Layout>
   
<div className='userprofile'>

     <div className='userprofilein'>
        <div className='left'>
          <UserSidebar activepage={activepage}/>
        </div>
        <div className='right'>
          {activepage === 'accountsettings' && <AccountSettings/>}
          {activepage === 'changepassword' && <ChangePassword/>}
          {activepage === 'yourorders' && <YourOrders/>}
          {activepage ==='legalnotice' && <LegalNotice/>}
          {activepage ==='logout' && <Logout/>}
        </div>
     </div>
     </div>
    </Layout>
    </div>
   
  )
}

export default Profile