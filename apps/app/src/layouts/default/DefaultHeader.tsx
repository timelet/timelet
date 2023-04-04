import { css } from "@emotion/react";
import { Container, Brand, Header } from "@timelet/ui";

const brandContainerStyles = css`
  height: 100%;
  margin: 0;
  width: 300px;
  padding: 0;
`;

export default function DefaultHeader() {
  return (
    <Header height={64} p="xs">
      <Container css={brandContainerStyles}>
        <Brand />
      </Container>
    </Header>
  );
}
