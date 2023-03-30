import React from "react";
import type { Preview } from "@storybook/react";
import { TimeletUIProvider } from "../src/providers/TimeletUIProvider";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      exclude: ["className"],
    },
  },
  decorators: [
    (Story) => (
      <TimeletUIProvider withGlobalStyles withNormalizeCSS>
        <Story />
      </TimeletUIProvider>
    ),
  ],
};

export default preview;
