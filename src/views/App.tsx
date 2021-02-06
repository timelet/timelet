import React, { useEffect, useState } from 'react';
import 'date-fns';
import { IntlProvider } from 'react-intl';
import { StylesProvider, ThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { BrowserRouter } from 'react-router-dom';
import { DatabaseProvider } from '../domain/contexts/DatabaseContext';
import { TimeletDatabase, initializeDatabase } from '../database';
import enMessages from '../i18n/en.json';
import deMessages from '../i18n/de.json';
import DefaultLayout from '../layout/default/DefaultLayout';
import { theme } from '../style';
import Router from '../layout/default/Router';
import ServiceWorkerIntegration from '../components/ServiceWorkerIntegration';
import '../polyfills';

const messages = {
  de: deMessages,
  en: enMessages
};

export default function App() {
  const [database, setDatabase] = useState<TimeletDatabase>();
  const currentLocale = 'en';

  useEffect(() => {
    async function initialize() {
      const initializedDatabase = await initializeDatabase();
      setDatabase(initializedDatabase);
    }

    initialize();
  }, []);

  return (
    <DatabaseProvider database={database}>
      <IntlProvider locale={currentLocale} messages={messages[currentLocale]}>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <BrowserRouter>
                <ServiceWorkerIntegration />
                <DefaultLayout>
                  <Router />
                </DefaultLayout>
              </BrowserRouter>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </StylesProvider>
      </IntlProvider>
    </DatabaseProvider>
  );
}
