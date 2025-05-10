import { TokenBalance } from "../../components/TokenBalance";
import { useBalances } from "../../hooks/useBalances";
import { Input, Stack, Loader, Button, Container, Group } from "@mantine/core";
import { useState } from "react";

export function PageA() {
  const [address, setAddress] = useState("");
  const [submittedAddress, setSubmittedAddress] = useState("");
  const { data, isLoading: loading } = useBalances(submittedAddress);
  const handleCheckBalance = () => {
    setSubmittedAddress(address.trim());
  };

  return (
    <Container fluid>
      <Stack align="center">
        <Group>
          <Input
            placeholder="Enter wallet address"
            value={address}
            onChange={(e) => {
              setAddress(e.currentTarget.value);
            }}
          />
          <Button onClick={handleCheckBalance} disabled={loading === true}>
            {loading === true ? <Loader size="sm" /> : "Check Balance"}
          </Button>
        </Group>

        {loading === false && data !== undefined && (
          <TokenBalance ethBalance={data.ethBalance} tokenBalances={data.tokenBalances} />
        )}
      </Stack>
    </Container>
  );
}
