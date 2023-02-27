// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Competition} from "./Competition.sol";

contract CompetitionFactory {
  uint id;

  function create(
      address owner,
      string memory name,
      uint maxParticipants
  ) public 
    returns(uint) {
      new Competition(owner, name, maxParticipants);
      return id++;
  }
}
