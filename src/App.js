import React, { useEffect,useState } from "react";
import ords  from './ABI/Orders.json';
import ProductNFT from './ABI/ProductNFT.json';
import warrentyNFT from './ABI/warrentyNFT.json';
import { ethers } from "ethers";
import  {userContext } from "./services/AddressProvider";
import { CircularProgress, Typography } from "@mui/material";
import { getUserDetails } from "./services/firebaseAPI";
import MainContainer from "./navigation/mainContainer";

const warrentyAddressProd = '0x950eC455442Bb7b96ac03515C8dDDbb126B479aB';
const prodAddress = '0xE74f732B91BF9D74c771D890fD0B4C0542B18FD9';
const prodAddressTest ='0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';
const warrentyAddress ='0x8A791620dd6260079BF849Dc5567aDC3F2FdC318';

function AppContainer() {
  const{SetAddress,setContract,setUserDetails,setOwner,setWarrentyContract} = React.useContext(userContext);
  const [loading,setLoading]= useState(true);
  const [check,setCheck]= useState(true);
  var _contract;

  const getUser = async(address)=>{
   const data = await getUserDetails(address.toString());
   if(data){
    setUserDetails(data);
   }
  }
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please install MetaMask!");
        setCheck(false);
        setLoading(false);
        
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      SetAddress(accounts[0]);
      getUser(accounts[0]);


      const provider = new ethers.providers.Web3Provider(ethereum);
      const owner = provider.getSigner();
      _contract = new ethers.Contract(
        prodAddress,
        ProductNFT.abi,
        provider
      );
      const warrentyContract =new ethers.Contract(
        warrentyAddressProd,
        warrentyNFT.abi,
        provider
      );
     setOwner(owner);
      setContract(_contract);
      setWarrentyContract(warrentyContract);
      setLoading(false);
      
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  },[]);


  return <div style={{display:'flex',flex:1}}>
 {loading?<div style={{display:'flex',flexDirection:'column',flex:1,justifyContent:'center', alignItems:'center'}}>
  <CircularProgress size={50}/>
 </div>:check?
 <MainContainer/>
 :<div style={{flex:1,justifyContent:'center',alignItems:'center'}}><Typography  className="header" color={'red'} gutterBottom variant='h6' align="center">
          Add metamask wallet to use this website
         </Typography></div>}
  </div>;
}

export default AppContainer
