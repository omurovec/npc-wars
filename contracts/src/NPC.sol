// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Verifier} from "./Verifier.sol";

contract NPC {
  address  public addr;
  string   public name;
  string   public arch;
  string   public image;
  uint     public size;
  uint     public created;
  Verifier public verifier;

  constructor(
    uint   _size,
    string memory _name, 
    string memory _arch,
    string memory _image,
    address _verifier
  ) {
    addr     = msg.sender;
    name     = _name;
    size     = _size;
    created  = block.timestamp;
    arch     = _arch;
    image    = _image;
    verifier = Verifier(_verifier);
  }

  function verify(
      uint256[] memory pubInputs,
      bytes memory proof
  ) public view virtual returns (bool) {
      return verifier.verify(pubInputs, proof);
  }
}
