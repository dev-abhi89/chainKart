import { AppBar, Button, Checkbox, CircularProgress, Container, FormControlLabel, FormGroup, IconButton, TextField, Toolbar, Typography } from '@mui/material'
import { height } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { userContext } from '../../../services/AddressProvider'
import { addProductNFT, addQuantity, fetchProduct } from '../../../services/firebaseAPI';
import sendJSONtoIPFS from '../../../services/PinataUpload';
import CKAppbar from '../../appbar';

export default function SellerScreen() {
  const {Address,contract,userDetails,owner} = React.useContext(userContext);
  const [Product,setProducts] = useState([]);
  const [selectedProduct,setSelectedProduct]=useState(null);
  const [SerialNumber,setSerialNumber]=useState(null);
  const [loading,setLoading]= useState(false);


async function fetchProd(){
  const data = await fetchProduct(true,Address.toString());
  if(data){
    setProducts(data);
  }
}
useEffect(()=>{
  fetchProd();
},[])
async function handleSubmit(e){
  e.preventDefault();
  if(!SerialNumber || !selectedProduct){
    alert("Fill All details");
    return;
  }
  setLoading(true);
  const uploadData =  {
    "name": SerialNumber,
    "image": selectedProduct.data.image,
    "price": `${selectedProduct.data.price}`,
    "serial_no":SerialNumber,
    "description":`It proof that  ${selectedProduct.data.name} of price ${selectedProduct.data.price} purchased from chainKart belongs to the this user`,
};

 const url = await sendJSONtoIPFS(uploadData);
 const data = await contract.connect(owner).mintNFT(url);
 const TokenID = await contract.getCurrentToken();
 await addProductNFT(data.hash,selectedProduct.id,parseInt(TokenID)+1,Address.toString(),SerialNumber);
 await addQuantity(selectedProduct.id);
 setLoading(false);
 alert("Product added successfully");
}

  return (
  <div style={{flex:1}}>
    <CKAppbar isbuyer={false}/>
    <img src='https://scontent.fdel63-1.fna.fbcdn.net/v/t39.30808-6/284918021_5141651259223508_783628069824972216_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_ohc=vh4JUcaw8WwAX8C5uaP&_nc_ht=scontent.fdel63-1.fna&oh=00_AT9tCMew6Q2BA5g9CLONOJovhXpv_h7iN6oM4rjZhpmopg&oe=62E83F14'
    width={'100%'}
    height={"25%"}
    alt="image"
    />
    <div style={{margin:'auto'}}>

    <form onSubmit={handleSubmit} style={{display:'flex' ,flex:1,height:'80vh',alignItems:'center',flexDirection:'column'}}>
     <Typography  className="header" gutterBottom variant='h3' align="center">
          ADD PRODUCT
         </Typography>
      <div style={{marginTop:'50px',width:"80%",display:'flex',flexDirection:'column'}}>
      <grid xs={12}  item>
            <TextField label="Serial Number" onChange={(e)=>{setSerialNumber(e.target.value)}} name="serial"  placeholder='Enter serial number' variant="outlined" fullWidth required/>
           </grid>      {loading? <CircularProgress style={{alignSelf:'center',marginTop:20,marginBottom:20}} size={30}/>:<Button style={{marginTop:20,width:'30%',borderRadius:10,alignSelf:'center'}} type='submit' variant="contained" color="primary"
            >Add Product </Button>}
      </div>
    
      <Container style={{display:'flex',flexDirection:'column'}}>
      <hr/>
      <Typography  className="header" gutterBottom variant='h6' align="center">
          Choose PRODUCT  Template or  <Link to={'/Addproduct'}>Add new Template</Link>

         </Typography>
    <FormGroup>
    {Product.map(i=>{
        return( <FormControlLabel control={<Checkbox checked={selectedProduct && i.id==selectedProduct.id} onClick={()=>{setSelectedProduct(i)}} />} label={i.data.name} />);
      })}
    </FormGroup>
      
     
    </Container>
    
    </form>
    </div></div>
  )
}
