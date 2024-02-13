import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Merryl Investments
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const  [ loading, setLoading ] = useState(false);
  const [ error, setError] = useState(false);
  const [ success , setSuccess ] = useState(false)
  const [product, setProduct] = React.useState('');

  const handleChange = (event) => {
    setProduct(event.target.value);
    };

  const navigate = useNavigate()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if (success){
      setSuccess(false);
      navigate('/home')
      
    }
    else {
      setError(false)
    }
    
    
    
    
  };
  
  const handleSubmit = (event) => {
    setLoading(true)
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      userName: data.get('userName'),
      password: data.get('password'),
    });

    axios.post('https://merryl-investments-backend.onrender.com/api/v1/member_login',{
        userName: data.get('userName'),
        password: data.get('password')
    }).then(response => {
        setTimeout(() => {
            setLoading(false)
            setSuccess(true)
            
        } , 2000)
        
        console.log(response.data)
    })
    .catch(error => { 
        setTimeout(() => {
            setLoading(false)
            setError(true)
            
            
        } , 2000)
        console.log("Error in log in", error) 
    })
  };

  return (
    <ThemeProvider theme={defaultTheme}>
    {loading && <LinearProgress /> }
    {success &&  <Snackbar open={success} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Request Successful
        </Alert>
      </Snackbar>}

      {error &&  <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Request Failed
        </Alert>
      </Snackbar>}

      

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant='h4'>
            Request Items
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <RequestQuoteIcon />
          </Avatar>
          
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Products </InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={product}
            label="Product"
            onChange={handleChange}
            >
            <MenuItem value={10}>Milk</MenuItem>
            <MenuItem value={20}>Eggs</MenuItem>
            <MenuItem value={30}>Books</MenuItem>
            </Select>
        </FormControl>
    </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}