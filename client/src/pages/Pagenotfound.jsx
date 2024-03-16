import React from 'react'
import Layout from '../components/layout/Layout'
import ErrorIcon from "@mui/icons-material/Error";
import "./NotFound.css";

import { Link } from "react-router-dom";
import { Typography } from '@mui/material';

const Pagenotfound = () => {
  return (
    <Layout>
    <div className="PageNotFound">
      <ErrorIcon />

      <Typography>Page Not Found </Typography>
      <Link to="/">Home</Link>
    </div>
    </Layout>
  )
}

export default Pagenotfound