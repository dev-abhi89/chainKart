import { Favorite, FiberManualRecordOutlined, FiberManualRecordRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { prodAddress } from "../../../App";
import { userContext } from "../../../services/AddressProvider";
import { Addorders, addQuantity, addWarrentyNFT, fetchProductNFT, updateProductNFT } from "../../../services/firebaseAPI";
import sendJSONtoIPFS from "../../../services/PinataUpload";
import "./Card.css";

const Card = ({i,setLoading,test=null}) => {
const [Token,setToken] = useState(null);
  const {owner,Address,contract,warrentyContract,checkNet,test:testNet}= React.useContext(userContext);
  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  async function getHistory (){
try{
  setLoading(true);
  const NFTs = await fetchProductNFT(i.id,i.data.seller);
  if(!NFTs.length){
    setLoading(false);
    alert("no Product Available");
    return;
  }else{
setToken(NFTs);
openInNewTab(`https://${testNet?'mumbai.':""}polygonscan.com/token/${prodAddress}?a=${NFTs[0].data.tokenId}`);
  }
}catch(e){
  console.log(e);
}

  }

  
function getDate(expire){
  var date = new Date();
  date.setMonth(date.getMonth() + expire);
  return parseInt(date.getTime()/1000);
}
  const handlePurchase = async()=>{
try{
  setLoading(true);
  const NFTs = await fetchProductNFT(i.id,i.data.seller);
  if(!NFTs.length){
    setLoading(false);
    alert("no Product Available");
    return;
  }
  if(checkNet){
    alert('Opps! it seems like you are on the wrong network.,Please connect with polygon mainnet network');
    return;  }
  const tokenId = NFTs[0].data.tokenId;
  const url=await contract.tokenURI(tokenId);

if(test && new Date(test*1000).getTime()<new Date().getTime()){
  alert("wrong testing value");
  setLoading(false);

  return;
}

const eDate =test && new Date(test*1000).getTime()>new Date().getTime()?new Date(test).getTime(): getDate(parseInt(i.data.warrenty));

  const uploadData =  {
    "name": `Warranty of ${NFTs[0].data.SerialNumber}`,
    "image": i.data.image,
    "price": `${i.data.price}`,
    "serial_no":`${NFTs[0].data.SerialNumber}`,
    "description":`It proof that  ${i.data.name} having serial number ${NFTs[0].data.SerialNumber} remains under warranty till ${new Date(eDate*1000).toDateString()}`,
};

const uri = await sendJSONtoIPFS(uploadData);
const data = await contract.connect(owner).transferWithCode(i.data.seller,Address,tokenId,parseInt(process.env.REACT_APP_CONTRACT_KEY));
const warrenty = await warrentyContract.connect(owner).mintNFT(uri,eDate);
const warentToken = await warrentyContract.getCurrentToken();
await addWarrentyNFT(warrenty.hash,i.id,eDate,parseInt(warentToken)+1,Address);
const updateInfo=await updateProductNFT(i.id,NFTs[0].id,{transaction:data.hash,ownerAddress:Address,timeStamp:Date.now()});
await Addorders(Address.toString(),i.id,i.data.name,eDate*1000,NFTs[0].data.SerialNumber,i.data.price,data.hash,warrenty.hash,NFTs[0].data.tokenId,parseInt(warentToken)+1);


if(updateInfo){
 await addQuantity(i.id,false);
}
setLoading(false);
alert("You have Purchsed! "+ i.data.name);
}catch(e){
  console.log(e);
  setLoading(false);

}

  }

  return (
    <div className="card">
      <div className="card__heart">
        <Favorite />
      </div>

      {/* {Array(image.length)
        .fill()
        .map((_, i) => {
          if (i === index) {
            return show && <FiberManualRecordRounded className="dots" />;
          } else {
            return show && <FiberManualRecordOutlined className="dots" />;
          }
        })} */}

      <div className="card__image">
        <img
          // onMouseOver={() => setShow(true)}
          // onMouseLeave={() => setShow(false)}
          src={i.data.image}
          alt="images"
        />
      </div>
      <div className="productDet">
        <div className="card__details">
          <p className="title"></p>
          <p>{i.data.name}</p>
          <span className="span1">MATIC{i.data.price}</span>
          {/* <span className="span2">₹{actualPrice}</span>
          <span className="span3">56%</span> */}
        </div>
     
      <div style={{flexDirection:'row',display:'flex',justifyContent:'space-evenly'}}>
      <Button style={{width:'40%',marginRight:5}} onClick={handlePurchase} variant="contained">BUY</Button>
         <Button onClick={getHistory} variant="outlined">History</Button>
      </div>

       
      </div>
    </div>
  );
};

export default Card;
