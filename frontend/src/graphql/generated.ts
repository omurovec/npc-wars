import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars["Int"];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars["Bytes"]>;
  number?: InputMaybe<Scalars["Int"]>;
  number_gte?: InputMaybe<Scalars["Int"]>;
};

export type Competition = {
  __typename?: "Competition";
  address: Scalars["Bytes"];
  answerSubmitted?: Maybe<Scalars["Boolean"]>;
  id: Scalars["ID"];
  joins: Array<Join>;
  maxParticipants: Scalars["BigInt"];
  minStake: Scalars["BigInt"];
  name: Scalars["String"];
};

export type CompetitionJoinsArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Join_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Join_Filter>;
};

export type Competition_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars["Bytes"]>;
  address_contains?: InputMaybe<Scalars["Bytes"]>;
  address_gt?: InputMaybe<Scalars["Bytes"]>;
  address_gte?: InputMaybe<Scalars["Bytes"]>;
  address_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  address_lt?: InputMaybe<Scalars["Bytes"]>;
  address_lte?: InputMaybe<Scalars["Bytes"]>;
  address_not?: InputMaybe<Scalars["Bytes"]>;
  address_not_contains?: InputMaybe<Scalars["Bytes"]>;
  address_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  and?: InputMaybe<Array<InputMaybe<Competition_Filter>>>;
  answerSubmitted?: InputMaybe<Scalars["Boolean"]>;
  answerSubmitted_in?: InputMaybe<Array<Scalars["Boolean"]>>;
  answerSubmitted_not?: InputMaybe<Scalars["Boolean"]>;
  answerSubmitted_not_in?: InputMaybe<Array<Scalars["Boolean"]>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  joins_?: InputMaybe<Join_Filter>;
  maxParticipants?: InputMaybe<Scalars["BigInt"]>;
  maxParticipants_gt?: InputMaybe<Scalars["BigInt"]>;
  maxParticipants_gte?: InputMaybe<Scalars["BigInt"]>;
  maxParticipants_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  maxParticipants_lt?: InputMaybe<Scalars["BigInt"]>;
  maxParticipants_lte?: InputMaybe<Scalars["BigInt"]>;
  maxParticipants_not?: InputMaybe<Scalars["BigInt"]>;
  maxParticipants_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  minStake?: InputMaybe<Scalars["BigInt"]>;
  minStake_gt?: InputMaybe<Scalars["BigInt"]>;
  minStake_gte?: InputMaybe<Scalars["BigInt"]>;
  minStake_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  minStake_lt?: InputMaybe<Scalars["BigInt"]>;
  minStake_lte?: InputMaybe<Scalars["BigInt"]>;
  minStake_not?: InputMaybe<Scalars["BigInt"]>;
  minStake_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  name?: InputMaybe<Scalars["String"]>;
  name_contains?: InputMaybe<Scalars["String"]>;
  name_contains_nocase?: InputMaybe<Scalars["String"]>;
  name_ends_with?: InputMaybe<Scalars["String"]>;
  name_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  name_gt?: InputMaybe<Scalars["String"]>;
  name_gte?: InputMaybe<Scalars["String"]>;
  name_in?: InputMaybe<Array<Scalars["String"]>>;
  name_lt?: InputMaybe<Scalars["String"]>;
  name_lte?: InputMaybe<Scalars["String"]>;
  name_not?: InputMaybe<Scalars["String"]>;
  name_not_contains?: InputMaybe<Scalars["String"]>;
  name_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  name_not_ends_with?: InputMaybe<Scalars["String"]>;
  name_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  name_not_in?: InputMaybe<Array<Scalars["String"]>>;
  name_not_starts_with?: InputMaybe<Scalars["String"]>;
  name_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  name_starts_with?: InputMaybe<Scalars["String"]>;
  name_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  or?: InputMaybe<Array<InputMaybe<Competition_Filter>>>;
};

export enum Competition_OrderBy {
  Address = "address",
  AnswerSubmitted = "answerSubmitted",
  Id = "id",
  Joins = "joins",
  MaxParticipants = "maxParticipants",
  MinStake = "minStake",
  Name = "name",
}

export type Join = {
  __typename?: "Join";
  competition: Competition;
  id: Scalars["ID"];
  npc: Npc;
  pendingAnswer?: Maybe<Scalars["Boolean"]>;
  winner?: Maybe<Scalars["Boolean"]>;
};

export type Join_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Join_Filter>>>;
  competition?: InputMaybe<Scalars["String"]>;
  competition_?: InputMaybe<Competition_Filter>;
  competition_contains?: InputMaybe<Scalars["String"]>;
  competition_contains_nocase?: InputMaybe<Scalars["String"]>;
  competition_ends_with?: InputMaybe<Scalars["String"]>;
  competition_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  competition_gt?: InputMaybe<Scalars["String"]>;
  competition_gte?: InputMaybe<Scalars["String"]>;
  competition_in?: InputMaybe<Array<Scalars["String"]>>;
  competition_lt?: InputMaybe<Scalars["String"]>;
  competition_lte?: InputMaybe<Scalars["String"]>;
  competition_not?: InputMaybe<Scalars["String"]>;
  competition_not_contains?: InputMaybe<Scalars["String"]>;
  competition_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  competition_not_ends_with?: InputMaybe<Scalars["String"]>;
  competition_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  competition_not_in?: InputMaybe<Array<Scalars["String"]>>;
  competition_not_starts_with?: InputMaybe<Scalars["String"]>;
  competition_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  competition_starts_with?: InputMaybe<Scalars["String"]>;
  competition_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  npc?: InputMaybe<Scalars["String"]>;
  npc_?: InputMaybe<Npc_Filter>;
  npc_contains?: InputMaybe<Scalars["String"]>;
  npc_contains_nocase?: InputMaybe<Scalars["String"]>;
  npc_ends_with?: InputMaybe<Scalars["String"]>;
  npc_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  npc_gt?: InputMaybe<Scalars["String"]>;
  npc_gte?: InputMaybe<Scalars["String"]>;
  npc_in?: InputMaybe<Array<Scalars["String"]>>;
  npc_lt?: InputMaybe<Scalars["String"]>;
  npc_lte?: InputMaybe<Scalars["String"]>;
  npc_not?: InputMaybe<Scalars["String"]>;
  npc_not_contains?: InputMaybe<Scalars["String"]>;
  npc_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  npc_not_ends_with?: InputMaybe<Scalars["String"]>;
  npc_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  npc_not_in?: InputMaybe<Array<Scalars["String"]>>;
  npc_not_starts_with?: InputMaybe<Scalars["String"]>;
  npc_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  npc_starts_with?: InputMaybe<Scalars["String"]>;
  npc_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  or?: InputMaybe<Array<InputMaybe<Join_Filter>>>;
  pendingAnswer?: InputMaybe<Scalars["Boolean"]>;
  pendingAnswer_in?: InputMaybe<Array<Scalars["Boolean"]>>;
  pendingAnswer_not?: InputMaybe<Scalars["Boolean"]>;
  pendingAnswer_not_in?: InputMaybe<Array<Scalars["Boolean"]>>;
  winner?: InputMaybe<Scalars["Boolean"]>;
  winner_in?: InputMaybe<Array<Scalars["Boolean"]>>;
  winner_not?: InputMaybe<Scalars["Boolean"]>;
  winner_not_in?: InputMaybe<Array<Scalars["Boolean"]>>;
};

export enum Join_OrderBy {
  Competition = "competition",
  CompetitionAddress = "competition__address",
  CompetitionAnswerSubmitted = "competition__answerSubmitted",
  CompetitionId = "competition__id",
  CompetitionMaxParticipants = "competition__maxParticipants",
  CompetitionMinStake = "competition__minStake",
  CompetitionName = "competition__name",
  Id = "id",
  Npc = "npc",
  NpcArch = "npc__arch",
  NpcId = "npc__id",
  NpcImage = "npc__image",
  NpcName = "npc__name",
  NpcNumLosses = "npc__numLosses",
  NpcNumWins = "npc__numWins",
  NpcOwner = "npc__owner",
  NpcSize = "npc__size",
  NpcVerifier = "npc__verifier",
  PendingAnswer = "pendingAnswer",
  Winner = "winner",
}

export type Npc = {
  __typename?: "Npc";
  arch: Scalars["String"];
  id: Scalars["ID"];
  image: Scalars["String"];
  joins: Array<Join>;
  name: Scalars["String"];
  numLosses: Scalars["Int"];
  numWins: Scalars["Int"];
  owner: Scalars["Bytes"];
  size: Scalars["BigInt"];
  verifier: Scalars["Bytes"];
};

export type NpcJoinsArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Join_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Join_Filter>;
};

export type Npc_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Npc_Filter>>>;
  arch?: InputMaybe<Scalars["String"]>;
  arch_contains?: InputMaybe<Scalars["String"]>;
  arch_contains_nocase?: InputMaybe<Scalars["String"]>;
  arch_ends_with?: InputMaybe<Scalars["String"]>;
  arch_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  arch_gt?: InputMaybe<Scalars["String"]>;
  arch_gte?: InputMaybe<Scalars["String"]>;
  arch_in?: InputMaybe<Array<Scalars["String"]>>;
  arch_lt?: InputMaybe<Scalars["String"]>;
  arch_lte?: InputMaybe<Scalars["String"]>;
  arch_not?: InputMaybe<Scalars["String"]>;
  arch_not_contains?: InputMaybe<Scalars["String"]>;
  arch_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  arch_not_ends_with?: InputMaybe<Scalars["String"]>;
  arch_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  arch_not_in?: InputMaybe<Array<Scalars["String"]>>;
  arch_not_starts_with?: InputMaybe<Scalars["String"]>;
  arch_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  arch_starts_with?: InputMaybe<Scalars["String"]>;
  arch_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  image?: InputMaybe<Scalars["String"]>;
  image_contains?: InputMaybe<Scalars["String"]>;
  image_contains_nocase?: InputMaybe<Scalars["String"]>;
  image_ends_with?: InputMaybe<Scalars["String"]>;
  image_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  image_gt?: InputMaybe<Scalars["String"]>;
  image_gte?: InputMaybe<Scalars["String"]>;
  image_in?: InputMaybe<Array<Scalars["String"]>>;
  image_lt?: InputMaybe<Scalars["String"]>;
  image_lte?: InputMaybe<Scalars["String"]>;
  image_not?: InputMaybe<Scalars["String"]>;
  image_not_contains?: InputMaybe<Scalars["String"]>;
  image_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  image_not_ends_with?: InputMaybe<Scalars["String"]>;
  image_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  image_not_in?: InputMaybe<Array<Scalars["String"]>>;
  image_not_starts_with?: InputMaybe<Scalars["String"]>;
  image_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  image_starts_with?: InputMaybe<Scalars["String"]>;
  image_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  joins_?: InputMaybe<Join_Filter>;
  name?: InputMaybe<Scalars["String"]>;
  name_contains?: InputMaybe<Scalars["String"]>;
  name_contains_nocase?: InputMaybe<Scalars["String"]>;
  name_ends_with?: InputMaybe<Scalars["String"]>;
  name_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  name_gt?: InputMaybe<Scalars["String"]>;
  name_gte?: InputMaybe<Scalars["String"]>;
  name_in?: InputMaybe<Array<Scalars["String"]>>;
  name_lt?: InputMaybe<Scalars["String"]>;
  name_lte?: InputMaybe<Scalars["String"]>;
  name_not?: InputMaybe<Scalars["String"]>;
  name_not_contains?: InputMaybe<Scalars["String"]>;
  name_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  name_not_ends_with?: InputMaybe<Scalars["String"]>;
  name_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  name_not_in?: InputMaybe<Array<Scalars["String"]>>;
  name_not_starts_with?: InputMaybe<Scalars["String"]>;
  name_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  name_starts_with?: InputMaybe<Scalars["String"]>;
  name_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  numLosses?: InputMaybe<Scalars["Int"]>;
  numLosses_gt?: InputMaybe<Scalars["Int"]>;
  numLosses_gte?: InputMaybe<Scalars["Int"]>;
  numLosses_in?: InputMaybe<Array<Scalars["Int"]>>;
  numLosses_lt?: InputMaybe<Scalars["Int"]>;
  numLosses_lte?: InputMaybe<Scalars["Int"]>;
  numLosses_not?: InputMaybe<Scalars["Int"]>;
  numLosses_not_in?: InputMaybe<Array<Scalars["Int"]>>;
  numWins?: InputMaybe<Scalars["Int"]>;
  numWins_gt?: InputMaybe<Scalars["Int"]>;
  numWins_gte?: InputMaybe<Scalars["Int"]>;
  numWins_in?: InputMaybe<Array<Scalars["Int"]>>;
  numWins_lt?: InputMaybe<Scalars["Int"]>;
  numWins_lte?: InputMaybe<Scalars["Int"]>;
  numWins_not?: InputMaybe<Scalars["Int"]>;
  numWins_not_in?: InputMaybe<Array<Scalars["Int"]>>;
  or?: InputMaybe<Array<InputMaybe<Npc_Filter>>>;
  owner?: InputMaybe<Scalars["Bytes"]>;
  owner_contains?: InputMaybe<Scalars["Bytes"]>;
  owner_gt?: InputMaybe<Scalars["Bytes"]>;
  owner_gte?: InputMaybe<Scalars["Bytes"]>;
  owner_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  owner_lt?: InputMaybe<Scalars["Bytes"]>;
  owner_lte?: InputMaybe<Scalars["Bytes"]>;
  owner_not?: InputMaybe<Scalars["Bytes"]>;
  owner_not_contains?: InputMaybe<Scalars["Bytes"]>;
  owner_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  size?: InputMaybe<Scalars["BigInt"]>;
  size_gt?: InputMaybe<Scalars["BigInt"]>;
  size_gte?: InputMaybe<Scalars["BigInt"]>;
  size_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  size_lt?: InputMaybe<Scalars["BigInt"]>;
  size_lte?: InputMaybe<Scalars["BigInt"]>;
  size_not?: InputMaybe<Scalars["BigInt"]>;
  size_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  verifier?: InputMaybe<Scalars["Bytes"]>;
  verifier_contains?: InputMaybe<Scalars["Bytes"]>;
  verifier_gt?: InputMaybe<Scalars["Bytes"]>;
  verifier_gte?: InputMaybe<Scalars["Bytes"]>;
  verifier_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  verifier_lt?: InputMaybe<Scalars["Bytes"]>;
  verifier_lte?: InputMaybe<Scalars["Bytes"]>;
  verifier_not?: InputMaybe<Scalars["Bytes"]>;
  verifier_not_contains?: InputMaybe<Scalars["Bytes"]>;
  verifier_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
};

export enum Npc_OrderBy {
  Arch = "arch",
  Id = "id",
  Image = "image",
  Joins = "joins",
  Name = "name",
  NumLosses = "numLosses",
  NumWins = "numWins",
  Owner = "owner",
  Size = "size",
  Verifier = "verifier",
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = "asc",
  Desc = "desc",
}

export type Query = {
  __typename?: "Query";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  competition?: Maybe<Competition>;
  competitions: Array<Competition>;
  join?: Maybe<Join>;
  joins: Array<Join>;
  npc?: Maybe<Npc>;
  npcs: Array<Npc>;
};

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryCompetitionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCompetitionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Competition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Competition_Filter>;
};

export type QueryJoinArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryJoinsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Join_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Join_Filter>;
};

export type QueryNpcArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryNpcsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Npc_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Npc_Filter>;
};

export type Subscription = {
  __typename?: "Subscription";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  competition?: Maybe<Competition>;
  competitions: Array<Competition>;
  join?: Maybe<Join>;
  joins: Array<Join>;
  npc?: Maybe<Npc>;
  npcs: Array<Npc>;
};

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type SubscriptionCompetitionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionCompetitionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Competition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Competition_Filter>;
};

export type SubscriptionJoinArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionJoinsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Join_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Join_Filter>;
};

export type SubscriptionNpcArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionNpcsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Npc_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Npc_Filter>;
};

export type _Block_ = {
  __typename?: "_Block_";
  /** The hash of the block */
  hash?: Maybe<Scalars["Bytes"]>;
  /** The block number */
  number: Scalars["Int"];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars["Int"]>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: "_Meta_";
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars["String"];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars["Boolean"];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = "allow",
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = "deny",
}

export type NpcQueryVariables = Exact<{
  user: Scalars["Bytes"];
}>;

export type NpcQuery = {
  __typename?: "Query";
  npcs: Array<{
    __typename?: "Npc";
    id: string;
    name: string;
    size: any;
    arch: string;
    image: string;
    numWins: number;
    numLosses: number;
    joins: Array<{
      __typename?: "Join";
      pendingAnswer?: boolean | null;
      competition: { __typename?: "Competition"; id: string };
    }>;
  }>;
};

export type CompetitionQueryVariables = Exact<{ [key: string]: never }>;

export type CompetitionQuery = {
  __typename?: "Query";
  competitions: Array<{
    __typename?: "Competition";
    id: string;
    address: any;
    name: string;
    maxParticipants: any;
    minStake: any;
    answerSubmitted?: boolean | null;
    joins: Array<{
      __typename?: "Join";
      id: string;
      npc: { __typename?: "Npc"; id: string; owner: any };
    }>;
  }>;
};

export const NpcDocument = gql`
  query npc($user: Bytes!) {
    npcs(where: { owner: $user }) {
      id
      name
      size
      arch
      image
      numWins
      numLosses
      joins {
        competition {
          id
        }
        pendingAnswer
      }
    }
  }
`;

export function useNpcQuery(
  options: Omit<Urql.UseQueryArgs<NpcQueryVariables>, "query">
) {
  return Urql.useQuery<NpcQuery, NpcQueryVariables>({
    query: NpcDocument,
    ...options,
  });
}
export const CompetitionDocument = gql`
  query competition {
    competitions {
      id
      address
      name
      maxParticipants
      minStake
      answerSubmitted
      joins {
        id
        npc {
          id
          owner
        }
      }
    }
  }
`;

export function useCompetitionQuery(
  options?: Omit<Urql.UseQueryArgs<CompetitionQueryVariables>, "query">
) {
  return Urql.useQuery<CompetitionQuery, CompetitionQueryVariables>({
    query: CompetitionDocument,
    ...options,
  });
}
