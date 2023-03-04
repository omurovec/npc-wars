import {
  CompetitionFactory,
  CreateCall
} from "../generated/CompetitionFactory/CompetitionFactory";
import {
  Competition as CompetitionContract,
  JoinCall,
  VerifyCall,
  ClaimCall
} from "../generated/templates/Competition/Competition";
import { Competition as CompetitionTemplate } from "../generated/templates";
import { Competition } from "../generated/schema";
import { BigInt, dataSource, DataSourceContext } from "@graphprotocol/graph-ts";
import { ensureNpc } from "./npcs";
import { createJoin, ensureJoin } from "./joins";

function ensureCompetition(id: string): Competition {
  let competition = Competition.load(id);
  if (competition == null) {
    competition = new Competition(id);
  }
  return competition as Competition;
}

export function handleCompetitionCreated(call: CreateCall): void {
  const competitionFactory = CompetitionFactory.bind(call.to);
  const id = competitionFactory
    .id()
    .minus(BigInt.fromI32(1))
    .toString();
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

  createJoin(call.outputs.value0.toString(), call.inputs.npc.toHexString(), id);
}

export function handleVerify(call: VerifyCall): void {
  const join = ensureJoin(call.inputs.id.toString());
  join.pendingAnswer = false;
  join.save();
}

export function handleClaim(call: ClaimCall): void {
  const competition = CompetitionContract.bind(call.to);
  const score = competition.id2score(call.inputs.id);
  const join = ensureJoin(call.inputs.id.toString());

  join.winner = score.gt(BigInt.fromI32(0));
  join.save();
}

export function handleSetAnswer(): void {
  const context = dataSource.context();
  const id = context.getString("id");

  const competition = ensureCompetition(id);
  competition.answerSubmitted = true;
  competition.save();

  // Set pending answer for all joins
  const joins = competition.joins;
  for (let i = 0; i < joins.length; i++) {
    const join = ensureJoin(joins[i]);
    join.pendingAnswer = true;
    join.save();
  }
}
