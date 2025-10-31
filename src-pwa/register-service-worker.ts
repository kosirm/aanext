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
    console.log('🔄 Service Worker: Update Found - New content is downloading...');
    console.log('   Registration:', registration);
  },

  updated (registration) {
    console.log('🎉 Service Worker: Updated - New content is available!');
    console.log('   Registration:', registration);
    console.log('   ⚠️  Page needs to reload to activate new version.');

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
