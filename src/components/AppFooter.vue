<template>
  <q-footer class="app-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4>AA Hrvatska</h4>
        <p>Anonimni Alkoholičari - Hrvatska</p>
      </div>

      <div class="footer-section">
        <h5>Brzi linkovi</h5>
        <ul>
          <li><router-link to="/">Početna</router-link></li>
          <li><router-link to="/informacije">Informacije</router-link></li>
          <li><router-link to="/literatura">Literatura</router-link></li>
          <li><router-link to="/o-nama">O nama</router-link></li>
        </ul>
      </div>

      <div class="footer-section">
        <h5>Dodatno</h5>
        <ul>
          <li><router-link to="/privatnost">Privatnost</router-link></li>
          <li><router-link to="/help">Pomoć</router-link></li>
          <li><a href="#" @click.prevent="resetServiceWorker">Resetiraj aplikaciju</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h5>Kontakt</h5>
        <p>
          <a href="tel:+385123456789">+385 1 2345 6789</a>
        </p>
        <p>
          <a href="mailto:info@aahrvatska.org">info@aahrvatska.org</a>
        </p>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2024 AA Hrvatska. Sva prava zadržana.</p>
      <p v-if="!uiStore.isOnline" class="offline-indicator">
        <q-icon name="cloud_off" size="xs" />
        Offline mode
      </p>
    </div>
  </q-footer>
</template>

<script setup lang="ts">
import { useUiStore } from 'src/stores/ui';

const uiStore = useUiStore();

const resetServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
      // Clear cache
      const cacheNames = await caches.keys();
      for (const cacheName of cacheNames) {
        await caches.delete(cacheName);
      }
      // Reload page
      window.location.reload();
    } catch (error) {
      console.error('Failed to reset service worker:', error);
    }
  }
};
</script>

<style scoped lang="scss">
.app-footer {
  background-color: var(--color-dark);
  color: white;
  margin-top: var(--spacing-2xl);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  padding: var(--spacing-xl);
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  h4,
  h5 {
    margin: 0 0 var(--spacing-md) 0;
    font-size: var(--font-size-lg);
  }

  p {
    margin: 0 0 var(--spacing-sm) 0;
    opacity: 0.9;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: var(--spacing-sm);

      a {
        color: white;
        text-decoration: none;
        transition: opacity 0.2s ease;

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: var(--spacing-lg);
  text-align: center;
  opacity: 0.8;
  font-size: var(--font-size-sm);

  p {
    margin: 0;

    &:not(:last-child) {
      margin-bottom: var(--spacing-sm);
    }
  }
}

.offline-indicator {
  color: var(--color-warning);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

@media (max-width: 600px) {
  .footer-content {
    grid-template-columns: 1fr;
    padding: var(--spacing-lg);
  }
}
</style>

