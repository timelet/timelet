import { MantineProvider, MantineProviderProps } from "@mantine/core";
import { theme } from "./Theme";
import "@mantine/core/styles.css";

type TimeletUIProviderProps = MantineProviderProps;

export function TimeletUIProvider(args: TimeletUIProviderProps) {
  return <MantineProvider {...args} theme={theme} />;
}
