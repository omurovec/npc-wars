import { parseEther } from "ethers/lib/utils.js";
import styled from "styled-components";
import ChallengeCard from "../components/ChallengeCard";
import WalletButton from "../components/WalletButton";
import { Button } from "../components/Button";

import { useCompetitionQuery } from "../graphql/generated";
import { useEffect } from "react";

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

export default function Fight() {
  const [{ data }] = useCompetitionQuery();

  return (
    <Wrapper>
      <Header>
        <CreateButton>+ create</CreateButton>
        <WalletButton></WalletButton>
      </Header>
      <MainContainer>
        {data?.competitions.map((challenge) => (
          <ChallengeCard challenge={challenge} key={challenge.id} />
        ))}
      </MainContainer>
    </Wrapper>
  );
}
