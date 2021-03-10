import React, { useEffect, useState } from 'react';
import 'date-fns';
import { IntlProvider } from 'react-intl';
import { StylesProvider, ThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { BrowserRouter } from 'react-router-dom';
import { getUserLocale } from 'get-user-locale';
import { DatabaseProvider } from '../contexts/DatabaseContext';
import { TimeletDatabase, initializeDatabase } from '../database';
import enMessages from '../i18n/en.json';
import deMessages from '../i18n/de.json';
import DefaultLayout from '../layout/default/DefaultLayout';
import { theme } from '../style';
import Router from '../layout/default/Router';
import ServiceWorkerIntegration from '../components/ServiceWorkerIntegration';
import '../polyfills';
import { createSubscriptionEffect } from '../utils/rxdb';
import { SettingsDocumentType, SETTINGS_DOCUMENT_ID } from '../domain/documents/settingsDocument';
import { defaultUserInterfaceLanguage, IntlMessages, Language, userInterfaceLanguages } from '../domain/models/languageModel';
import { matchLanguage } from '../utils/i18n';
import Status from './Status';

const messages: IntlMessages = {
  de: deMessages,
  en: enMessages
};

export default function App() {
  const [database, setDatabase] = useState<TimeletDatabase>();
  const [userInterfaceLanguage, setUserInterfaceLanguage] = useState<Language>(matchLanguage(getUserLocale(), userInterfaceLanguages));
  const getLanguage = React.useCallback(
    () =>
      createSubscriptionEffect(async () => {
        const settings = await database?.getLocal<SettingsDocumentType>(SETTINGS_DOCUMENT_ID);
        return database?.profiles.findOne({ selector: { profileId: settings?.profile } }).$.subscribe((doc) => {
          if (doc?.userInterfaceLanguage) {
            setUserInterfaceLanguage(doc.userInterfaceLanguage as Language);
          } else {
            setUserInterfaceLanguage(matchLanguage(getUserLocale(), userInterfaceLanguages));
          }
        });
      }),
    [database]
  );

  useEffect(() => {
    async function initialize() {
      const initializedDatabase = await initializeDatabase();
      setDatabase(initializedDatabase);
    }

    initialize();
  }, []);

  useEffect(() => getLanguage(), [getLanguage]);

  return (
    <DatabaseProvider database={database}>
      <IntlProvider locale={userInterfaceLanguage} messages={messages[userInterfaceLanguage]} defaultLocale={defaultUserInterfaceLanguage}>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <BrowserRouter>
                <ServiceWorkerIntegration />
                <DefaultLayout status={<Status />}>
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
