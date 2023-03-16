import { Meta, StoryObj } from "@storybook/react";
import { Logo } from "../components/Logo";

const meta = {
  title: "Components/Logo",
  component: Logo,
  tags: ["autodocs"],
  argTypes: { displayTime: { control: { type: "date" } } },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
