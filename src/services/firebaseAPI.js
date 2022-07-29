import {doc,addDoc, updateDoc,query, collection,getDocs, getDoc, getDocsFromServer, onSnapshot, setDoc, where} from 'firebase/firestore'
import { db } from '..';


export async  function getUserDetails(userAddress){
try{    const ref = doc(db,"user",userAddress);
    const data = await getDoc(ref);
    console.log(data.data())
    if(data.exists()){
        return data.data();
    } else return false;
}catch(e){
    console.log(e);
    return false
}
}

export async function addUserDetails(userAddress,name){
   try{ const ref = doc(db,"user",userAddress);
    const data = await setDoc(ref,{name:name,isSeller:false});
        return true;}
        catch(e){
            console.log(e);
            return false;
        }
    

}
export async function UpdateUserDetails(userAddress,key,value){
    try{ const ref = doc(db,"user",userAddress);
     const data = await updateDoc(ref,{[key]:value});
         return true;}
         catch(e){
             console.log(e);
             return false;
         }
     
 
 }

export async function addProduct(image,sellerAddress,name,warrenty,price,quantity){
    try{
        const q = query(collection(db,"productlist"));
        await addDoc(q,{name:name,image:image,seller:sellerAddress,warrenty:warrenty,price:price,quantity:0,timeStamp:new Date});
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}

export async function addProductNFT(transaction,product,tokenId,owner,SerialNumber){
    try{
        const q = query(collection(db,"productNFT","products",product));
        await addDoc(q,{transaction:transaction,tokenId,ownerAddress:owner,timeStamp:new Date(),SerialNumber});
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}


export async function addWarrentyNFT(transaction,product,expire,tokenId,owner){
    try{
        const q = query(collection(db,"productNFT","warrenty",product));
        await addDoc(q,{transaction:transaction,expire,tokenId,ownerAddress:owner,timeStamp:new Date()});
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}

export async function fetchProductNFT(product,seller){
    try{
        console.log(seller,product);
        const q = query(collection(db,"productNFT","products",product),where("ownerAddress",'==',seller));
    const data =await getDocs(q);
    var res =[];
    if(data.docs.length>=1){
        data.docs.map(e=>{
            const temp ={id:e.id,data:e.data()};
            res.push(temp);
        })

    }
        return res;
    }catch(e){
        console.log(e);
        return false;
    }
}
export async function updateProductNFT(product,NFT,data){
    try{
        const ref = doc(db,"productNFT","products",product,NFT);
        await updateDoc(ref,data);
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}

export async function addQuantity(ProductId,add=true){
try{    const ref = doc(db,"productlist",ProductId);
    const data = await getDoc(ref);
if(!data.exists()){
    return false;
}
const {quantity} = data.data()
    await updateDoc(ref,{quantity:add?quantity+1:quantity-1});
    return true;}
    catch(e){
        console.log(e);
        return false;
    }
}

export async function fetchProduct(isSeller=false){
    try{
      
const q= isSeller?query(collection(db,"productlist")): query(collection(db,"productlist"),where("quantity",">=",1));
const data = await getDocs(q);
var arr=[];
if(data.docs.length>=1){
data.docs.map(d=>{
    arr.push({id:d.id,data:d.data()});
})}
return arr;
    }catch(e){
        console.log(e);
        return false;
    }
}
export async function Addorders(user,prductId,name,expire_date,SerialNumber,price,productNFTHash,warrentyNFTHash,productNFT,warrentyNFT){
    try{
        const q = query(collection(db,"orders",));
        await addDoc(q,{user,prductId,name,expire_date,SerialNumber,price,productNFTHash,warrentyNFTHash,productNFT,warrentyNFT,timeStamp:Date.now()});
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}

export async function FetchOrder(userAddress){
  try{  const q = query(collection(db,"orders"),where("user","==",userAddress));
    const data = await getDocs(q);
    var arr=[];
    if(data.docs.length>=1){
        data.docs.map(d=>{
            arr.push(d.data());
        })
        
    }
    return arr;}
    catch(e){
        console.log(e);
        return false;
    }
}