import { HistoricalTransfer } from ".";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "Components/HistoricalTransfer",
  component: HistoricalTransfer,
} as Meta<typeof HistoricalTransfer>;

export const Template: StoryObj<typeof HistoricalTransfer> = {
  render: function Wrapper() {
    return <HistoricalTransfer />;
  },
};
