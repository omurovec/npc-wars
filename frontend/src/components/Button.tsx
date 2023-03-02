import styled from "styled-components";

import { BlurContainer2 } from "./Container";

const ButtonStyles = styled(BlurContainer2)<{ alt: boolean }>`
  background-color: ${({ alt }) => (alt ? "#00000000" : "#2cf8e9")};
  border: none;
  color: ${({ alt }) => (alt ? "#2cf8e9" : "black")};
  height: 3rem;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  margin-left: auto;
  box-shadow: ${({ alt }) => (alt ? "none" : "0 0 5px 1px #2cf8e9")};

  &:disabled {
    opacity: 0.25;
    cursor: not-allowed;
  }

  &::before {
    ${({ alt }) => (alt ? "" : "display: none")}
  }
`;

interface ButtonProps {
  alt?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  children,
  alt,
  ...props
}: ButtonProps & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <ButtonStyles as="button" alt={!!alt} {...props}>
      {children}
    </ButtonStyles>
  );
}
