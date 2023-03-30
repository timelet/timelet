import { Anchor } from "@mantine/core";
import { Meta, StoryObj } from "@storybook/react";
import { LinkList } from "../components/LinkList";

const meta = {
  title: "Components/LinkList",
  component: LinkList,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LinkList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    links: [
      { id: "first-link", element: <a href="#">First Link</a> },
      { id: "second-link", element: <a href="#">Second Link</a> },
      { id: "third-link", element: <a href="#">Third Link</a> },
    ],
  },
};

export const Mantine: Story = {
  args: {
    links: [
      {
        id: "first-link",
        element: <Anchor href="#">First Link</Anchor>,
      },
      {
        id: "second-link",
        element: <Anchor href="#">Second Link</Anchor>,
      },
      {
        id: "third-link",
        element: <Anchor href="#">Third Link</Anchor>,
      },
    ],
  },
};
