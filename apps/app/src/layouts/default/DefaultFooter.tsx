import { Anchor, Footer, LinkList } from "@timelet/ui";
import { FormattedMessage } from "react-intl";
import { CONFIGURATION } from "../../configuration";
import { css } from "@emotion/react";

const defaultFooterStyle = css`
  display: flex;
  align-items: center;
`;

export function DefaultFooter() {
  return (
    <Footer height={48} p="xs" css={defaultFooterStyle}>
      <FormattedMessage id="layout.footer.version" values={{ version: CONFIGURATION.VERSION }} />
      <LinkList
        links={[
          {
            id: "website",
            element: (
              <Anchor href={CONFIGURATION.PATHS.WEBSITE}>
                <FormattedMessage id="layout.footer.website" />
              </Anchor>
            ),
          },
        ]}
      ></LinkList>
    </Footer>
  );
}
