import { AppShell, Brand, Button } from "@timelet/ui";
import { FormattedMessage } from "react-intl";
import { CONFIGURATION } from "../../configuration";
import { Link } from "../../components/Link";
import classes from "./DefaultHeader.module.css";

export function DefaultHeader() {
  return (
    <AppShell.Header className={classes.defaultHeader} py={6}>
      <Link href="/" data-underline="never">
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
    </AppShell.Header>
  );
}
