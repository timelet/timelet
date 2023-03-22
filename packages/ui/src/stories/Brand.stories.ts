import { Meta, StoryObj } from "@storybook/react";
import { Brand } from "../components/Brand";

const meta = {
  title: "Components/Brand",
  component: Brand,
  tags: ["autodocs"],
} satisfies Meta<typeof Brand>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
