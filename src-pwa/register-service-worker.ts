import { register } from 'register-service-worker';

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

// Create a custom event to notify the app about updates
const notifyUpdateAvailable = () => {
  window.dispatchEvent(new CustomEvent('swUpdated'));
};

// Listen for when the new service worker takes control
// This happens after skipWaiting() is called and the new SW activates
let refreshing = false;
navigator.serviceWorker.addEventListener('controllerchange', () => {
  if (refreshing) return;
  console.log('NOVA VERZIJA APLIKACIJE JE AKTIVIRANA');
  refreshing = true;
  window.location.reload();
});

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  // registrationOptions: { scope: './' },

  ready () {
    // Service worker is active and ready
  },

  registered (registration) {
    console.log('APLIKACIJA JE REGISTRIRANA');

    // Check if there's already a waiting service worker
    if (registration.waiting) {
      console.log('POSTOJI NOVA VERZIJA APLIKACIJE (already waiting)');
      // Tell it to skip waiting
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      console.log('NOVA VERZIJA APLIKACIJE JE INSTALIRANA');
      // Notify the app
      notifyUpdateAvailable();
    }

    // Set up update detection for future updates
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
            notifyUpdateAvailable();
          }
        } else if (installingWorker.state === 'activated') {
          console.log('NOVA VERZIJA APLIKACIJE JE AKTIVIRANA');
        }
      };
    };
  },

  cached () {
    // Content has been cached for offline use
  },

  updatefound () {
    // New service worker is being installed (handled in registered callback)
  },

  updated () {
    // New service worker is installed (handled in registered callback)
  },

  offline () {
    console.log('📴 Offline - No internet connection.');
  },

  error (err) {
    console.error('❌ Service Worker Error:', err);
  },
});
