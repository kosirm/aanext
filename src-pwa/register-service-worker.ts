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
  },

  cached (registration) {
    console.log('✅ Service Worker: Cached - Content has been cached for offline use.');
    console.log('   Registration:', registration);
  },

  updatefound (registration) {
    console.log('🔄 Service Worker: Update Found - New service worker is installing...');
    console.log('   Registration:', registration);
  },

  updated (registration) {
    console.log('🎉 Service Worker: Updated - New service worker is installed and waiting!');
    console.log('   Registration:', registration);

    // Tell the new service worker to skip waiting
    if (registration.waiting) {
      console.log('   Telling new service worker to skip waiting...');
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      console.log('   SKIP_WAITING message sent!');
    } else {
      console.log('   ⚠️ No waiting service worker found!');
    }

    // Notify the app that an update is available
    notifyUpdateAvailable();
  },

  offline () {
    console.log('📴 Service Worker: Offline - No internet connection found. App is running in offline mode.');
  },

  error (err) {
    console.error('❌ Service Worker: Error during service worker registration:', err);
  },
});
