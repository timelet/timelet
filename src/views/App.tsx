import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import styled from '@emotion/styled';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { DatabaseProvider } from '../contexts/DatabaseContext';
import type { TimeletDatabase } from '../database';
import { initializeDatabase } from '../database';
import Entries from './Entries';
import enMessages from '../i18n/en.json';

const Title = styled(Typography)`
  margin-left: 1rem;
  flex-grow: 1;
`;

export default function App() {
  const [database, setDatabase] = useState<TimeletDatabase>();

  useEffect(() => {
    async function initialize() {
      const initializedDatabase = await initializeDatabase();
      setDatabase(initializedDatabase);
    }

    initialize();
  }, []);

  return (
    <DatabaseProvider database={database}>
      <IntlProvider locale="en" messages={enMessages}>
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
        <Entries />
      </IntlProvider>
    </DatabaseProvider>
  );
}
