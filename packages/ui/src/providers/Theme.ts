import eczarNormal from "@fontsource-variable/eczar/files/eczar-latin-wght-normal.woff2";
import ralewayNormal from "@fontsource-variable/raleway/files/raleway-latin-wght-normal.woff2";
import ralewayItalic from "@fontsource-variable/raleway/files/raleway-latin-wght-italic.woff2";
import { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  globalStyles: () => ({
    "": [
      {
        "@font-face": {
          fontFamily: "Eczar Variable",
          fontStyle: "normal",
          fontDisplay: "swap",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fontWeight: "400 800" as any,
          src: `url(${eczarNormal}) format('woff2-variations')`,
          unicodeRange:
            "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD",
        },
      },
      {
        "@font-face": {
          fontFamily: "Raleway Variable",
          fontStyle: "normal",
          fontDisplay: "swap",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fontWeight: "100 900" as any,
          src: `url(${ralewayNormal}) format('woff2-variations')`,
          unicodeRange:
            "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD",
        },
      },
      {
        "@font-face": {
          fontFamily: "Raleway Variable",
          fontStyle: "italic",
          fontDisplay: "swap",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fontWeight: "100 900" as any,
          src: `url(${ralewayItalic}) format('woff2-variations')`,
          unicodeRange:
            "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD",
        },
      },
    ],
  }),
  colors: {
    orange: ["#FFECE5", "#FFC9B8", "#FFA68A", "#FF835C", "#FF602E", "#FF3D00", "#CC3100", "#992500", "#661800", "#330C00"],
  },
  headings: {
    fontFamily: "'Eczar Variable', serif",
  },
  fontFamily: "'Raleway Variable', sans-serif",
  primaryColor: "orange",
};
