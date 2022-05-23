// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
//import "@openzeppelin/contracts/utils/Counters.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";

// error Mint_SendMoreEthToMint();

contract FanSocietyMother is ERC1155 {
    // NFT balance "database", tokenID -> address -> tokenIDtokenNumber
    // _balances mapping is inherited via ERC1155
    // mapping(uint256 => mapping(address => uint256)) private _balances;
    // _operatorApproval mapping is inherited via ERC1155
    // mapping(address => mapping(address => bool)) private _operatorApprovals;
    // Below is used as the URI for all token types relying on ID substitution, e.g. https://ipfs/<hash>/{id}.json
    // string private _uri;
// GLOBAL VARIABLES

// FanPin Variables
// "active_generation" id to mint, Can only be incremented by one each time function is called. Can never subtract (uint is "unsigned integer" meaning no negative numbers)
    uint256 public activeGenerationId;
// Owner can set the token fee, ie How much each token costs to mint. Updated every time a new generation is created.    
    uint256 public tokenFee;
    event FanPinMinted(address, uint256, uint256);
    event NewGeneration(uint256 activeGen);

    constructor() ERC1155("") {
        tokenFee == 1 * 10**(18-1);
    }




// Create a new fan generation, ie create new _ids, increment current token id variable += 1, require an amount of time from previous generation creation, ie 6 months.
    function createGeneration (uint256 _tokenFee) public {
        activeGenerationId++;
        tokenFee = _tokenFee;
        emit NewGeneration(activeGenerationId);
    }
// Mint NFT
 

// Raffle based on an array [] of _ids, ie Generation 1 - 3 are included in this raffle, needs an argument for how many winners will be selected
// Provably random ie Chainlink

// BUYER FUNCTIONS

// mint token, will only mint one of the "current_tokens"
    function mint (uint256 _mintTokenAmount) public payable {
        uint256 payment = tokenFee * _mintTokenAmount;
        require(msg.value >= payment, "Send more Eth");
         _mint(msg.sender, activeGenerationId, _mintTokenAmount, "");
         (bool sent, ) = msg.sender.call{value: payment}("");
         require(sent, "Not enough eth sent");
         emit FanPinMinted(msg.sender, activeGenerationId, _mintTokenAmount);
     }  
}