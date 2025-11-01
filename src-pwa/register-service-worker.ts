// Use native Service Worker API (EXACTLY like old working site)
// This is more reliable than the register-service-worker library

if ('serviceWorker' in navigator) {
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
          } else if (installingWorker.state === 'activated') {
            console.log('NOVA VERZIJA APLIKACIJE JE AKTIVIRANA');

            // Notify the app that the new SW is activated and ready
            window.dispatchEvent(new CustomEvent('swActivated'));
          }
        };
      };
    })
    .catch((error) => {
      console.log('REGISTRACIJA SERVICE WORKERA NIJE USPJELA:', error);
    });
}
