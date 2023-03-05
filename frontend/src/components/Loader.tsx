import styled, { keyframes } from "styled-components";

const animation = keyframes`
    to {
      clip-path: inset(0 -34% 0 0);
    }
`;

export const Loader = styled.span`
  display: block;
  background: #000;
  width: 60px;
  height: 10px;
  margin: 0 auto;
  aspect-ratio: 4;
  background: radial-gradient(square closest-side, #000 90%, #0000) 0 /
    calc(100% / 3) 100% space;
  clip-path: inset(0 100% 0 0);
  animation: ${animation} 1s steps(4) infinite;
`;
