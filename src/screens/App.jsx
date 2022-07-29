import { LocalActivity, LocalActivityTwoTone } from '@mui/icons-material';
import { AppBar, Button, Card, CardContent, CircularProgress, FormControl, Grid, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { userContext } from '../services/AddressProvider';
import { addProduct } from '../services/firebaseAPI';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from 'react-router-dom';



const App=()=>{
  const {Address,owner} =useContext(userContext);
  const [Data, setData]=useState({
    name:"",image:"",seller:"",warrenty:"",price:""
  })
  const [loading,setLoading]= useState(false);
  
     const inputEvent=(event)=>{
    const {value,name}=event.target;

    setData(prevData=>({...prevData,[name]:value}));

  };
  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
  const res =  await addProduct(Data.image,Address.toString(),Data.name,Data.warrenty,Data.price,0);
  if(res){
    alert("Form submitted");
  }
  setLoading(false);
    console.log("Form submitted",Data);
  }
  return (<>
       {loading?<div style={{flex:1,justifyContent:'center',alignItems:'center',height:"100%",backgroundColor:'green'}}><CircularProgress size={50} color="success" /></div>:<div style={{flex:1}}>
       <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          <Link to={'/SellerHome'} style={{backgroundColor:'transparent',color:"white"}}  color={'#fff'}><ArrowBackIosNewIcon /></Link>
            {/* <img src="https://cdn-icons-png.flaticon.com/512/60/60992.png"
            width={30} height={30}/> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Add Product
          </Typography>
          <Button style={{marginRight:10,marginLeft:10,justifyContent:'flex-start'}}  variant='outlined' color="inherit"><Link to={'/'}  style={{backgroundColor:'transparent',color:"white",textDecoration:'none',fontSize:14,fontWeight:'bold'}}  color={'#fff'}>Switch to Buyer</Link></Button>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1,justifyContent:'flex-end',textAlign:'right' }}>
            Wellcome {Address.toString()}
          </Typography></Toolbar>
      </AppBar>
        <form onSubmit={handleSubmit}>
         <Typography  className="header" gutterBottom variant='h3' align="center">
          ADD PRODUCT
         </Typography>
         <Card>
          <CardContent style={{marginLeft:'auto',marginRight:'auto'}}>
          <Grid container style={{width:'80%',borderRadius:10,marginBottom:10}} spacing={1}>
           {/* <Grid xs={12} item>
            <TextField onChange={inputEvent} label="Serial No" name="name"  placeholder='Enter Serial No' variant="outlined" fullWidth required/>
           </Grid> */}
           
           <Grid xs={12}  item>
            <TextField  label="Product Image" onChange={inputEvent} name="image"  placeholder='Enter Image url' variant="outlined" fullWidth required/>
           </Grid>
           <Grid xs={12} item>
           <TextField label="Product Name"  onChange={inputEvent} name="name" placeholder='Enter Product Name' variant="outlined" fullWidth required/>
           </Grid>
           <Grid xs={12} lg={6} item>
           <TextField type="number" onChange={inputEvent} name="warrenty" label="Warranty Period" placeholder='Enter Product Warranty(Months)' variant="outlined" fullWidth required/>
           </Grid>
           <Grid xs={12} lg={6} item>
           <TextField label="Product Price" onChange={inputEvent} name="price" placeholder='Enter Product Price(In Ether)' variant="outlined" fullWidth required/>
           </Grid>
           <Grid xs={12} lg={12} item>
            <Button type='submit' variant="contained" color="primary"
            fullwidth>Add Product</Button>
           </Grid>
          </Grid>

          </CardContent>
         </Card>
         </form>
      </div>}
      </>
  );
}

// import React, { useState } from "react";

// const App=()=>{
//    const [fullName,setFullName]=useState({
//     fName:"",
//     lName:"",
//     email:"",
//     phone:"",
//    });
   
//    const inputEvent=(event)=>{
//     // console.log(event.target.value);
//     // console.log(event.target.name);
    
   

//     // const value=event.target.value;
//     // const name=event.target.name;
   
//     const {value,name}=event.target;
   
//     setFullName((prevValue)=>{
    
//     return{
//       ...prevValue,
//       [name]:value,
//     }
      
    
//     });
//   };
//    const onSubmits=(event)=>{
//      event.preventDefault();
//      alert("Form submitted");
//    };

   
//  return(<>
//     <div className="main_div">
//      <form onSubmit={onSubmits}>
//       <div>
//         {/* <h1>
//           HELLO {fullName.fName} {fullName.lName}
//         </h1>
//         <p>{fullName.email}</p>
//         <p>{fullName.phone}</p> */}
//         <input
//           type="text"
//           placeholder="enter your name"
//           name="fName"
//           onChange={inputEvent}
//           value={fullName.fName}
//           />
//           <br />
//           <input
//           type="text"
//           placeholder="enter your Lname"
//           name="lName"
//           onChange={inputEvent}
//           value={fullName.lName}
//           />
//           <br />
//           <input
//           type="email"
//           placeholder="enter your email"
//           name="email"
//           onChange={inputEvent}
//           value={fullName.email}
//           />
//           <br />
//           <input
//           type="number"
//           placeholder="enter your phone no"
//           name="phone"
//           onChange={inputEvent}
//           value={fullName.phone}
//           au="off"
//           />
//           <button type="submit">submit Me</button>
//       </div>
//      </form>

//     </div>
//     </>
//   );
// };

export default App;
