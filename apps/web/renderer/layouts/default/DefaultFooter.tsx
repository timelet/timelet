import { css } from "@emotion/react";
import { Anchor, Footer, LinkList, TimeletTheme } from "@timelet/ui";
import { FormattedMessage } from "react-intl";
import { CONFIGURATION } from "../../configuration";

const defaultFooterStyle = (theme: TimeletTheme) => css`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

export function DefaultFooter() {
  return (
    <Footer height={36} css={defaultFooterStyle}>
      <FormattedMessage id="layout.footer.version" values={{ version: CONFIGURATION.VERSION }} />
      <LinkList
        orientation="horizontal"
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
        ]}
      ></LinkList>
    </Footer>
  );
}
