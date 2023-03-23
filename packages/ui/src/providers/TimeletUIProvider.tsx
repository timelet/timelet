import { MantineProvider, MantineProviderProps } from "@mantine/core";
import { theme } from "./Theme";

type TimeletUIProviderProps = MantineProviderProps;

export function TimeletUIProvider(args: TimeletUIProviderProps) {
  return <MantineProvider {...args} theme={theme} />;
}
