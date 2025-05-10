import { useContractInteractions } from "../../hooks/useContractInteractions";
import { HistoricalTransfer } from "../../components/HistoricalTransfer";
import { TokenBalance } from "../../components/TokenBalance";
import { useBalances } from "../../hooks/useBalances";
import { useTransferHistory } from "../../hooks/useTransferHistory";
import { Input, Stack, Button, Container, Group } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useState } from "react";
import { ContractInteraction } from "../../components/ContractInteraction";

export function PageA() {
  const [inputAddress, setInputAddress] = useInputState("");
  const [walletAddress, setWalletAddress] = useState("");

  const { data: transferData, isLoading: isLoadingTransfers } = useTransferHistory(walletAddress);
  const { data: balanceData, isLoading: isLoadingBalances } = useBalances(walletAddress);
  const { data: interactionData, isLoading: isLoadingInteraction } =
    useContractInteractions(walletAddress);

  const handleFetch = () => {
    setWalletAddress(inputAddress.trim());
  };

  return (
    <Container fluid>
      <Stack align="center">
        <Group>
          <Input
            placeholder="Enter wallet address"
            value={inputAddress}
            onChange={setInputAddress}
          />
          <Button
            onClick={handleFetch}
            loading={isLoadingTransfers || isLoadingBalances || isLoadingInteraction}
          >
            Fetch Data
          </Button>
        </Group>

        {isLoadingBalances === false && balanceData !== undefined ? (
          <TokenBalance
            ethBalance={balanceData.ethBalance}
            tokenBalances={balanceData.tokenBalances}
          />
        ) : null}
        {isLoadingTransfers === false && transferData !== undefined ? (
          <HistoricalTransfer transfers={transferData.transfers} />
        ) : null}
        {isLoadingInteraction === false && interactionData !== undefined ? (
          <ContractInteraction interaction={interactionData} />
        ) : null}
      </Stack>
    </Container>
  );
}
