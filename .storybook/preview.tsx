import type { Preview } from "@storybook/nextjs";

import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "ShopLite dark",
      values: [
        {
          name: "ShopLite dark",
          value: "#050816",
        },
        {
          name: "Surface",
          value: "#0b1024",
        },
      ],
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-aetheric p-6 text-foreground">
        <Story />
      </div>
    ),
  ],
};

export default preview;