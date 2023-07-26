import "@fontsource-variable/eczar";
import "@fontsource-variable/raleway";
import { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  colors: {
    orange: ["#FFECE5", "#FFC9B8", "#FFA68A", "#FF835C", "#FF602E", "#FF3D00", "#CC3100", "#992500", "#661800", "#330C00"],
  },
  headings: {
    fontFamily: "'Eczar Variable', serif",
  },
  fontFamily: "'Raleway Variable', sans-serif",
  primaryColor: "orange",
};
