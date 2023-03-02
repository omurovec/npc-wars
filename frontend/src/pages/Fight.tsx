import { parseEther } from "ethers/lib/utils.js";
import styled from "styled-components";
import ChallengeCard from "../components/ChallengeCard";
import WalletButton from "../components/WalletButton";
import { Button } from "../components/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const CreateButton = styled(Button)`
  margin-left: 0;
  margin-right: auto;
`;

const Header = styled.header`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow: scroll;
  gap: 0.5rem;
  padding: 2rem;
`;

const challenges = [
  {
    id: "a",
    challengeType: "MNIST",
    description: "Train a model to recognize handwritten digits",
    stake: parseEther("0.1"),
    participants: 1,
    maxParticipants: 3,
  },
  {
    id: "b",
    challengeType: "MNIST",
    description: "Train a model to recognize handwritten digits",
    stake: parseEther("0.1"),
    participants: 1,
    maxParticipants: 3,
  },
  {
    id: "c",
    challengeType: "MNIST",
    description: "Train a model to recognize handwritten digits",
    stake: parseEther("0.1"),
    participants: 1,
    maxParticipants: 3,
  },
];

export default function Fight() {
  return (
    <Wrapper>
      <Header>
        <CreateButton>+ create</CreateButton>
        <WalletButton></WalletButton>
      </Header>
      <MainContainer>
        {challenges.map((challenge) => (
          <ChallengeCard challenge={challenge} key={challenge.id} />
        ))}
      </MainContainer>
    </Wrapper>
  );
}
