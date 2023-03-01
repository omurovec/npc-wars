import styled from "styled-components";
import Home from "./pages/Home";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  max-width: 100%;
  min-height: 800px;
  padding: 2rem;
  box-sizing: border-box;

  &::before {
    z-index: -1;
    content: "";
    display: block;
    position: absolute;
    box-sizing: border-box;
    top: 2rem;
    left: 2rem;
    width: calc(1200px - 4rem);
    min-height: calc(800px - 2rem);
    max-width: calc(100vw - 4rem);
    margin-bottom: 20px;
    filter: blur(2px);
    border: 2px solid #2cf8e9;
  }
`;

function App() {
  return (
    <Wrapper>
      <Home />
    </Wrapper>
  );
}

export default App;
