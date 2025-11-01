// Use native Service Worker API (EXACTLY like old working site)
// This is more reliable than the register-service-worker library

if ('serviceWorker' in navigator) {
  // Listen for when the new service worker takes control (after activation)
  // This is the reliable way to detect activation
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('NOVA VERZIJA APLIKACIJE JE AKTIVIRANA');
  });

  navigator.serviceWorker
    .register(process.env.SERVICE_WORKER_FILE)
    .then((registration) => {
      console.log('APLIKACIJA JE REGISTRIRANA');

      // Set up update detection
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }

        console.log('POSTOJI NOVA VERZIJA APLIKACIJE');

        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // There's an old service worker, tell the new one to skip waiting
              registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
              console.log('NOVA VERZIJA APLIKACIJE JE INSTALIRANA');

              // Notify the app that an update is available
              window.dispatchEvent(new CustomEvent('swUpdated'));
            }
          }
        };
      };
    })
    .catch((error) => {
      console.log('REGISTRACIJA SERVICE WORKERA NIJE USPJELA:', error);
    });
}
