<template>
  <q-page class="reset-page">
    <section class="hero-section">
      <div class="hero-content">
        <h1>Resetiraj aplikaciju</h1>
      </div>
    </section>

    <section class="content-section">
      <div class="section-container">
        <h2>Očisti cache i resetiraj aplikaciju</h2>
        <p>
          Ako aplikacija ne radi kako treba, možete je resetirati brisanjem cache-a
          i servisnog radnika.
        </p>

        <div class="reset-card">
          <h3>Opcije resetiranja</h3>
          <div class="reset-options">
            <q-btn
              color="warning"
              label="Obriši cache"
              icon="delete"
              @click="clearCache"
              class="reset-btn"
            />
            <q-btn
              color="negative"
              label="Resetiraj aplikaciju"
              icon="refresh"
              @click="resetApp"
              class="reset-btn"
            />
          </div>
        </div>

        <div v-if="resetMessage" class="reset-message" :class="resetMessageType">
          {{ resetMessage }}
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUiStore } from 'src/stores/ui';

const uiStore = useUiStore();
const resetMessage = ref('');
const resetMessageType = ref<'success' | 'error'>('success');

const clearCache = async () => {
  try {
    const cacheNames = await caches.keys();
    for (const cacheName of cacheNames) {
      await caches.delete(cacheName);
    }
    resetMessage.value = 'Cache je uspješno obrisan!';
    resetMessageType.value = 'success';
    uiStore.addNotification('Cache je obrisan', 'positive', 3000);
  } catch {
    resetMessage.value = 'Greška pri brisanju cache-a';
    resetMessageType.value = 'error';
    uiStore.addNotification('Greška pri brisanju cache-a', 'negative', 3000);
  }
};

const resetApp = async () => {
  try {
    // Unregister service workers
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
    }

    // Clear cache
    const cacheNames = await caches.keys();
    for (const cacheName of cacheNames) {
      await caches.delete(cacheName);
    }

    // Clear localStorage
    localStorage.clear();

    resetMessage.value = 'Aplikacija će se sada ponovno učitati...';
    resetMessageType.value = 'success';
    uiStore.addNotification('Aplikacija se resetira', 'positive', 2000);

    // Reload after 2 seconds
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch {
    resetMessage.value = 'Greška pri resetiranju aplikacije';
    resetMessageType.value = 'error';
    uiStore.addNotification('Greška pri resetiranju', 'negative', 3000);
  }
};
</script>

<style scoped lang="scss">
.reset-page {
  padding: 0;
}

.hero-section {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  padding: var(--spacing-2xl);
  text-align: center;
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  h1 {
    font-size: var(--font-size-4xl);
    margin: 0;
  }
}

.content-section {
  padding: var(--spacing-2xl) var(--spacing-lg);
}

.section-container {
  max-width: 900px;
  margin: 0 auto;
}

h2 {
  font-size: var(--font-size-2xl);
  margin: 0 0 var(--spacing-md) 0;
}

h3 {
  font-size: var(--font-size-lg);
  margin: 0 0 var(--spacing-lg) 0;
}

p {
  line-height: 1.8;
  margin-bottom: var(--spacing-lg);
}

.reset-card {
  background-color: var(--bg-secondary);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  margin: var(--spacing-xl) 0;
}

.reset-options {
  display: flex;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
}

.reset-btn {
  flex: 1;
  min-width: 150px;
}

.reset-message {
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  margin-top: var(--spacing-lg);
  font-weight: 600;

  &.success {
    background-color: rgba(33, 186, 69, 0.1);
    color: var(--color-positive);
    border: 1px solid var(--color-positive);
  }

  &.error {
    background-color: rgba(219, 40, 40, 0.1);
    color: var(--color-negative);
    border: 1px solid var(--color-negative);
  }
}
</style>

