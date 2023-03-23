import { css, Global } from "@emotion/react";
import { useMantineTheme } from "@timelet/ui";

export function GlobalStyles() {
  const theme = useMantineTheme();
  return (
    <Global
      styles={css`
        header,
        section,
        footer {
          padding-right: 20%;
          padding-left: 20%;
        }
      `}
    />
  );
}
