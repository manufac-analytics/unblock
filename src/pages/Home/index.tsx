import { ContractInteraction } from "../../components/ContractInteraction";
import { HistoricalTransfer } from "../../components/HistoricalTransfer";
import { RiskScoreCard } from "../../components/RiskScore";
import { TokenBalance } from "../../components/TokenBalance";
import { useBalances } from "../../hooks/useBalances";
import { useContractInteractions } from "../../hooks/useContractInteractions";
import { useRiskScore } from "../../hooks/useRiskScore";
import { useTransferHistory } from "../../hooks/useTransferHistory";
import { Input, Stack, Button, Container, Group, Title } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useState } from "react";

export function Home() {
  const [inputAddress, setInputAddress] = useInputState("");
  const [walletAddress, setWalletAddress] = useState("0x8a90cab2b38dba80c64b7734e58ee1db38b8992e");

  const { data: transferData, isLoading: isLoadingTransfers } = useTransferHistory(walletAddress);
  const { data: balanceData, isLoading: isLoadingBalances } = useBalances(walletAddress);
  const { data: riskScoreData, isLoading: isLoadingRisk } = useRiskScore(walletAddress);
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
        <Title order={3}>Current Wallet Addess: {walletAddress}</Title>
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
        {isLoadingRisk === false && riskScoreData !== undefined ? (
          <RiskScoreCard riskScore={riskScoreData} />
        ) : null}
      </Stack>
    </Container>
  );
}
