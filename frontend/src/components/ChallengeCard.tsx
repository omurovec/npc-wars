import { BigNumberish } from "ethers";
import { formatEther } from "ethers/lib/utils.js";
import styled from "styled-components";
import { useAccount } from "wagmi";

import { H1 } from "../components/Text";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  width: 29%;
  padding: 1rem;
  border: 1px solid #2cf8e9;
  color: #2cf8e9;
`;

const Header = styled(H1)`
  width: 100%;
  text-align: center;
  font-size: 4rem;
  color: #2cf8e9;
  text-shadow: none;
  margin: 3rem 0;
`;

const Button = styled.button`
  margin-left: -1rem;
  margin-right: -1rem;
  width: calc(100% + 2rem);
  background: none;
  border: none;
  border-top: 1px solid #2cf8e9;
  height: 3rem;
  color: #2cf8e9;
  text-justify: center;
  line-height: 3rem;
  padding-top: 0.5rem;
  margin-top: 1rem;
  cursor: pointer;

  &:disabled {
    color: #2cf8e933;
  }
`;

interface Challenge {
  name: string;
  minStake: BigNumberish;
  joins: {
    id: string;
    npc: {
      id: string;
      owner: string;
    };
  }[];
  maxParticipants: number;
}

interface ChallengeProps {
  challenge: Challenge;
}

export default function ChallengeCard({
  challenge: { name, minStake, joins, maxParticipants },
}: ChallengeProps) {
  const { address } = useAccount();

  const isJoined = joins.some((join) => join.npc.owner === address);

  return (
    <CardContainer>
      <Header>{name}</Header>
      <p>stake: {formatEther(minStake)} Ξ</p>
      <p>
        participants: {joins.length}/{maxParticipants}
      </p>
      <Button disabled={isJoined}>{isJoined ? "Joined" : "Join"}</Button>
    </CardContainer>
  );
}
