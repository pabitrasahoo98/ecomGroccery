import React, { useEffect, useRef } from 'react';
import { Typography, Container, Paper, Grid } from '@mui/material';
import Layout from "../components/layout/Layout"

const About = () => {
  const targetRef=useRef(null);
  useEffect(() => {
    if(targetRef.current){
      targetRef.current.scrollIntoView({behavior:'smooth'});
    }
  }, [])
  
  return (
    <div ref={targetRef}>
    <Layout>    
      <Container>
      <Typography variant="h2" gutterBottom style={{ marginBottom: '20px' }}>
        About Us
      </Typography>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="body1">
          Welcome to NowGrocceries! We are committed to providing high-quality products and excellent customer service to our valued customers. Our mission is to make grocery shopping convenient and enjoyable for everyone.
        </Typography>
      </Paper>
      <Grid container spacing={3} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
              Our History
            </Typography>
            <Typography variant="body1">
              Our grocery store has been serving the community for over 20 years. We started as a small family-owned business and have grown into a trusted destination for fresh produce, pantry essentials, and more.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
              Our Team
            </Typography>
            <Typography variant="body1">
              We have a dedicated team of professionals who are passionate about delivering the best shopping experience to our customers. From our friendly staff in-store to our customer support team online, we're here to help you every step of the way.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </Layout>
    </div>
  );
}

export default About;
