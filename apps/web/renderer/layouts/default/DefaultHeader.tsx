import { css } from "@emotion/react";
import { Brand, Button, Header } from "@timelet/ui";
import { FormattedMessage } from "react-intl";
import { CONFIGURATION } from "../../configuration";
import { Link } from "../../Link";

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
    <Header css={DefaultHeaderStyles} py={6} height={64}>
      <Brand />
      <nav>
        <Button variant="subtle">Docs</Button>
        <Button variant="light" component={Link} href={CONFIGURATION.PATHS.APP}>
          <FormattedMessage id="openApp" />
        </Button>
      </nav>
    </Header>
  );
}
