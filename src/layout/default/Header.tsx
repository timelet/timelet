import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';

const Title = styled(Typography)`
  margin-left: 0.5rem;
  flex-grow: 1;
`;

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Title variant="h6">
          <FormattedMessage id="app.title" defaultMessage="Timelet" description="Application name" />
        </Title>
      </Toolbar>
    </AppBar>
  );
}
