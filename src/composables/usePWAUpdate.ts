import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { Changelog } from 'src/types/changelog';

export function usePWAUpdate() {
  const updateAvailable = ref(false);
  const currentVersion = ref('0.0.1');
  const latestVersion = ref('0.0.1');
  const changelog = ref<Changelog | null>(null);
  const isCheckingForUpdate = ref(false);
  const swRegistration = ref<ServiceWorkerRegistration | null>(null);

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

  // Listen for service worker updates
  const setupServiceWorkerListener = async () => {
    const registration = await getServiceWorkerRegistration();

    if (registration) {
      // Check for updates every 60 seconds
      setInterval(() => {
        void registration.update();
      }, 60000);

      // Listen for new service worker waiting
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker is ready
              updateAvailable.value = true;
            }
          });
        }
      });
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

  // Get current version from package.json (embedded at build time)
  const getCurrentVersion = () => {
    // This will be replaced at build time with actual version
    return import.meta.env.VITE_APP_VERSION || '0.0.1';
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

  // Check if update is available
  const checkForUpdate = async () => {
    isCheckingForUpdate.value = true;

    try {
      // Check for service worker updates
      const registration = await getServiceWorkerRegistration();
      if (registration) {
        await registration.update();
      }

      // Check for version updates in changelog
      const changelogData = await loadChangelog();

      if (changelogData) {
        const current = getCurrentVersion();
        const latest = changelogData.currentVersion;

        currentVersion.value = current;
        latestVersion.value = latest;

        // Update available if latest > current OR if service worker has update waiting
        const hasVersionUpdate = compareVersions(latest, current) > 0;
        const hasSwUpdate = registration?.waiting !== null && registration?.waiting !== undefined;
        updateAvailable.value = hasVersionUpdate || hasSwUpdate;
      }
    } catch (error) {
      console.error('Error checking for update:', error);
    } finally {
      isCheckingForUpdate.value = false;
    }
  };

  // Install update and reload
  const installUpdate = async () => {
    try {
      const registration = await getServiceWorkerRegistration();

      if (registration?.waiting) {
        // Tell the waiting service worker to activate
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });

        // Listen for the controlling service worker change
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          window.location.reload();
        });
      } else {
        // No waiting service worker, just reload
        window.location.reload();
      }
    } catch (error) {
      console.error('Error installing update:', error);
      // Fallback: force reload
      window.location.reload();
    }
  };

  // Initialize on mount
  onMounted(() => {
    void setupServiceWorkerListener();
    void checkForUpdate();
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

