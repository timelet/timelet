import { css, Global, Theme } from "@emotion/react";

const globalStyles = (theme: Theme) => css`
  header,
  section,
  footer {
    --horizontal-padding: 20%;

    @media (max-width: ${theme.breakpoints.xl}) {
      --horizontal-padding: 15%;
    }

    @media (max-width: ${theme.breakpoints.lg}) {
      --horizontal-padding: 10%;
    }

    @media (max-width: ${theme.breakpoints.xs}) {
      --horizontal-padding: 1rem;
    }

    padding-right: var(--horizontal-padding);
    padding-left: var(--horizontal-padding);
  }

  .start {
  }
`;

export function GlobalStyles() {
  return <Global styles={globalStyles} />;
}
