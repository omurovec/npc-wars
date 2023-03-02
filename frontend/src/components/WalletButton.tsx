import { useCallback } from "react";
import styled from "styled-components";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const Button = styled.button<{ alt: boolean }>`
  background-color: ${({ alt }) => (alt ? "#00000000" : "#2cf8e9")};
  border: ${({ alt }) => (alt ? "1px solid #2cf8e9" : "none")};
  color: ${({ alt }) => (alt ? "#2cf8e9" : "black")};
  height: 3rem;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  margin-left: auto;

  &:disabled {
    opacity: 0.25;
  }
`;

function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector({}),
  });
  const { disconnect } = useDisconnect();

  const handleClick = useCallback(() => {
    console.log("click");
    isConnected ? disconnect() : connect();
  }, [isConnected, connect, disconnect]);

  return (
    <Button alt={isConnected} onClick={handleClick}>
      {isConnected
        ? `${address?.slice(0, 6)}...${address?.substring(address.length - 4)}`
        : "Connect Wallet"}
    </Button>
  );
}

export default WalletButton;
