import type { Meta, StoryObj } from "@storybook/react";
import { TokenBalance } from ".";

export default {
  title: "Components/TokenBalance",
  component: TokenBalance,
} as Meta<typeof TokenBalance>;

export const Template: StoryObj<typeof TokenBalance> = {
  render: function Wrapper() {
    return <TokenBalance />;
  },
};
