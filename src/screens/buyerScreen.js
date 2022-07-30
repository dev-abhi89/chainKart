import { styled } from '@mui/material/styles';
import { AppBar, Button, CircularProgress, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { userContext } from '../services/AddressProvider';
import { fetchProduct } from '../services/firebaseAPI';
import Card from './productCard/Card'
import MenuIcon from '@mui/icons-material/Menu';
import './sellerScreen.css'
import { Link } from 'react-router-dom';

export default function BuyerScreen() {
    const [loading,setLoading]=useState(true);
    const [productData,setProductData]= useState([])
    const {owner,Address,contract,}= React.useContext(userContext);
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
//    <>{loading?<div className='container'><CircularProgress size ={50}/></div> :<div>
//    <Grid item lg={'auto'} m={'auto'} md={'auto'}  container rowSpacing={3} columns={{ xs: 1, sm: 3, md: 3,lg:3 ,xl:3 }} columnSpacing={{ xs:5, sm: 20, md: 20,xl:20,lg:20 }} xl={'auto'}>
// )})}
  
//   </Grid></div>}</>
<Box sx={{ flexGrow: 1 }}>
<AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/60/60992.png"
            width={30} height={30}/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{  }}>
            ChainKart
          </Typography>
          <Button style={{marginRight:10,marginLeft:10,justifyContent:'flex-start'}}  variant='outlined' color="inherit"><Link to={'/SellerHome'} style={{backgroundColor:'transparent',color:"white",textDecoration:'none',fontSize:14,fontWeight:'bold'}}  color={'#fff'}>Switch to seller</Link></Button>
          <Button variant='outlined' color="inherit"><Link to={'/purchaseHistory'} style={{backgroundColor:'transparent',color:"white",textDecoration:'none',fontSize:14,fontWeight:'bold'}}  color={'#fff'}>Purchase History</Link></Button>


          <Typography variant="h6" component="div" sx={{ flexGrow: 1,justifyContent:'flex-end',textAlign:'right' }}>
            Wellcome {Address.toString()}
          </Typography></Toolbar>
      </AppBar>
      <img src={require('../assets/bgbuyer.jpg')}
    width={'100%'}
    height={"25%"}
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
<Card setLoading={setLoading} i={i} />
</Grid>
)})}
 
 

</Grid>
</Box>
  )
}
