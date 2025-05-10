import { HistoricalTransfer } from "../../components/HistoricalTransfer";
import { useTransferHistory } from "../../hooks/useTransferHistory";
import { Input, Stack, Button, Container, Group } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useState } from "react";

export function PageA() {
  const [inputAddress, setInputAddress] = useInputState("");
  const [walletAddress, setWalletAddress] = useState("");
  const { data, isLoading } = useTransferHistory(walletAddress);

  const handleFetchTransfers = () => {
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
          <Button onClick={handleFetchTransfers} loading={isLoading}>
            Get Transfer History
          </Button>
        </Group>
        {isLoading === false && data !== undefined ? <HistoricalTransfer transfers={data} /> : null}
      </Stack>
    </Container>
  );
}
