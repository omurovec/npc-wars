import styled, { keyframes } from "styled-components";
import { useCallback, useState } from "react";
import axios from "axios";
import { useAccount, useSigner } from "wagmi";
import { getContractAddress, hexlify } from "ethers/lib/utils.js";
import { Contract } from "ethers";

import { H1 } from "../components/Text";
import { TextInput, FileInputButton } from "../components/Input";
import npcSrc from "../assets/npc.png";
import TextBox from "../components/TextBox";
import WalletButton from "../components/WalletButton";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";
import NpcFactoryAbi from "../abis/NPCFactory.json";

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

const Home = () => {
  const [selectedFile, setSelectedFile] = useState<any>();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [name, setName] = useState<string>();
  const [arch, setArch] = useState<string>();
  const [size, setSize] = useState<number>();
  const [loading, setLoading] = useState(false);

  const { data: signer } = useSigner();
  const { address } = useAccount();

  function uploadFile() {
    var data = new FormData();
    data.append("file", selectedFile);

    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/getVerifierBytecode`, data)
      .then(async function (response) {
        setSize(response.data.onnx_length);
        if (signer && address) {
          const nonce = await signer.getTransactionCount();
          const contractAddress = getContractAddress({
            from: address,
            nonce,
          });
          console.log("TX sent");
          const tx = await signer.sendTransaction({
            to: "0x0000000000000000000000000000000000000000",
            value: 0,
            data: hexlify(response.data.code),
          });
          tx.wait();
          console.log("TX confirmed");
          const NpcFactory = new Contract(
            process.env.REACT_APP_NPC_FACTORY ?? "",
            NpcFactoryAbi,
            signer
          );
          console.log("send create NPC");

          await NpcFactory.create(size, name, arch, "", contractAddress);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleNameChange = useCallback((e: any) => {
    setName(e.target.value);
  }, []);

  const handleArchChange = useCallback((e: any) => {
    setArch(e.target.value);
  }, []);

  return (
    <Wrapper>
      <Header>
        <StatsBar>
          <H1>Your NPC</H1>
          <TextInput placeholder="Name" onChange={handleNameChange} />
          <TextInput placeholder="Architecture" onChange={handleArchChange} />
          <FileInputButton onChange={changeHandler} />
          <TextBox>
            it is very important to blabalablablabalbal ash ados fiewf sasidna
            asidnwoidaskdae sdhd swa vomvl hvosdom alsc,aiocjsndvjsl
            ñalsmdañsldañ shdcsomsf Take over the world someday yes we will yes
            i dont have enough money for that brother
          </TextBox>
          <DeployButton onClick={uploadFile} disabled={!isFilePicked}>
            {loading ? <Loader /> : "Deploy"}
          </DeployButton>
        </StatsBar>
        <NpcImg src={npcSrc} alt="npc_img" />
        <StatsBar>
          <WalletButton />
        </StatsBar>
      </Header>
    </Wrapper>
  );
};

export default Home;
