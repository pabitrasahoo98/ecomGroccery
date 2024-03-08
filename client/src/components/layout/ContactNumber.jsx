import React from 'react';
import { Paper, Typography } from '@mui/material';



const ContactNumber = () => {

    const bannerStyle = {
        backgroundColor: '#daa520 ',
        color: 'white',
        padding: '10px',
        textAlign: 'center',
      };
    
    const phoneNumberStyle = {
        backgroundColor:'white',
        margin:'0',
        fontSize: '1.5em',
        fontWeight: 'bold',
        textAlign:'center'
      };

  return (
    <Paper>
      <Typography variant="body1" gutterBottom style={bannerStyle}>
        For inquiries, call us at:
      </Typography>
      <Typography variant="h5" component="p" style={phoneNumberStyle}>
        993-880-0359
      </Typography>
    </Paper>
  );
}

export default ContactNumber;
