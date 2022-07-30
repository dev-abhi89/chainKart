import React from 'react'
import {
    BrowserRouter as Router,
    HashRouter,
    Route,
    Routes
  } from "react-router-dom";
  import AppContainer from '../App'
import App from '../screens/App'
import BuyerScreen from '../screens/buyerScreen';
import TransactionHistory from '../screens/PurchaseHistory';
import SellerScreen from '../screens/SellerScreen';
import 'dotenv/config'
export default function MainContainer() {
  return (
     <div style={{display:'flex',flex:1}}><HashRouter>
     <Routes>
         <Route path='/' element={<BuyerScreen/>} />
             
         
         <Route path='/Addproduct' element={ <App/>} />
            
       
         <Route path='/Home' element={ <AppContainer/>} />
         <Route path='/SellerHome' element={ <SellerScreen/>} />
         <Route path='/purchaseHistory' element={ <TransactionHistory/>} />
 
            
        
     </Routes>
    </HashRouter></div>
  )
}
