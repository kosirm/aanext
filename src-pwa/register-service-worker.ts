// Use native Service Worker API (same as old working site)
// This is more reliable than the register-service-worker library

if ('serviceWorker' in navigator) {
  // Listen for when the new service worker takes control
  // This happens after skipWaiting() is called
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('🎉 NOVA VERZIJA APLIKACIJE JE AKTIVIRANA (controllerchange event)');
  });

  navigator.serviceWorker
    .register(process.env.SERVICE_WORKER_FILE)
    .then((registration) => {
      console.log('✅ APLIKACIJA JE REGISTRIRANA');
      console.log('   Registration:', registration);
      console.log('   - installing:', registration.installing);
      console.log('   - waiting:', registration.waiting);
      console.log('   - active:', registration.active);
      console.log('   - controller:', navigator.serviceWorker.controller);

      // Set up update detection
      registration.onupdatefound = () => {
        console.log('🔔 onupdatefound event fired!');
        const installingWorker = registration.installing;
        console.log('   Installing worker:', installingWorker);

        if (installingWorker == null) {
          console.log('   ⚠️ Installing worker is null, returning');
          return;
        }

        console.log('🆕 POSTOJI NOVA VERZIJA APLIKACIJE');
        console.log('   Installing worker state:', installingWorker.state);

        installingWorker.onstatechange = () => {
          console.log('🔄 Installing worker state changed to:', installingWorker.state);

          if (installingWorker.state === 'installed') {
            console.log('   Has controller:', !!navigator.serviceWorker.controller);
            console.log('   Registration.waiting:', registration.waiting);

            if (navigator.serviceWorker.controller) {
              // There's an old service worker, tell the new one to skip waiting
              console.log('   📤 Sending SKIP_WAITING message to waiting service worker...');
              registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
              console.log('✅ NOVA VERZIJA APLIKACIJE JE INSTALIRANA');
              console.log('   Message sent, waiting for controllerchange event...');

              // Notify the app that an update is available
              window.dispatchEvent(new CustomEvent('swUpdated'));
            } else {
              console.log('   ℹ️ No controller, this is the first install');
            }
          } else if (installingWorker.state === 'activated') {
            console.log('🎉 Installing worker reached activated state (via onstatechange)');
          } else if (installingWorker.state === 'activating') {
            console.log('⏳ Installing worker is activating...');
          } else if (installingWorker.state === 'redundant') {
            console.log('❌ Installing worker became redundant');
          }
        };
      };

      // Also log if there's already a waiting worker
      if (registration.waiting) {
        console.log('⚠️ There is already a waiting service worker!');
        console.log('   Waiting worker:', registration.waiting);
      }
    })
    .catch((error) => {
      console.log('❌ REGISTRACIJA SERVICE WORKERA NIJE USPJELA:', error);
    });
}
