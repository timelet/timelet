import { css } from "@emotion/react";
import { Footer } from "@timelet/ui";

const defaultFooterStyle = css`
  display: flex;
  align-items: center;
`;

export function DefaultFooter() {
  return (
    <Footer height={36} css={defaultFooterStyle}>
      Timelet
    </Footer>
  );
}
