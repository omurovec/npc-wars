import { BigNumberish } from "ethers";
import { formatEther } from "ethers/lib/utils.js";
import styled from "styled-components";

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

const Description = styled.p`
  font-size: 1rem;
  color: #2cf8e9;
  text-shadow: none;
  margin: 0.5rem 0;
  line-height: 1.5;
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
`;

interface Challenge {
  challengeType: string;
  description: string;
  stake: BigNumberish;
  participants: number;
  maxParticipants: number;
}

interface ChallengeProps {
  challenge: Challenge;
}

export default function ChallengeCard({
  challenge: {
    challengeType,
    description,
    stake,
    participants,
    maxParticipants,
  },
}: ChallengeProps) {
  return (
    <CardContainer>
      <Header>{challengeType}</Header>
      <Description>{description}</Description>
      <p>stake: {formatEther(stake)} Ξ</p>
      <p>
        participants: {participants}/{maxParticipants}
      </p>
      <Button>Sign up</Button>
    </CardContainer>
  );
}
