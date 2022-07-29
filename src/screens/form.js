import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {addDoc, updateDoc,query, collection,getDocs, getDoc, getDocsFromServer, onSnapshot, doc, setDoc} from 'firebase/firestore'
import { db } from '..';
import { Button } from '@mui/material';
import { addProduct, addQuantity, addUserDetails, fetchProduct, getUserDetails } from '../services/firebaseAPI';
import AddressProvider, { userContext } from '../services/AddressProvider';


export default function BasicTextFields() {
  const val = React.useContext(userContext);
  // const Firestore = Fb.Firestore()
  React.useEffect(()=>{
// getDeta();
  },[])
  const getDeta = async()=>{
    const ref = doc(db,"Test","rohit","ss","XYZ");
    // await updateDoc(ref,{user:"sssss"});
    // const re= await getDoc(ref);
    // console.log(re.data())
    // const datas = getDocs(query(collection(db,"Test","rohit","ss"))).then(e=>e.docs.map(d=>console.log(d.id)));
    // const data = await addDoc(query(collection(db,"Test","rohit","ss")),{id:"yhsss",name:"Abhishek"})
    await setDoc(ref,{name:"UAajuu"});
// await Firestore().collection("Test").add({name:"Avhisjek"}).catch(e=>console.log(e));

  }
async function test(){
  // const data =await addProduct("https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png","Test","Test Product",6,100,0);
  // const data =await fetchProduct();
  const data2  = await addQuantity("Zu9W28X4GPuzuE4abWyk");
  
  console.log(data2);

}
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" />
      <Button onClick={test} variant="contained" >Hello</Button>
    </Box>
  );
}