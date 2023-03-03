import styled from "styled-components";

export const BlurContainer1 = styled.div`
  position: relative;
  background: none;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(2px);
    border: 2px solid #2cf8e9;
  }
`;

export const BlurContainer2 = styled.div`
  position: relative;
  background: none;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(1px);
    border: 2px solid #2cf8e9;
  }
`;
