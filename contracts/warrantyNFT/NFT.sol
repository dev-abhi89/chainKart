

// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "/openzeppelin-solidity/contracts/token/ERC721/ERC721Burnable.sol";

// import "openzeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";

contract WarrantyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("ChainKartWarranty", "CKW") {}

    uint256 public currentDate = block.timestamp;

    function mintNFT(string memory tokenURI,uint256 expire)
        public
        
        returns (uint256)
    {   
        require(expire>block.timestamp,"invalid warranty");
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _setExpireToken(newItemId,expire);
        return newItemId;
    }
        function getCurrentToken() public view returns (uint256){
        return _tokenIds._value; }
    
 
}