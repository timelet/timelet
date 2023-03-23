import { css, Global } from "@emotion/react";

export function GlobalStyles() {
  return (
    <Global
      styles={css`
        header,
        main {
          padding: 10px 10%;
        }
      `}
    />
  );
}
