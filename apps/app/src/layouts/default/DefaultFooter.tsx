import { Anchor, Footer, LinkList } from "@timelet/ui";
import { FormattedMessage } from "react-intl";
import { CONFIGURATION } from "../../configuration";
import { Theme, css } from "@emotion/react";

const defaultFooterStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

export function DefaultFooter() {
  return (
    <Footer height={48} p="xs" css={defaultFooterStyle}>
      <FormattedMessage id="layout.footer.version" values={{ version: CONFIGURATION.VERSION }} />
      <LinkList
        orientation="horizontal"
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
    </Footer>
  );
}
