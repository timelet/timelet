import React from 'react';
import { AppBar, Link, Toolbar, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';
import MenuDrawer from './MenuDrawer';
import { RoutePaths } from './Router';

const Title = styled(Typography)`
  margin-left: 0.5rem;
  flex-grow: 1;
`;

const CustomToolbar = styled(Toolbar)`
  & > h6 > a {
    color: inherit;
  }
`;

export default function Header() {
  const titleElement = (
    <Title variant="h6">
      <Link component={RouterLink} to={RoutePaths.DASHBOARD}>
        <FormattedMessage id="app.title" defaultMessage="Timelet" />
      </Link>
    </Title>
  );

  return (
    <AppBar position="static">
      <CustomToolbar>
        <MenuDrawer title={titleElement} />
        {titleElement}
      </CustomToolbar>
    </AppBar>
  );
}
