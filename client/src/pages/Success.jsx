import React, { useRef } from 'react'
import Layout from '../components/layout/Layout'
import "./Success.css"
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Success = () => {
  const targetRef=useRef (null);
  return (
    <div ref={targetRef}>
    <Layout>
    <div className="orderSuccess">
    <CheckCircleIcon />

    <Typography>Your Order has been Placed successfully </Typography>
    <Link to="/profile/yourorders">View Orders</Link>
    </div>
  </Layout>
  </div>
  )
}

export default Success