import { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    layout: "fullscreen", // Ref: https://github.com/storybookjs/storybook/issues/12109#issuecomment-676489119
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export * from "./decorators";
export default preview;
