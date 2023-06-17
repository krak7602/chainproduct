// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Accounts {
    address owner;

    uint256 public accountIndex;

    struct Account {
        string user;
        address addr;
        string location;
    }
    
    Account[] accounts;
    
    event AccountAdded(address newAddress);

    constructor() {
        owner = msg.sender;
        accountIndex = 1;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    function addAccount(address _newAddress, string memory _user, string memory _location) public payable onlyOwner {
        accounts.push(Account(_user, _newAddress, _location));
        accountIndex++;
        emit AccountAdded(_newAddress);
    }

    function listAccounts() public view returns(Account[] memory) {
        return accounts;
    }
}