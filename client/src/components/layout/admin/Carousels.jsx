import React from 'react'
import Layout from '../Layout'

const Carousels = ({role}) => {
  return (
    <Layout>
    {(role==="admin")?
   <> carousel</>
   :<h3>You are not Authorised</h3>}</Layout>
  )
}

export default Carousels