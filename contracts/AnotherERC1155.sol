//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;



import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";



contract AnotherERC1155 is ERC1155, Ownable {

    using Counters for Counters.Counter;

    Counters.Counter private currentTokenId;


    string public name = "PeyPey";
    string public symbol = "PP";



    constructor() ERC1155("https://bafybeigdhdjdzf6fsuw7fu72h42vs7au5f5zlnsscjxwp4kq33c5iry7sm.ipfs.nftstorage.link/metadata/{id}") {}



    function setTokenURI(
        string memory newURI
        ) 
        external
        onlyOwner
    {

        _setURI(newURI);
    }



    function mint(
        address to,
        uint amount
        )
        external
        onlyOwner
    {

        currentTokenId.increment();
        uint newItemId = currentTokenId.current();

        _mint(to, newItemId, amount, "");
    }



    function mintBatch(
        address recipient,
        uint[] memory amounts
        ) 
        external 
        onlyOwner
    {

        uint[] memory ids = new uint[](amounts.length);

        for (uint i = 0; i < ids.length; i++) {
            currentTokenId.increment();
            ids[i] = currentTokenId.current();
        }

        _mintBatch(recipient, ids, amounts, "");
    }


}
