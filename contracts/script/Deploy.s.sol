// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

import "forge-std/Script.sol";
import {CompetitionFactory} from "../src/CompetitionFactory.sol";
import {NPC} from "../src/NPC.sol";
import {Competition} from "../src/Competition.sol";

contract DeployBase is Script {
  function deploy(address oracle, uint minMintDyadDeposit, address owner)
    public
    payable
    returns (address, address) {
      vm.startBroadcast();

      CompetitionFactory cf = new CompetitionFactory();
      Competition competition = Competition(cf.create(address(0), "shafu", 100));

      NPC npc1 = new NPC(120, "pikachu", "CNN", "https://ipfs.pixura.io/ipfs/QmUyARmq5RUJk5zt7KUeaMLYB8SQbKHp3Gdqy5WSxRtPNa/SeaofRoses.jpg");
      NPC npc2 = new NPC(120, "mew", "Transformer", "https://ipfs.pixura.io/ipfs/QmUyARmq5RUJk5zt7KUeaMLYB8SQbKHp3Gdqy5WSxRtPNa/SeaofRoses.jpg");
      NPC npc3 = new NPC(120, "onnx", "CNN", "https://ipfs.pixura.io/ipfs/QmUyARmq5RUJk5zt7KUeaMLYB8SQbKHp3Gdqy5WSxRtPNa/SeaofRoses.jpg");

      competition.join(npc1);
      competition.join(npc2);
      competition.join(npc3);

      vm.stopBroadcast();
  }
}
