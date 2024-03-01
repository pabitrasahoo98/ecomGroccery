import React from 'react'
import Layout from '../Layout'

const Catagory = ({role}) => {
  return (
    <Layout>
    {(role==="admin")?
   <> Catagory</>
   :<h3>You are not Authorised</h3>}</Layout>
  )
}

export default Catagory