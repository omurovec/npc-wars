// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract NPC {
    address public addr;
    string public name;
    string public arch;
    string public image;
    uint256 public size;
    uint256 public created;

    constructor(uint256 _size, string memory _name, string memory _arch, string memory _image) {
        addr = msg.sender;
        name = _name;
        size = _size;
        created = block.timestamp;
        arch = _arch;
        image = _image;
    }

    function verify(uint256[] memory pubInputs, bytes memory proof) public view virtual returns (bool) {
        return true;
    }
}
