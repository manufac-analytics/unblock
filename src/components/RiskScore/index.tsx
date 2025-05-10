import { Card, Stack, Text } from "@mantine/core";
import type { RiskScore } from "../../hooks/useRiskScore";
import type { JSX } from "react";

export function RiskScoreCard({ riskScore }: { riskScore: RiskScore }): JSX.Element {
  return (
    <Stack w={1500}>
      <Card shadow="sm" padding="lg" radius="md" withBorder w={400}>
        <Text fw={500} size="lg">
          🚨 Risk Score
        </Text>
        <Text mt="md">Risk Level: {riskScore.riskLevel}</Text>
        <Text mt="md">Transactions: {riskScore.transactionCount}</Text>
        <Text mt="md">Contract Interactions:{riskScore.interactions.length}</Text>
      </Card>
    </Stack>
  );
}
