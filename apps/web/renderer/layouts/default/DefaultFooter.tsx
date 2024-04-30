import { Anchor, AppShell, LinkList } from "@timelet/ui";
import { FormattedMessage } from "react-intl";
import { CONFIGURATION } from "../../configuration";
import classes from "./DefaultFooter.module.css";
import { LocaleSelector } from "../../components/LocaleSelector";
import { usePageContext } from "../../contexts/usePageContext";

export function DefaultFooter() {
  const context = usePageContext();

  return (
    <AppShell.Footer className={classes.defaultFooter}>
      <FormattedMessage id="layout.footer.version" values={{ version: CONFIGURATION.VERSION }} />
      <LinkList
        direction="row"
        links={[
          {
            id: "website",
            element: (
              <Anchor href={CONFIGURATION.PATHS.APP}>
                <FormattedMessage id="layout.footer.app" />
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
          {
            id: "localeSelector",
            element: <LocaleSelector availableLocales={[]} />,
          },
        ]}
      />
    </AppShell.Footer>
  );
}
