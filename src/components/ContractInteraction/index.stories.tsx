import { AssetTransfersCategory, AssetTransfersResult } from "alchemy-sdk";
import { ContractInteraction } from ".";
import type { Meta, StoryObj } from "@storybook/react";

const DummyInteraction: AssetTransfersResult[] = [
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
];
export default {
  title: "Components/ContractInteraction",
  component: ContractInteraction,
  args: {
    interaction: DummyInteraction,
  },
} as Meta<typeof ContractInteraction>;

export const Template: StoryObj<typeof ContractInteraction> = {
  render: (args) => {
    return <ContractInteraction {...args} />;
  },
};
