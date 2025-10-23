// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract S3ntimentSBT {
    string public name = "S3ntiment SBT";
    string public symbol = "S3SBT";
    uint256 public tokenIdCounter;
    address public owner;

    // tokenId => owner
    mapping(uint256 => address) private _owners;
    // owner => balance
    mapping(address => uint256) private _balances;
    // tokenId => metadata URI
    mapping(uint256 => string) private _tokenURIs;

    // Events
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Mint(address indexed to, uint256 indexed tokenId, string metadataURI);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor() {
        owner = msg.sender;
        tokenIdCounter = 1;
    }

    // Mint SBT ke top voter
    function mint(address to, string memory metadataURI) external onlyOwner {
        uint256 tid = tokenIdCounter;
        _owners[tid] = to;
        _balances[to] += 1;
        _tokenURIs[tid] = metadataURI;

        emit Transfer(address(0), to, tid);
        emit Mint(to, tid, metadataURI);

        tokenIdCounter++;
    }

    // Non-transferable (Soulbound)
    function transfer(address, uint256) external pure {
        revert("SBT non-transferable");
    }

    function approve(address, uint256) external pure {
        revert("SBT non-transferable");
    }

    // View functions
    function ownerOf(uint256 tokenId) external view returns (address) {
        return _owners[tokenId];
    }

    function balanceOf(address user) external view returns (uint256) {
        return _balances[user];
    }

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        return _tokenURIs[tokenId];
    }
}

