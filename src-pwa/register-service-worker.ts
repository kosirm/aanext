import { register } from 'register-service-worker';

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

// Create a custom event to notify the app about updates
const notifyUpdateAvailable = () => {
  window.dispatchEvent(new CustomEvent('swUpdated'));
};

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  // registrationOptions: { scope: './' },

  ready (registration) {
    console.log('✅ Service Worker: Ready - Service worker is active.');
    console.log('   Registration:', registration);
  },

  registered (registration) {
    console.log('✅ Service Worker: Registered - Service worker has been registered.');
    console.log('   Registration:', registration);

    // Set up update detection like in the old site
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      if (installingWorker == null) {
        return;
      }

      console.log('🔄 Service Worker: Update Found - New service worker is installing...');

      installingWorker.onstatechange = () => {
        console.log(`   Service Worker state changed to: ${installingWorker.state}`);

        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // There's an old service worker, tell the new one to skip waiting
            console.log('   Telling new service worker to skip waiting...');
            registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
            console.log('🎉 Service Worker: New version installed and activated!');

            // Notify the app that an update is available
            notifyUpdateAvailable();
          } else {
            // First install
            console.log('✅ Service Worker: Content cached for offline use (first install).');
          }
        } else if (installingWorker.state === 'activated') {
          console.log('✅ Service Worker: Activated - New version is now active.');
        }
      };
    };
  },

  cached (registration) {
    console.log('✅ Service Worker: Cached - Content has been cached for offline use.');
    console.log('   Registration:', registration);
  },

  updatefound (registration) {
    console.log('🔄 Service Worker: Update Found (legacy callback)');
    console.log('   Registration:', registration);
  },

  updated (registration) {
    console.log('🎉 Service Worker: Updated (legacy callback)');
    console.log('   Registration:', registration);
  },

  offline () {
    console.log('📴 Service Worker: Offline - No internet connection found. App is running in offline mode.');
  },

  error (err) {
    console.error('❌ Service Worker: Error during service worker registration:', err);
  },
});
