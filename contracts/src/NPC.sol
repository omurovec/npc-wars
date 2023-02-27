// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract NPC {
  address owner;
  uint    size;
  uint    created;
  string  arch;
  string  image;

  constructor(
    uint _size,
    string memory _arch,
    string memory _image
  ) {
    owner   = msg.sender;
    size    = _size;
    created = block.timestamp;
    arch    = _arch;
    image   = _image;
  }

  function verify(
      uint256[] memory pubInputs,
      bytes memory proof
  ) public view virtual returns (bool) {
      return true;
  }
}
