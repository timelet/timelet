import { css, Global, Theme } from "@emotion/react";

const globalStyles = (theme: Theme) => css`
  #page-view > div > header,
  main > section,
  #page-view > div > footer {
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

  #page-view > div > header,
  #page-view > div > footer {
    background-color: #ffffffdd;
    backdrop-filter: blur(2px) grayscale(1);
  }
`;

export function GlobalStyles() {
  return <Global styles={globalStyles} />;
}
