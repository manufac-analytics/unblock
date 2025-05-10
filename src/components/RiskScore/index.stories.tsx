import { RiskScoreCard } from ".";
import { AssetTransfersCategory } from "alchemy-sdk";
import type { RiskScore } from "../../hooks/useRiskScore";
import type { Meta, StoryObj } from "@storybook/react";

const DummyScore: RiskScore = {
  transactionCount: 15,
  interactions: [
    {
      uniqueId: "tx1",
      category: AssetTransfersCategory.EXTERNAL,
      blockNum: "0x12ab34",
      from: "0xabc123abc123abc123abc123abc123abc123abc1",
      to: "0xdef456def456def456def456def456def456def4",
      value: 1.25,
      erc721TokenId: null,
      erc1155Metadata: null,
      tokenId: null,
      asset: "ETH",
      hash: "0xhash1",
      rawContract: {
        value: "0x10f0cf064dd59200000",
        address: "0x0000000000000000000000000000000000000000",
        decimal: "0x12",
      },
    },
  ],
  riskLevel: "medium",
};

export default {
  title: "Components/RiskScoreCard",
  component: RiskScoreCard,
  args: {
    riskScore: DummyScore,
  },
} as Meta<typeof RiskScoreCard>;

export const Template: StoryObj<typeof RiskScoreCard> = {
  render: (args) => {
    return <RiskScoreCard {...args} />;
  },
};
