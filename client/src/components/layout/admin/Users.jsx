import React from 'react'
import Layout from '../Layout'

const Users = ({role}) => {
  return (
    <Layout>
    {(role==="admin")?
   <> Users</>
   :<h3>You are not Authorised</h3>}</Layout>
  )
}

export default Users