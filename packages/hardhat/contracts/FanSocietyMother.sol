// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/util/Counters.sol";
import "@openzeppelin/contracts/util/Ownable.sol";

contract FanSocietyMother is ERC1155 {
    
    mapping(address => mapping(uint256 => uint256)) public _ids;

    constructor() ERC1155("https://game.example/api/item/{id}.json") {
        
    }
}

// GLOBAL VARIABLES

// "current_token" id to mint, current generation


// OWNER FUNCTIONS

// Create a new fan generation, ie create new _ids, increment current token id variable += 1, require an amount of time from previous generation creation, ie 6 months.
// Update mint function to new _ids

// Raffle based on an array [] of _ids, ie Generation 1 - 3 are included in this raffle, needs an argument for how many winners will be selected


// BUYER FUNCTIONS

// mint token, will only mint the "current_token"

