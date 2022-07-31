

// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "/openzeppelin-solidity/contracts/token/ERC721/ERC721Burnable.sol";

// import "openzeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";

contract ProductNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;

    constructor() ERC721("ChainKartProduct", "CKP") {}

    uint256 private key =1087897646222926;

    function mintNFT(string memory tokenURI)
        public
        
        returns (uint256)
    {   
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
    function transferWithCode(address from, address to,uint256 tokenId,uint256 privateKey) public returns(bool ){
require(key==privateKey,"unauthorized");
_transfer(from,to,tokenId);
return true;
    }
    function getCurrentToken() public view returns (uint256){
        return _tokenIds._value; }
 
}
