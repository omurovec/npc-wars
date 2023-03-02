import styled from "styled-components";
import { getDefaultProvider } from "ethers";
import { WagmiConfig, createClient } from "wagmi";

import Home from "./pages/Home";
import Fight from "./pages/Fight";
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 1200px;
  max-width: 100%;
  min-height: 800px;
  padding: 2rem;
  box-sizing: border-box;
  margin: 2rem auto;

  &::before {
    z-index: -1;
    content: "";
    display: block;
    position: absolute;
    box-sizing: border-box;
    top: 0rem;
    left: 0rem;
    right: 0;
    bottom: 0;
    margin: 2rem auto;

    width: calc(1200px - 4rem);
    min-height: calc(800px - 2rem);
    max-width: calc(100vw - 4rem);
    filter: blur(2px);
    border: 2px solid #2cf8e9;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: center;
  width: 95%;
  height: 8rem;
  padding: 1rem 2rem;
  gap: 1.8rem;
`;

const Button = styled.button<{ selected: boolean }>`
  background: none;
  border: 1px solid #2cf8e9;
  box-shadow: ${({ selected }) => (selected ? "0 0 3px 2px #2cf8e9" : "none")};
  padding: 0.5rem;
  flex: 1;
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 0;
  padding: 0;
  text-shadow: ${({ selected }) =>
    selected
      ? "#2cf8e9 0 1px, #2cf8e9 -1px 0, #2cf8e9 1px 0, #2cf8e9 0 -1px"
      : "none"};
  letter-spacing: 2.5px;
  color: #ffffff;
  cursor: pointer;
`;

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider("goerli"),
});

function App() {
  const [pageIndex, setPageIndex] = useState(0);

  return (
    <Wrapper>
      <WagmiConfig client={client}>
        {(() => {
          return (
            <>
              {pageIndex === 0 && <Home />}
              {pageIndex === 1 && <Fight />}
              {pageIndex === 2 && <Fight />}
            </>
          );
        })()}
      </WagmiConfig>
      <ActionsContainer>
        <Button onClick={() => setPageIndex(0)} selected={pageIndex === 0}>
          NPC
        </Button>
        <Button onClick={() => setPageIndex(1)} selected={pageIndex === 1}>
          Fight
        </Button>
        <Button onClick={() => setPageIndex(2)} selected={pageIndex === 2}>
          Leaderboard
        </Button>
      </ActionsContainer>
    </Wrapper>
  );
}

export default App;
