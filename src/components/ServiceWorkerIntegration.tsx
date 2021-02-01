import { Button, Snackbar } from '@material-ui/core';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Workbox, messageSW } from 'workbox-window';

export default function ServiceWorkerIntegration() {
  const intl = useIntl();
  const workbox = new Workbox(import.meta.env.SNOWPACK_PUBLIC_SERVICE_WORKER);
  const [updateNotificationOpen, setUpdateNotificationOpen] = React.useState(false);
  let registration: ServiceWorkerRegistration | undefined;

  const showSkipWaitingPrompt = () => {
    setUpdateNotificationOpen(true);
  };

  const updateApplication = () => {
    workbox.addEventListener('controlling', () => {
      window.location.reload();
    });

    // skip waiting until all service workers are closed
    if (registration?.waiting) {
      messageSW(registration.waiting, { type: 'SKIP_WAITING' });
    }
  };

  // register service worker on first load if the browser supports it
  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
      workbox.addEventListener('waiting', showSkipWaitingPrompt);
      workbox.register().then((r) => {
        registration = r;
      });
    }
  }, []);

  const reloadButton = (
    <Button onClick={updateApplication}>
      <FormattedMessage id="action.reload" defaultMessage="Reload" description="Action to reload something" />
    </Button>
  );

  return (
    <Snackbar
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      message={intl.formatMessage({
        id: 'action.updateApplication',
        defaultMessage: 'Reload to update this application',
        description: 'Requests the user to update the application'
      })}
      action={reloadButton}
      open={updateNotificationOpen}
    />
  );
}
