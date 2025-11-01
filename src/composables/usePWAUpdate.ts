import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import type { Changelog } from 'src/types/changelog';

// Global singleton state (shared across all instances)
const updateAvailable = ref(false);
const currentVersion = ref(import.meta.env.VITE_APP_VERSION || '0.0.1');
const latestVersion = ref(import.meta.env.VITE_APP_VERSION || '0.0.1');
const changelog = ref<Changelog | null>(null);
const isCheckingForUpdate = ref(false);
const swUpdateReady = ref(false); // Service worker has new version ready
let isInitialized = false; // Track if event listeners are already set up

export function usePWAUpdate() {

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

  // Listen for service worker update event (fired when SW is installed)
  const handleSWUpdate = () => {
    swUpdateReady.value = true;
    // Don't check yet - wait for activation
  };

  // Listen for service worker activation event (fired when SW is activated)
  const handleSWActivated = () => {
    // NOW check version and show update UI
    void checkForUpdate();
  };

  // Check for version update (called only when SW detects an update)
  const checkForUpdate = async () => {
    // If update already detected, don't check again
    if (updateAvailable.value) {
      return;
    }

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

      if (hasUpdate) {
        updateAvailable.value = true;
        console.log(`UPDATE AVAILABLE: ${currentVersion.value} → ${serverVersion}`);
      }
    } catch (error) {
      console.error('Error checking for update:', error);
    } finally {
      isCheckingForUpdate.value = false;
    }
  };

  // Install update - just reload the page
  // The new SW has already been activated (we got NOVA VERZIJA APLIKACIJE JE AKTIVIRANA)
  // So we can safely reload and the new SW will serve the new version
  const installUpdate = () => {
    window.location.reload();
  };

  // Initialize on mount (only once globally)
  onMounted(() => {
    if (!isInitialized) {
      isInitialized = true;
      // Listen for service worker update events
      // The SW will automatically detect updates and fire these events
      window.addEventListener('swUpdated', handleSWUpdate);
      window.addEventListener('swActivated', handleSWActivated);
    }
  });

  // Note: We don't remove event listeners on unmount because they're global
  // and should persist for the lifetime of the app
  onUnmounted(() => {
    // Keep event listeners active
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

