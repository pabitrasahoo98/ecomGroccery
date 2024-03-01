import React from 'react'
import Layout from '../components/layout/Layout'
import "./Success.css"
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Success = () => {
  return (
    <Layout>
    <div className="orderSuccess">
    <CheckCircleIcon />

    <Typography>Your Order has been Placed successfully </Typography>
    <Link to="/profile/yourorders">View Orders</Link>
    </div>
  </Layout>
  )
}

export default Success