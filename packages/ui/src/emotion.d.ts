import "@emotion/react";
import type { MantineTheme } from "@mantine/core";

export interface TimeletTheme extends MantineTheme {}

declare module "@emotion/react" {
  export interface Theme extends TimeletTheme {}
}
