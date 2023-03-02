import styled from "styled-components";
import { H4 } from "./Text";

const Container = styled.div`
  min-height: 4rem;
  border: 1px solid #2cf8e9;
  padding: 0.5rem;
`;

interface Props {
  title: string;
}

function Slider({ title }: Props) {
  return (
    <Container>
      <H4>{title}</H4>
    </Container>
  );
}

export default Slider;
