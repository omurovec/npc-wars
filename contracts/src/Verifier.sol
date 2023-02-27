// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

abstract contract Verifier {
  function verify(
    uint256[] memory pubInputs,
    bytes memory proof
  ) public view virtual returns (bool);
}
