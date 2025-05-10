import { TokenBalance } from ".";
import type { Balances } from "../../hooks/useBalances";
import type { Meta, StoryObj } from "@storybook/react";

const DummyTokenBalances: Balances["tokenBalances"] = [
  {
    tokenBalance: {
      contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      tokenBalance: "1000000000",
      error: null,
    },
    metadata: {
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      logo: "",
    },
  },
  {
    tokenBalance: {
      contractAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      tokenBalance: "500000000000000000000",
      error: null,
    },
    metadata: {
      name: "Dai Stablecoin",
      symbol: "DAI",
      decimals: 18,
      logo: "",
    },
  },
];

export default {
  title: "Components/TokenBalance",
  component: TokenBalance,
  args: {
    ethBalance: "12.3456",
    tokenBalances: DummyTokenBalances,
  },
} as Meta<typeof TokenBalance>;

export const Template: StoryObj<typeof TokenBalance> = {
  render: (args) => {
    return <TokenBalance {...args} />;
  },
};
