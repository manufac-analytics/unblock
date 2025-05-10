import { ContractInteraction } from ".";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "Components/ContractInteraction",
  component: ContractInteraction,
} as Meta<typeof ContractInteraction>;

export const Template: StoryObj<typeof ContractInteraction> = {
  render: function Wrapper() {
    return <ContractInteraction />;
  },
};
