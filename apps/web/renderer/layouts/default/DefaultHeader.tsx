import { css } from "@emotion/react";
import { Brand, Button, Header } from "@timelet/ui";
import { FormattedMessage } from "react-intl";
import { CONFIGURATION } from "../../configuration";
import { Link } from "../../components/Link";

const DefaultHeaderStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffffdd;
  backdrop-filter: blur(2px);

  nav {
    display: flex;
    gap: 1rem;
  }

  & > a {
    height: 100%;
    text-decoration: none;
    color: inherit;
  }
`;

export function DefaultHeader() {
  return (
    <Header css={DefaultHeaderStyles} py={6} height={64}>
      <Link href="/">
        <Brand />
      </Link>
      <nav>
        <Button variant="subtle" component={Link} href={CONFIGURATION.PATHS.DOCS}>
          <FormattedMessage id="pages.docs" />
        </Button>
        <Button variant="light" component={Link} href={CONFIGURATION.PATHS.APP}>
          <FormattedMessage id="actions.recordTime" />
        </Button>
      </nav>
    </Header>
  );
}
