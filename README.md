# Generational SFT

Built with Scaffold-ETH for the BuidlGuidl community.

This build uses the ERC1155 token standard to mint NFTs (or more specifically, semi-fungible tokens).

The logic of this contract is a break from how NFT contracts are set up. 

- Token value is assigned chronologically at mint, as opposed to assigning value to non-fungible tokens randomly. 

- Token minting is divided up into generations so that all tokens of each generation hold equal value. New generations can be created which allows for breaking points along the timeline of the contract mint events.

- Amount of tokens per generation are not predefined and gives the contract owner the flexibility to use for thier specific needs.

The build is presented in it's most basic form and can be hacked to create some very interesting use cases.