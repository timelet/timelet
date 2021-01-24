import React, { useEffect, useState } from 'react';
import 'date-fns';
import { IntlProvider } from 'react-intl';
import { StylesProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DatabaseProvider } from '../contexts/DatabaseContext';
import { TimeletDatabase, initializeDatabase } from '../database';
import Entries from './Entries';
import enMessages from '../i18n/en.json';
import DefaultLayout from '../layout/default/DefaultLayout';

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
        <StylesProvider injectFirst>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DefaultLayout>
              <Entries />
            </DefaultLayout>
          </MuiPickersUtilsProvider>
        </StylesProvider>
      </IntlProvider>
    </DatabaseProvider>
  );
}
