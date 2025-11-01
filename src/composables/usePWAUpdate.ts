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
    swUpdateReady.value = true;
    // Check version to update UI
    void checkForUpdate();
  };

  // Check for version update
  const checkForUpdate = async () => {
    isCheckingForUpdate.value = true;

    try {
      // Fetch latest version from server
      const versionResponse = await axios.get<{ version: string }>('/version.json', {
        params: { t: Date.now() },
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
      });

      const serverVersion = versionResponse.data.version;
      latestVersion.value = serverVersion;

      // Load changelog
      const changelogResponse = await axios.get<Changelog>('/changelog.json', {
        params: { t: Date.now() },
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
      });
      changelog.value = changelogResponse.data;

      // Check if update is available
      const comparison = compareVersions(serverVersion, currentVersion.value);
      const hasUpdate = comparison > 0;
      updateAvailable.value = hasUpdate;

      if (hasUpdate) {
        console.log(`UPDATE AVAILABLE: ${currentVersion.value} → ${serverVersion}`);
      }

      // Trigger service worker update check
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          await registration.update();
        }
      }
    } catch (error) {
      console.error('Error checking for update:', error);
    } finally {
      isCheckingForUpdate.value = false;
    }
  };

  // Install update - the controllerchange event will handle the reload
  // We just need to trigger it by reloading once
  const installUpdate = () => {
    // The new service worker is already activated (via SKIP_WAITING)
    // Just reload - the controllerchange event will fire and reload again if needed
    window.location.reload();
  };

  // Initialize on mount
  onMounted(() => {
    // Listen for service worker update events
    window.addEventListener('swUpdated', handleSWUpdate);

    // Initial check
    void checkForUpdate();

    // Check for updates every 60 seconds
    updateCheckInterval.value = window.setInterval(() => {
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

