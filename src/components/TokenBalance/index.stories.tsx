import { TokenBalance } from ".";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "Components/TokenBalance",
  component: TokenBalance,
} as Meta<typeof TokenBalance>;

export const Template: StoryObj<typeof TokenBalance> = {
  render: function Wrapper() {
    return <TokenBalance />;
  },
};
