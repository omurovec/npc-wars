import styled from "styled-components";
import { BlurContainer2 } from "./Container";

const Container = styled(BlurContainer2)`
  padding: 0.5rem 1rem;
`;

const Text = styled.p`
  color: #2cf8e9;
  font-size: 0.5rem;
  text-align: center;
  line-height: 1.2;
`;

interface Props {
  children: React.ReactNode;
}

function TextBox({ children }: Props) {
  return (
    <Container>
      <Text>{children}</Text>
    </Container>
  );
}

export default TextBox;
