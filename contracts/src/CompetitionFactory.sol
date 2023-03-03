// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Competition} from "./Competition.sol";

contract CompetitionFactory {
    uint256 id;

    mapping(uint256 => Competition) public id2competitions;

    function create(address owner, string memory name, uint256 maxParticipants, uint256 minStake)
        public
        returns (Competition)
    {
        Competition competition = new Competition(
        owner,
        name,
        maxParticipants,
        minStake
      );
        id2competitions[id++] = competition;
        return competition;
    }
}
