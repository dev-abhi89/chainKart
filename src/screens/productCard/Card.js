import { Favorite, FiberManualRecordOutlined, FiberManualRecordRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { userContext } from "../../services/AddressProvider";
import { Addorders, addQuantity, addWarrentyNFT, fetchProductNFT, updateProductNFT } from "../../services/firebaseAPI";
import sendJSONtoIPFS from "../../services/PinataUpload";
import "./Card.css";

const Card = ({i,setLoading}) => {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const {owner,Address,contract,warrentyContract}= React.useContext(userContext);

  // const carousel = useCallback(() => {
  //   setTimeout(() => {
  //     if (index < image.length - 1) {
  //       setIndex(index + 1);
  //     } else {
  //       setIndex(0);
  //     }
  //   }, 1000);
  // }, [index, image.length]);

  // useEffect(() => {
  //   show && carousel();
  // }, [show, carousel]);
function getDate(expire){
  var date = new Date();
  date.setMonth(date.getMonth() + expire);
  return date.getTime();
}
  const handlePurchase = async()=>{
try{
  setLoading(true);
  const NFTs = await fetchProductNFT(i.id,i.data.seller);
  console.log(NFTs);
  if(!NFTs.length){
    setLoading(false);
    alert("no Product Available");
    return;
  }
  const tokenId = NFTs[0].data.tokenId;
  const url=await contract.tokenURI(tokenId);
console.log(url);
const eDate =getDate(parseInt(i.data.warrenty));

  const uploadData =  {
    "name": `Warrenty of ${NFTs[0].data.SerialNumber}`,
    "image": i.data.image,
    "price": `${i.data.price}`,
    "serial_no":`${NFTs[0].data.SerialNumber}`,
    "description":`It proof that  ${i.data.name} having serial number ${NFTs[0].data.SerialNumber} remains under warrenty till ${new Date(eDate).toDateString()}`,
};

const uri = await sendJSONtoIPFS(uploadData);
const data = await contract.connect(owner).transferWithCode(i.data.seller,Address,tokenId,parseInt(process.env.REACT_APP_CONTRACT_KEY));
const warrenty = await warrentyContract.connect(owner).mintNFT(uri,eDate);
const warentToken = await warrentyContract.getCurrentToken();
await addWarrentyNFT(warrenty.hash,i.id,eDate,parseInt(warentToken)+1,Address);
const updateInfo=await updateProductNFT(i.id,NFTs[0].id,{transaction:data.hash,ownerAddress:Address,timeStamp:Date.now()});
await Addorders(Address.toString(),i.id,i.data.name,eDate,NFTs[0].data.SerialNumber,i.data.price,data.hash,warrenty.hash,NFTs[0].data.tokenId,parseInt(warentToken)+1);


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
          <span className="span1">ETH{i.data.price}</span>
          {/* <span className="span2">₹{actualPrice}</span>
          <span className="span3">56%</span> */}
        </div>
     
         <Button onClick={handlePurchase} variant="contained">BUY</Button>
       
      </div>
    </div>
  );
};

export default Card;
