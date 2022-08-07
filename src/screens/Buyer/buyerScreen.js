import { styled } from '@mui/material/styles';
import { AppBar, Button, CircularProgress, Grid, IconButton, Paper, TextField, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { userContext } from '../../services/AddressProvider';
import { fetchProduct } from '../../services/firebaseAPI';
import Card from './productCard/Card'
import MenuIcon from '@mui/icons-material/Menu';
import './buyerScreen.css'
import { Link } from 'react-router-dom';
import CKAppbar from '../appbar';

export default function BuyerScreen() {
    const [loading,setLoading]=useState(true);
    const [productData,setProductData]= useState([])
    const [test,setTest]= useState(null);
    async function getProdDetails(){
const data = await fetchProduct(false);

if(data){
    setProductData(data);
};
setLoading(false);

    }
    useEffect(()=>{
        getProdDetails();
    },[])
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#1A2027',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
  return (

<Box sx={{ flexGrow: 1 }}>
  <CKAppbar/>

      <img src={require('../../assets/bgbuyer.jpg')}
    width={'100%'}
    height={'auto'}
    style={{maxHeight:"25%"}}
    alt="image"
    />
      <div style={{marginTop:30,marginBottom:30}}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1,justifyContent:'flex-end',textAlign:'left' }}>
          Products
          </Typography> 
      </div>
<Grid container spacing={8}>
{productData.map((i)=>{return(
     <Grid item lg={3}>
<Card test={test?parseInt(test):null} setLoading={setLoading} i={i} />
</Grid>
)})}
</Grid>
<div style={{marginTop:30,marginLeft:30}}
>
<Typography variant="h6" component="div" sx={{ flexGrow: 1,justifyContent:'flex-end',textAlign:'left' }}>
          Testing
          </Typography> 
<Grid xs={12} lg={8} item>
           <TextField label="warranty period(uinx)" onChange={(e)=>setTest(e.target.value)} name="price" placeholder='Enter warranty period for Test' variant="outlined" type={'number'}  required/>
           </Grid>
</div>
</Box>
  )
}
