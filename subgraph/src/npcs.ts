import { BigInt } from "@graphprotocol/graph-ts";
import { NPCFactory, CreateCall } from "../generated/NPCFactory/NPCFactory";
import { Npc } from "../generated/schema";

export function ensureNpc(id: string): Npc {
  let competition = Npc.load(id);
  if (competition == null) {
    competition = new Npc(id);
  }
  return competition as Npc;
}

export function handleCreateCall(call: CreateCall): void {
  let id = call.outputs.value0.toHexString();
  const npc = new Npc(id);
  npc.verifier = call.inputs._verifier;
  npc.name = call.inputs._name;
  npc.size = call.inputs._size;
  npc.arch = call.inputs._arch;
  npc.image = call.inputs._image;
  npc.owner = call.from;
  npc.numWins = 0;
  npc.numLosses = 0;
  npc.save();
}
