// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";


contract FanSocietyMother is ERC1155 {
    // "_balances" mapping is inherited via ERC1155
    // mapping(uint256 => mapping(address => uint256)) private _balances;
    // "_operatorApproval" mapping is inherited via ERC1155
    // mapping(address => mapping(address => bool)) private _operatorApprovals;
    // Below is used as the URI for all token types relying on ID substitution, e.g. https://ipfs/<hash>/{id}.json
    // string private _uri;

    uint256 public activeGenerationId = 0; 
    uint256 public tokenFee = 1 * 10 ** 17 ;

    //mapping(uint256 => string) = tokenURI;

    event FanPinMinted(address fanAddress, uint256 generationId, uint256 mintAmount);
    event NewGeneration(address contractAddress, uint256 activeGen);

    constructor() ERC1155("") {
        // TO DO:
        // Set tokenFee to .1 ETH
        //tokenFee == 1 * 10**(18-1);
    }

    // Create a new fan generation, ie create new _ids, increment current token id variable += 1, require an amount of time from previous generation creation, ie 6 months.
    // Todo: Create token uri for each generation, add parameter, handle IPFS uploads and validations on frontend
    // Todo: Make OnlyOwner function
    function createGeneration (uint256 _tokenFee) public {
        activeGenerationId++;
        tokenFee = _tokenFee;
        // include tokenURI setting
        emit NewGeneration(address(this) , activeGenerationId);
    }

    // mint token of the current generation for the current mint fee
    function mint () public payable {
        uint256 amount = 1;
        uint256 payment = tokenFee;
        require(msg.value >= payment, "Send more Eth");
        _mint(msg.sender, activeGenerationId, amount, "");
        (bool sent, ) = msg.sender.call{value: payment}("");
        require(sent, "Not enough eth sent");
        emit FanPinMinted(msg.sender, activeGenerationId, payment);
     }  

    // Raffle based on an array [] of _ids, ie Generation 1 - 3 are included in this raffle, needs an argument for how many winners will be selected
    // Provably random ie Chainlink
}