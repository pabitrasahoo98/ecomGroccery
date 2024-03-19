import React, { useEffect, useRef, useState } from 'react';
import { TextField, Button, Container, Typography, MenuItem, Select, InputLabel, Grid } from '@mui/material';
import emailjs from '@emailjs/browser';
import Layout from '../components/layout/Layout'
import { useSelector } from 'react-redux';


const ContactForm = () => {
  const targetRef=useRef(null);
  const{user}=useSelector((state)=>state.user);
  const form = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [reason, setReason] = useState('');
  let isSubmited=sessionStorage.getItem("submit");

  useEffect(() => {
    if(targetRef.current){
      targetRef.current.scrollIntoView({behavior:'smooth'});
    }
    if(user){
      setEmail(user.email);
      setName(user.name);
      setMobile(user.mobileNo)
    }
    
  }, [user])
  

  
  const handleChange = (event) => {
      setReason(event.target.value);
    };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_vv03nub', 'template_j8qsd3s', form.current, 'qpwmpwGbIfO2-AD94')
      .then((result) => {
        setStatusMessage('Your message has been sent successfully.');
        // Optionally reset the form fields after successful submission
        setName('');
        setEmail('');
        setMobile('');
        setMessage('');
        setReason("");
        sessionStorage.setItem("submit","true");
      }, (error) => {
        console.log(error.text);
        setStatusMessage('An error occurred. Please try again later.');
      });
  };

  return (
    <div ref={targetRef}>
    <Layout>
      {user?<><Container maxWidth="sm" style={{ marginTop: '20px', marginBottom: '20px' }}>
      <Typography variant="h4" gutterBottom>Contact Us</Typography>
      <form onSubmit={handleSubmit} ref={form}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          variant="outlined"
          style={{ marginBottom: '10px' }}
          value={name}
          name='from_name'
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          style={{ marginBottom: '10px' }}
          type="email"
          value={email}
          name='from_email'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Mobile"
          fullWidth
          margin="normal"
          variant="outlined"
          name='from_phone'
          style={{ marginBottom: '10px' }}
          type="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <InputLabel id="reason-label">Reason/Purpose</InputLabel>
        <Select
          labelId="reason-label"
          id="reason-select"
          name='reason'
          value={reason}
          onChange={handleChange}
          label="Reason/Purpose"
          fullWidth
        >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value="Place Order">Place order</MenuItem>
          <MenuItem value="Delivery Issue">Delivery issue</MenuItem>
          <MenuItem value="Product Related">Product inquiry</MenuItem>
          <MenuItem value="Account Related">Account Related</MenuItem>
          
          
        </Select>
        <TextField
          label="Message"
          fullWidth
          margin="normal"
          variant="outlined"
          style={{ marginBottom: '10px' }}
          multiline
          rows={4}
          value={message}
          name='message'
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        {!isSubmited?<Button type="submit" variant="contained"  style={{ marginTop: '10px',backgroundColor:"#daa520" }} >
          Submit
        </Button>:<Typography color="#00ff00">Query Generated.Team will contact You soon.</Typography>}
      </form>
      {statusMessage && <Typography variant="body1" color={statusMessage.includes('error') ? 'error' : 'success'} style={{ marginTop: '10px' }}>{statusMessage}</Typography>}
    </Container></>:<><Container>
      <Typography variant="h2" gutterBottom>Contact Us</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>Contact Information</Typography>
          <Typography variant="body1">
            Email: info@example.com<br />
            Phone: +91 993 880 0359
          </Typography>
        </Grid>
      </Grid>
    </Container></>
    
      
    }
    </Layout>
    </div>
  );
};

export default ContactForm;
