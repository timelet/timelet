import React from 'react';

export default function ServiceWorkerIntegration() {
  // register service worker on first load
  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(import.meta.env.SNOWPACK_PUBLIC_SERVICE_WORKER);
    }
  }, []);

  return null;
}
