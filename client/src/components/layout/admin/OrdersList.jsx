import React from 'react'
import Layout from '../Layout'

const OrdersList = ({role}) => {
  return (
    <Layout>
    {(role==="admin")?
   <> Orders</>
   :<h3>You are not Authorised</h3>}</Layout>
  )
}

export default OrdersList