import { useCallback } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import { Button } from "./Button";
import { H2 } from "./Text";

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
      {isConnected ? (
        <H2>
          {`${address?.slice(0, 6)}...${address?.substring(
            address.length - 4
          )}`}
        </H2>
      ) : (
        "Connect Wallet"
      )}
    </Button>
  );
}

export default WalletButton;
