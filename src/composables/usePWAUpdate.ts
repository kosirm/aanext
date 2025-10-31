import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import type { Changelog } from 'src/types/changelog';

export function usePWAUpdate() {
  const updateAvailable = ref(false);
  const currentVersion = ref(import.meta.env.VITE_APP_VERSION || '0.0.1');
  const latestVersion = ref(import.meta.env.VITE_APP_VERSION || '0.0.1');
  const changelog = ref<Changelog | null>(null);
  const isCheckingForUpdate = ref(false);
  const updateCheckInterval = ref<number | null>(null);
  const swUpdateReady = ref(false); // Service worker has new version ready

  // Compare semantic versions
  const compareVersions = (v1: string, v2: string): number => {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);

    for (let i = 0; i < 3; i++) {
      const part1 = parts1[i] || 0;
      const part2 = parts2[i] || 0;
      if (part1 > part2) return 1;
      if (part1 < part2) return -1;
    }
    return 0;
  };

  // Listen for service worker update event
  const handleSWUpdate = () => {
    console.log('🎉 Received swUpdated event - new version is ready!');
    swUpdateReady.value = true;
    // Check version to update UI
    void checkForUpdate();
  };

  // Check for version update
  const checkForUpdate = async () => {
    isCheckingForUpdate.value = true;

    try {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🔍 PWA Update Check Started');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`📱 Current version (from build): ${currentVersion.value}`);
      console.log(`   VITE_APP_VERSION: ${import.meta.env.VITE_APP_VERSION}`);

      // Fetch latest version from server
      const versionResponse = await axios.get<{ version: string }>('/version.json', {
        params: { t: Date.now() },
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
      });

      const serverVersion = versionResponse.data.version;
      latestVersion.value = serverVersion;

      console.log(`🌐 Latest version (from server): ${serverVersion}`);

      // Load changelog
      const changelogResponse = await axios.get<Changelog>('/changelog.json', {
        params: { t: Date.now() },
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
      });
      changelog.value = changelogResponse.data;
      console.log(`📋 Changelog loaded: ${changelog.value.updates.length} entries`);

      // Check if update is available
      const comparison = compareVersions(serverVersion, currentVersion.value);
      const hasUpdate = comparison > 0;
      updateAvailable.value = hasUpdate;

      console.log(`🔢 Version comparison: ${serverVersion} vs ${currentVersion.value} = ${comparison}`);

      if (hasUpdate) {
        console.log(`✅ UPDATE AVAILABLE: ${currentVersion.value} → ${serverVersion}`);
        console.log(`   User should click "Pokreni ažuriranje" to reload`);
      } else if (comparison < 0) {
        console.log(`⚠️  Server version is OLDER than current version!`);
      } else {
        console.log(`✅ App is UP TO DATE: ${currentVersion.value}`);
      }

      // Check service worker status
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          console.log('🔄 Service Worker Status:');
          console.log(`   - Installing: ${registration.installing ? 'YES' : 'NO'}`);
          console.log(`   - Waiting: ${registration.waiting ? 'YES' : 'NO'}`);
          console.log(`   - Active: ${registration.active ? 'YES' : 'NO'}`);
          console.log('🔄 Triggering service worker update check...');
          await registration.update();
        } else {
          console.log('⚠️  No service worker registration found');
        }
      } else {
        console.log('⚠️  Service Worker API not available');
      }

      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    } catch (error) {
      console.error('❌ Error checking for update:', error);
    } finally {
      isCheckingForUpdate.value = false;
    }
  };

  // Install update - just reload the page
  // The service worker with skipWaiting and clientsClaim will handle the rest
  const installUpdate = () => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔄 INSTALLING UPDATE');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`   Current version: ${currentVersion.value}`);
    console.log(`   Target version: ${latestVersion.value}`);
    console.log('   Action: Reloading page to activate new service worker...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Just reload - the new service worker will take over automatically
    // because we have skipWaiting: true and clientsClaim: true
    window.location.reload();
  };

  // Initialize on mount
  onMounted(() => {
    console.log('🚀 PWA Update Manager: Initializing...');
    console.log(`   Current version: ${currentVersion.value}`);

    // Listen for service worker update events
    window.addEventListener('swUpdated', handleSWUpdate);

    // Initial check
    void checkForUpdate();

    // Check for updates every 60 seconds
    updateCheckInterval.value = window.setInterval(() => {
      console.log('⏰ Periodic update check...');
      void checkForUpdate();
    }, 60000);
  });

  // Cleanup on unmount
  onUnmounted(() => {
    if (updateCheckInterval.value !== null) {
      clearInterval(updateCheckInterval.value);
    }
    window.removeEventListener('swUpdated', handleSWUpdate);
  });

  return {
    updateAvailable,
    currentVersion,
    latestVersion,
    changelog,
    isCheckingForUpdate,
    checkForUpdate,
    installUpdate,
  };
}

