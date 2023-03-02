// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/console.sol";
import {Owned} from "@solmate/src/auth/Owned.sol";
import {Verifier} from "./Verifier.sol";
import {NPC} from "./NPC.sol";

contract Competition is Owned {
  string public name;
  uint public minStake;
  uint public maxNPCs;
  NPC[] public npcs;
  string public answer;
  bool public answerSubmitted;

  mapping(uint => uint) public id2score;

  modifier onlyNpcOwner(uint id) { require(npcs[id].addr() == msg.sender); _; }

  constructor(
      address _owner,
      string memory _name,
      uint _maxNPCs, 
      uint _minStake
  ) Owned(_owner) {
      name     = _name;
      maxNPCs  = _maxNPCs;
      minStake = _minStake;
  }

  function join(NPC npc) public payable returns (uint) {
    require(msg.value >= minStake);
    require(!answerSubmitted);
    uint id = npcs.length;
    require(id < maxNPCs);
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
      bool isCorrectAnswer = keccak256(abi.encodePacked(prediction)) == 
                             keccak256(abi.encodePacked(answer));
      if (isVerfified && isCorrectAnswer) { id2score[id] += 1; }
  }

  function claim(uint id) public onlyNpcOwner(id) {
    uint numberOfWinners = 0;
    for (uint i = 0; i < npcs.length; ) {
      if (_isWinner(i)) { numberOfWinners += 1; }
      ++i;
    }
    if (numberOfWinners > 0 && npcs[id].addr() == msg.sender) {
      payable(address(msg.sender)).transfer(address(this).balance / numberOfWinners);
    }
  }

  function _isWinner(uint id) internal view returns (bool) {
    return id2score[id] == 1;
  }

  function setAnswer(string memory _answer) public onlyOwner {
    require(!answerSubmitted);
    answerSubmitted = true;
    answer          = _answer;
  }
}
