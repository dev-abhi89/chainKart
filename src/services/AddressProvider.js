import React, { useState } from 'react'
export const userContext = React.createContext({Address:""});

export default function AddressProvider({children}) {
    const[Address,SetAddress] =useState("asdasdas")
    const [contract,setContract]= useState(null);
    const [warrentyContract,setWarrentyContract] = useState(null);
    const [userDetails,setUserDetails]= useState(null)
    const [owner,setOwner]= useState(null);

  return (
    <userContext.Provider value={{Address,SetAddress,contract,setContract,userDetails,setUserDetails,owner,setOwner,warrentyContract,setWarrentyContract}}>
        {children}
    </userContext.Provider>
  )
}

