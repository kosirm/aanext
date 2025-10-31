import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import type { Changelog } from 'src/types/changelog';

export function usePWAUpdate() {
  const updateAvailable = ref(false);
  const currentVersion = ref('0.0.1');
  const latestVersion = ref('0.0.1');
  const changelog = ref<Changelog | null>(null);
  const isCheckingForUpdate = ref(false);
  const swRegistration = ref<ServiceWorkerRegistration | null>(null);
  const updateCheckInterval = ref<number | null>(null);

  // Get service worker registration
  const getServiceWorkerRegistration = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        swRegistration.value = registration || null;
        return registration;
      } catch (error) {
        console.error('Failed to get service worker registration:', error);
        return null;
      }
    }
    return null;
  };

  // Listen for service worker lifecycle events
  const setupServiceWorkerListener = async () => {
    const registration = await getServiceWorkerRegistration();

    if (registration) {
      console.log('Service Worker: Registration found');

      // Check for updates every 60 seconds
      updateCheckInterval.value = window.setInterval(() => {
        console.log('Service Worker: Checking for updates...');
        void registration.update();
      }, 60000);

      // Listen for updatefound event
      registration.addEventListener('updatefound', () => {
        console.log('Service Worker: Update found - downloading...');
        const newWorker = registration.installing;

        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            console.log(`Service Worker: State changed to ${newWorker.state}`);

            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('Service Worker: New version installed');
              // Don't show update yet - wait for activation
            }

            if (newWorker.state === 'activated') {
              console.log('Service Worker: New version activated - update ready!');
              // Now the new version is fully ready
              void loadVersionInfo();
            }
          });
        }
      });

      // Listen for controller change (when new SW takes over)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('Service Worker: Controller changed - new version is active');
        void loadVersionInfo();
      });

      // Initial check
      void registration.update();
    }
  };

  // Load version info and check if update is ready
  const loadVersionInfo = async () => {
    try {
      const current = await getCurrentVersion();
      const changelogData = await loadChangelog();

      if (changelogData) {
        currentVersion.value = current;
        latestVersion.value = changelogData.currentVersion;

        // Update is available if versions don't match
        const hasUpdate = compareVersions(changelogData.currentVersion, current) > 0;
        updateAvailable.value = hasUpdate;

        if (hasUpdate) {
          console.log(`Update available: ${current} → ${changelogData.currentVersion}`);
        } else {
          console.log(`App is up to date: ${current}`);
        }
      }
    } catch (error) {
      console.error('Failed to load version info:', error);
    }
  };

  // Load changelog from public folder
  const loadChangelog = async () => {
    try {
      const response = await axios.get<Changelog>('/changelog.json', {
        // Add timestamp to prevent caching
        params: { t: Date.now() }
      });
      changelog.value = response.data;
      latestVersion.value = response.data.currentVersion;
      return response.data;
    } catch (error) {
      console.error('Failed to load changelog:', error);
      return null;
    }
  };

  // Get current version from changelog.json (always fresh from server)
  const getCurrentVersion = async () => {
    try {
      // Fetch version.json with cache busting to get the actual deployed version
      const response = await axios.get<{ version: string }>('/version.json', {
        params: { t: Date.now() },
        headers: { 'Cache-Control': 'no-cache' }
      });
      return response.data.version;
    } catch {
      // Fallback to build-time version
      return import.meta.env.VITE_APP_VERSION || '0.0.1';
    }
  };

  // Compare versions (semantic versioning)
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

  // Manually check for updates
  const checkForUpdate = async () => {
    isCheckingForUpdate.value = true;

    try {
      console.log('Manual update check triggered');

      // Trigger service worker update check
      const registration = await getServiceWorkerRegistration();
      if (registration) {
        await registration.update();
      }

      // Load current version info
      await loadVersionInfo();
    } catch (error) {
      console.error('Error checking for update:', error);
    } finally {
      isCheckingForUpdate.value = false;
    }
  };

  // Install update - just reload the page (new SW is already activated)
  const installUpdate = () => {
    console.log('Installing update - reloading page...');

    // Since skipWaiting is true, the new service worker is already active
    // Just reload to get the new version
    window.location.reload();
  };

  // Initialize on mount
  onMounted(() => {
    console.log('PWA Update: Initializing...');
    void setupServiceWorkerListener();
    void loadVersionInfo();
  });

  // Cleanup on unmount
  onUnmounted(() => {
    if (updateCheckInterval.value !== null) {
      clearInterval(updateCheckInterval.value);
    }
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

