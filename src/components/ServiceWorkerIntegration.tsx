import { Button, Snackbar } from '@material-ui/core';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Workbox, messageSW } from 'workbox-window';

export default function ServiceWorkerIntegration() {
  const intl = useIntl();
  const workbox = new Workbox(import.meta.env.SNOWPACK_PUBLIC_SERVICE_WORKER);
  const [updateNotificationOpen, setUpdateNotificationOpen] = React.useState(false);
  const [registration, setRegistration] = React.useState<ServiceWorkerRegistration>();

  const showSkipWaitingPrompt = () => {
    setUpdateNotificationOpen(true);
  };

  const updateApplication = (currentRegistration?: ServiceWorkerRegistration) => () => {
    // skip waiting until all service workers are closed to force update
    if (currentRegistration && currentRegistration.waiting) {
      messageSW(currentRegistration.waiting, { type: 'SKIP_WAITING' });
      setUpdateNotificationOpen(false);
      window.location.reload();
    }
  };

  // register service worker on first load if the browser supports it
  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Open update prompt because there is an update waiting
      workbox.addEventListener('waiting', showSkipWaitingPrompt);
      workbox.register().then((r) => {
        setRegistration(r);
      });
    }
  }, []);

  const reloadButton = (
    <Button onClick={updateApplication(registration)} color="primary">
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
