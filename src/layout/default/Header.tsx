import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';
import MenuDrawer from './MenuDrawer';

const Title = styled(Typography)`
  margin-left: 0.5rem;
  flex-grow: 1;
`;

export default function Header() {
  const titleElement = (
    <Title variant="h6">
      <FormattedMessage id="app.title" defaultMessage="Timelet" description="Application name" />
    </Title>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <MenuDrawer title={titleElement} />
        {titleElement}
      </Toolbar>
    </AppBar>
  );
}
