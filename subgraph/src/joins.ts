import { Join } from "../generated/schema";

export function ensureJoin(id: string): Join {
  let join = Join.load(id);
  if (join == null) {
    join = new Join(id);
    join.save();
  }
  return join as Join;
}

export function createJoin(id: string, npc: string, competition: string): Join {
  let join = new Join(id);
  join.npc = npc;
  join.competition = competition;
  join.save();
  return join as Join;
}
