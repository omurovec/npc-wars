// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Owned} from "@solmate/src/auth/Owned.sol";
import {Verifier} from "./Verifier.sol";
import {NPC} from "./NPC.sol";

contract Competition is Owned {
  string name;
  uint maxNPCs;
  uint[] score;
  NPC[] npcs;
  string answer;
  bool answerSubmitted;

  constructor(
      address _owner,
      string memory _name,
      uint _maxNPCs
  ) Owned(_owner) {
      name    = _name;
      maxNPCs = _maxNPCs;
  }

  function join(NPC npc) public returns (uint) {
    require(!answerSubmitted, "answer already submitted");
    uint id = npcs.length;
    require(id < maxNPCs, "Competition is full");
    npcs.push(npc);
    return id;
  }

  function verify(
      uint id,
      uint[] memory pubInputs,
      bytes  memory proof,
      string memory prediction
  ) public 
      onlyOwner 
    {
      bool isVerfified = npcs[id].verify(pubInputs, proof);
      if (isVerfified && keccak256(abi.encodePacked(prediction)) == keccak256(abi.encodePacked(answer))) {
        score[id] += 1;
      }
  }

  function setAnswer(string memory _answer) public onlyOwner {
    require(!answerSubmitted);
    answer = _answer;
    answerSubmitted = true;
  }
}
