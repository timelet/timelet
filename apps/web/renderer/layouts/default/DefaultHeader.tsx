import { css } from "@emotion/react";
import { Brand, Button, Header } from "@timelet/ui";

const DefaultHeaderStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    gap: 1rem;
  }
`;

export function DefaultHeader() {
  return (
    <Header css={DefaultHeaderStyles} height={64}>
      <Brand />
      <nav>
        <Button variant="subtle">Joho</Button>
        <Button variant="light">Joho</Button>
      </nav>
    </Header>
  );
}
