// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Competition} from "./Competition.sol";

contract CompetitionFactory {
  uint id;

  mapping(uint => Competition) public id2competitions;

  function create(
      address owner,
      string memory name,
      uint maxParticipants, 
      uint minStake
  ) public 
    returns(Competition) {
      Competition competition = new Competition(
        owner,
        name,
        maxParticipants,
        minStake
      );
      id2competitions[id++]   = competition;
      return competition;
  }
}
