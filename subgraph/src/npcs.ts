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
  const npcFactory = NPCFactory.bind(call.to);
  const id = npcFactory.id().toString();
  const npc = new Npc(id);
  competition.address = call.outputs.value0;
  competition.name = call.inputs.name;
  competition.maxParticipants = call.inputs.maxParticipants;
  competition.minStake = call.inputs.minStake;
  competition.save();

  // Create a new Competition template
  const context = new DataSourceContext();
  context.setString("id", id);
  CompetitionTemplate.createWithContext(call.outputs.value0, context);
}
