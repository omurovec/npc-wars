import {
  CompetitionFactory,
  CreateCall
} from "../generated/CompetitionFactory/CompetitionFactory";
import {
  JoinCall,
  VerifyCall,
  ClaimCall,
  SetAnswerCall
} from "../generated/templates/Competition/Competition";
import { Competition as CompetitionTemplate } from "../generated/templates";
import { Competition } from "../generated/schema";
import { dataSource, DataSourceContext } from "@graphprotocol/graph-ts";
import { ensureNpc } from "./npcs";

function ensureCompetition(id: string): Competition {
  let competition = Competition.load(id);
  if (competition == null) {
    competition = new Competition(id);
  }
  return competition as Competition;
}

export function handleCompetitionCreated(call: CreateCall): void {
  const competitionFactory = CompetitionFactory.bind(call.to);
  const id = competitionFactory.id().toString();
  const competition = new Competition(id);
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

export function handleJoin(call: JoinCall): void {
  const context = dataSource.context();
  const id = context.getString("id");

  const competition = ensureCompetition(id);
  const npc = ensureNpc(call.inputs.npc.toHexString());

  // Add NPC to Competition
  competition.participants = [
    ...competition.participants,
    call.inputs.npc.toHexString()
  ];
  competition.save();

  // Add Competition to NPC
  npc.competitions = [...npc.competitions, id];
  npc.save();
}

export function handleAnswerSubmitted(call: SetAnswerCall): void {
  const context = dataSource.context();
  const id = context.getString("id");

  const competition = ensureCompetition(id);
  competition.answerSubmitted = true;
  competition.pendingParticipants = competition.participants;
  competition.save();
}

export function handleVerify(call: VerifyCall): void {
  const context = dataSource.context();
  const id = context.getString("id");

  const competition = ensureCompetition(id);
  competition.pendingParticipants = competition.pendingParticipants.filter(
    participant => participant != call.inputs.npc.toHexString()
  );
  competition.save();
}

export function handleClaim(call: ClaimCall): void {}

export function handleSetAnswer(call: SetAnswerCall): void {}
