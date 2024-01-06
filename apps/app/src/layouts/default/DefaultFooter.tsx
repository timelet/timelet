import { Anchor, AppShell, LinkList } from "@timelet/ui";
import { FormattedMessage } from "react-intl";
import { CONFIGURATION } from "../../configuration";
import classes from "./DefaultFooter.module.css";

export function DefaultFooter() {
  return (
    <AppShell.Footer p="xs" className={classes.defaultFooter}>
      <FormattedMessage id="layout.footer.version" values={{ version: CONFIGURATION.VERSION }} />
      <LinkList
        direction="row"
        links={[
          {
            id: "website",
            element: (
              <Anchor href={CONFIGURATION.PATHS.WEBSITE}>
                <FormattedMessage id="layout.footer.website" />
              </Anchor>
            ),
          },
          {
            id: "code",
            element: (
              <Anchor href={CONFIGURATION.PATHS.CODE}>
                <FormattedMessage id="layout.footer.code" />
              </Anchor>
            ),
          },
        ]}
      ></LinkList>
    </AppShell.Footer>
  );
}
