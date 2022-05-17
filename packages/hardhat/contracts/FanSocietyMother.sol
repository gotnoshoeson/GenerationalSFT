// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/util/Counters.sol";
import "@openzeppelin/contracts/util/Ownable.sol";

error Mint_SendMoreEthToMint();

contract FanSocietyMother is ERC1155, IERC1155, Counters, Ownable {
    
    mapping(uint256 => mapping(address => uint256)) internal balances;

    constructor() ERC1155("https://game.example/api/item/{id}.json") {
        
    }

// GLOBAL VARIABLES

// "active_generation" id to mint, current generation
    uint256 public activeGenerationId;
    uint256 public tokenFee;


// Create a new fan generation, ie create new _ids, increment current token id variable += 1, require an amount of time from previous generation creation, ie 6 months.
    function newGeneration onlyOwner (uint256 _tokenFee){
        activeGeneration += activeGeneration;
        tokenFee = _tokenFee;
    }
// Mint NFT
    function mint (){
        if (msg.value < tokenFee){
            revert Mint_SendMoreEthToMint();
        }
        

// Raffle based on an array [] of _ids, ie Generation 1 - 3 are included in this raffle, needs an argument for how many winners will be selected
// Provably random ie Chainlink

// BUYER FUNCTIONS

// mint token, will only mint the "current_token"

}