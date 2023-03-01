import styled from "styled-components";

import { H1, H2 } from "../components/Text";
import { TextInput, FileInputButton } from "../components/Input";
import npcSrc from "../assets/npc.png";
import TextBox from "../components/TextBox";

const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
`;

const Header = styled.div`
  flex: 1;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: center;
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: center;
  height: 8rem;
  padding: 1rem;
  gap: 1.8rem;
`;

const StatsBar = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1.8rem;
`;

const NpcImg = styled.img`
  flex: 1;
  width: 30vw;
  object-fit: contain;
  height: auto;
  /* transform: scale(1.1); */
  z-index: 2;
`;

const AltButton = styled.button`
  background-color: #2cf8e9;
  border: none;
  height: 3rem;
  padding: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #000;
  cursor: pointer;

  &:disabled {
    opacity: 0.25;
  }
`;

const Button = styled.button`
  background: none;
  border: 1px solid #2cf8e9;
  padding: 0.5rem;
  flex: 1;
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 0;
  padding: 0;
  text-shadow: #2cf8e9 0 1px, #2cf8e9 -1px 0, #2cf8e9 1px 0, #2cf8e9 0 -1px;
  letter-spacing: 2.5px;
  color: #ffffff;
`;

function Home() {
  return (
    <Wrapper>
      <Header>
        <StatsBar>
          <H1>Your NPC</H1>
          <TextInput placeholder="Name" />
          <TextInput placeholder="Architecture" />
          <FileInputButton />
          <TextBox>
            it is very important to blabalablablabalbal ash ados fiewf sasidna
            asidnwoidaskdae sdhd swa vomvl hvosdom alsc,aiocjsndvjsl
            ñalsmdañsldañ shdcsomsf Take over the world someday yes we will yes
            i dont have enough money for that brother
          </TextBox>
          <AltButton disabled>Deploy</AltButton>
        </StatsBar>
        <NpcImg src={npcSrc} alt="npc_img" />
        <StatsBar>
          <H2>Connect Wallet</H2>
        </StatsBar>
      </Header>
      <ActionsContainer>
        <Button>NPC</Button>
        <Button>fight</Button>
        <Button>leaderboard</Button>
      </ActionsContainer>
    </Wrapper>
  );
}

export default Home;
