import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { H1 } from "../components/Text";
import { TextInput, FileInputButton } from "../components/Input";
import npcSrc from "../assets/npc.png";
import TextBox from "../components/TextBox";
import WalletButton from "../components/WalletButton";
import { Button } from "../components/Button";
import axios from "axios";

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

const StatsBar = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1.8rem;
`;

const phase = keyframes`
  0% {
    opacity: 100%;
  }
  1% {
    opacity: 70%;
  }
  2% {
    opacity: 100%;
  }
  59% {
    opacity: 100%;
  }
  60% {
    opacity: 25%;
  }
  61% {
    opacity: 100%;
  }
  62% {
    opacity: 100%;
  }
  63% {
    opacity: 50%;
  }
  64% {
    opacity: 100%;
  }
`;

const NpcImg = styled.img`
  flex: 1;
  width: 30vw;
  object-fit: contain;
  height: auto;
  transform: scale(1.1);
  z-index: 2;
  animation: ${phase} 2s ease-in-out infinite;
`;

const DeployButton = styled(Button)`
  width: 100%;
`;

const Home = () =>  {
  const [selectedFile, setSelectedFile] = useState<any>();
	const [isFilePicked, setIsFilePicked] = useState(false);

  function uploadFile(){
    
    var data = new FormData();
    data.append("file", selectedFile);

    axios.post("http://localhost:8080/getVerifierBytecode", data).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  const changeHandler = (event: any) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

  return (
    <Wrapper>
      <Header>
        <StatsBar>
          <H1>Your NPC</H1>
          <TextInput placeholder="Name" />
          <TextInput placeholder="Architecture" />
          <FileInputButton onChange={changeHandler}/>
          <TextBox>
            it is very important to blabalablablabalbal ash ados fiewf sasidna
            asidnwoidaskdae sdhd swa vomvl hvosdom alsc,aiocjsndvjsl
            ñalsmdañsldañ shdcsomsf Take over the world someday yes we will yes
            i dont have enough money for that brother
          </TextBox>
          <DeployButton onClick={uploadFile} disabled={!isFilePicked}>Deploy</DeployButton>
        </StatsBar>
        <NpcImg src={npcSrc} alt="npc_img" />
        <StatsBar>
          <WalletButton />
        </StatsBar>
      </Header>
    </Wrapper>
  );
}

export default Home;
