import { Theme, css } from "@emotion/react";
import { Container, Brand, Header } from "@timelet/ui";
import { NavLink } from "react-router-dom";
import { CONFIGURATION } from "../../configuration";

const brandContainerStyles = (theme: Theme) => css`
  height: 100%;
  margin: 0;
  width: 300px;
  padding: 0;

  a {
    text-decoration: none;
    color: ${theme.black};
  }
`;

export default function DefaultHeader() {
  return (
    <Header height={64} p="xs">
      <Container css={brandContainerStyles}>
        <NavLink to={CONFIGURATION.PATHS.DASHBOARD}>
          <Brand />
        </NavLink>
      </Container>
    </Header>
  );
}
