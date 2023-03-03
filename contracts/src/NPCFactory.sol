// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {NPC} from "./NPC.sol";

contract NPCFactory {
  uint id;
  mapping(uint => NPC) public id2npc;

  function create(
    uint _size,
    string memory _name,
    string memory _arch,
    string memory _image
  ) public
    returns(NPC) {
    NPC npc = new NPC(
      _size, 
      _name,
      _arch,
      _image
    );
    id2npc[id++] = npc;
    return npc;
  }
}
