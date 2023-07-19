import { css, Global } from "@emotion/react";

export function GlobalStyles() {
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
