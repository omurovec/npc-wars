// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

import "forge-std/Script.sol";
import {CompetitionFactory} from "../src/CompetitionFactory.sol";
import {NPC} from "../src/NPC.sol";
import {NPCFactory} from "../src/NPCFactory.sol";
import {Competition} from "../src/Competition.sol";
import {Verifier} from "../src/Verifier.sol";

contract DeployBase is Script {
  function run()
    public 
    payable {
      vm.startBroadcast();
      uint stake = 0.01 ether;

      CompetitionFactory cf = new CompetitionFactory();
      Competition competition = Competition(cf.create(
        address(0),
        "base",
        100,
        stake
      ));

      Verifier verifier = new Verifier();

      NPCFactory nf = new NPCFactory();

      NPC npc1 = nf.create(
        120,
        "pikachu",
        "CNN",
        "https://ipfs.pixura.io/ipfs/SeaofRoses.jpg",
        address(verifier)
      );
      NPC npc2 = nf.create(
        120,
        "mew",
        "Transformer",
        "https://ipfs.pixura.io/ipfs/SeaofRoses.jpg", 
        address(verifier)
      );
      NPC npc3 = nf.create(
        120,
        "onnx",
        "CNN",
        "https://ipfs.pixura.io/ipfs/SeaofRoses.jpg", 
        address(verifier)
      );

      competition.join{value: stake}(npc1);
      competition.join{value: stake}(npc2);
      competition.join{value: stake}(npc3);

      vm.stopBroadcast();
  }
}
