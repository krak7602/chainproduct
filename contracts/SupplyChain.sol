// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    address owner;

    uint256 public itemIndex;

    struct Item {
        string name;
        uint256 itemID;
        address ownerID;
        address[] ownersHistory;
    }

    mapping (uint256 => Item) items;

    event ItemAdded(uint256 newIndex);
    event ItemTransferred(uint256 newIndex);

    constructor() {
        owner = msg.sender;
        itemIndex = 1;
    }

    function createItem(address _currentOwner, string memory _name) public payable {
        items[itemIndex].name = _name;
        items[itemIndex].itemID = itemIndex;
        items[itemIndex].ownerID = _currentOwner;
        items[itemIndex].ownersHistory.push(_currentOwner);
        emit ItemAdded(itemIndex++);
    }

    function transferItem(address _nextOwner, uint256 _itemIndex)  public payable {
        require(items[_itemIndex].ownerID == msg.sender, "Can only be transferred by the owner");
        items[_itemIndex].ownerID = _nextOwner;
        items[_itemIndex].ownersHistory.push(_nextOwner);
        emit ItemTransferred(_itemIndex);
    }

    function getItem(uint256 _itemIndex) public view returns (Item memory){
        return (items[_itemIndex]);
    }

    function viewHistory(uint256 _itemIndex) public view returns (address[] memory){
        return items[_itemIndex].ownersHistory;
    }

    function listItem() public view returns (Item[] memory) {
        Item[] memory itm = new Item[](itemIndex-1);
        for (uint256 i=1; i<itemIndex; i++) {
            itm[i-1] = items[i];
        }
        return itm;
    }
}
