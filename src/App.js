import React, { useEffect,useState } from "react";
import ProductNFT from './ABI/ProductNFT.json';
import warrentyNFT from './ABI/warrentyNFT.json';
import { ethers } from "ethers";
import  {userContext } from "./services/AddressProvider";
import { CircularProgress, Typography } from "@mui/material";
import { getUserDetails } from "./services/firebaseAPI";
import MainContainer from "./navigation/NavigationContainer";

export const warrentyAddressProd = '0x950eC455442Bb7b96ac03515C8dDDbb126B479aB';
export const prodAddress = '0xE74f732B91BF9D74c771D890fD0B4C0542B18FD9';
const prodAddressTest ='0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';
const warrentyAddress ='0x8A791620dd6260079BF849Dc5567aDC3F2FdC318';

function AppContainer() {
  const{SetAddress,setContract,setUserDetails,setOwner,setWarrentyContract} = React.useContext(userContext);
  const [loading,setLoading]= useState(true);
  const [check,setCheck]= useState(1);
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
        setCheck(0);
        setLoading(false);
        
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
    const net= await  ethereum.request({ method: 'net_version' }) ;
    if(net!=80001){
      setCheck(2)
    }

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
 </div>:check==1?
 <MainContainer/>
 :<div style={{flex:1,justifyContent:'center',alignItems:'center'}}><Typography  className="header" color={'red'} gutterBottom variant='h6' align="center">
          {check==0?'Add metamask wallet to use this website':'Opps! it seems like you are on the wrong network.,Please connect with polygon mumbai test network having 80001 chainId!'}
         </Typography></div>}
  </div>;
}

export default AppContainer
