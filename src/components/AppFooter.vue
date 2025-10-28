<template>
  <q-footer class="footer4 section-footer">
    <div class="container">
      <div class="footer-row">
        <!-- Logo and Info Column -->
        <div class="footer-column logo-section">
          <router-link to="/" class="logo-link">
            <img 
              src="/assets/images/alcoholics-anonymous-text-white-2.svg" 
              alt="AA Hrvatska" 
              class="footer-logo"
              style="height: 200px; width: auto;"
            />
          </router-link>
        </div>

        <!-- Sastanci & Kontakt Column -->
        <div class="footer-column">
          <!-- Sastanci Section -->
          <div class="footer-section">
            <h5 class="section-title">Sastanci</h5>
            <ul class="footer-links">
              <li><a href="#sastanci">Grupa Prvi Korak Osijek</a></li>
              <li><a href="#susjedne-grupe">Susjedne Online Grupe</a></li>
              <li><a href="#zivi-sastanci">Živi Sastanci</a></li>
            </ul>
          </div>

          <!-- Kontakt Section -->
          <div class="footer-section">
            <h5 class="section-title">Kontakt</h5>
            <div class="social-icons">
              <a href="tel:+385955041511" class="social-icon">
                <q-icon name="phone" style="line-height: 1; vertical-align: middle;" />
              </a>
              <a href="https://api.whatsapp.com/send?phone=385955041511" class="social-icon">
                <q-icon name="chat" style="line-height: 1; vertical-align: middle;" />
              </a>
              <a href="mailto:info@aahrvatska.hr" class="social-icon">
                <q-icon name="email" style="line-height: 1; vertical-align: middle;" />
              </a>
            </div>
            <div v-if="!uiStore.isOnline" class="offline-indicator">
              <q-icon name="cloud_off" size="xs" />
              Offline mode
            </div>
          </div>
        </div>

        <!-- Info Column -->
        <div class="footer-column">
          <div class="footer-section">
            <h5 class="section-title">Info</h5>
            <ul class="footer-links">
              <li><router-link to="/">Povijest AA</router-link></li>
              <li><router-link to="/informacije">Anonimnost u AA</router-link></li>
              <li><router-link to="/literatura">Česta pitanja</router-link></li>
              <li><router-link to="/o-nama">O našoj grupi</router-link></li>
              <li><router-link to="/privatnost">Privatnost</router-link></li>
            </ul>
          </div>
        </div>

        <!-- Alati Column -->
        <div class="footer-column">
          <div class="footer-section">
            <h5 class="section-title">Alati</h5>
            <ul class="footer-links">
              <li><router-link to="/privatnost">Čitaonica</router-link></li>
              <li><router-link to="/help">Dnevna Razmatranja</router-link></li>
              <li><a href="tel:+385955041511">Kalkulator Trijeznosti</a></li>
              <li><a href="#" @click.prevent="resetServiceWorker">Ažuriranje aplikacije</a></li>
              <li><a href="mailto:info@aahrvatska.hr">Pomoć</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} AA Hrvatska. Sva prava pridržana.</p>
      </div>
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
.footer4 {
  background-color: var(--color-primary);
  color: white;
  padding: 3rem 0 1.5rem;
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.footer-row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
  justify-content: space-between;
}

.footer-column {
  padding: 0 15px;
  margin-bottom: 2rem;
  flex: 1;
  min-width: 200px;
  max-width: 25%;
  box-sizing: border-box;

  &.logo-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 25%;
    padding-right: 2rem;
  }
}

.logo-link {
  display: inline-block;
  margin-bottom: 1rem;
  
  img {
    height: 40px;
    width: auto;
    filter: brightness(0) invert(1);
  }
}

.footer-info {
  h4 {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
  }
  
  p {
    margin: 0;
    opacity: 0.8;
    font-size: 0.9rem;
  }
}

.section-title {
  font-size: 1.1rem;
  margin: 0 0 1.25rem;
  font-weight: 600;
  position: relative;
  padding-bottom: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 40px;
    height: 2px;
    background-color: var(--q-primary);
  }
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: 0.75rem;
    
    a {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      transition: color 0.2s ease;
      font-size: 0.95rem;
      display: inline-block;
      
      &:hover {
        color: white;
        text-decoration: underline;
      }
    }
  }
}

.social-icons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: white;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: var(--q-primary);
      transform: translateY(-2px);
    }
    
    .q-icon {
      font-size: 1.1rem;
    }
  }
}

.offline-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  margin-top: 1rem;
  
  .q-icon {
    font-size: 1rem;
  }
}

.footer-bottom {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

/* Responsive styles */
@media (max-width: 1024px) {
  .footer-row {
    justify-content: flex-start;
  }
  
  .footer-column {
    flex: 0 0 50%;
    max-width: 50%;
    
    &.logo-section {
      flex: 0 0 100%;
      max-width: 100%;
      flex-direction: row;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2.5rem;
      
      .footer-info {
        flex: 1;
      }
    }
  }
}

@media (max-width: 768px) {
  .footer4 {
    padding: 2.5rem 0 1.5rem;
  }
  
  .footer-column {
    flex: 0 0 100%;
    max-width: 100%;
    text-align: center;
    margin-bottom: 2rem;
    
    &.logo-section {
      flex-direction: column;
      text-align: center;
      gap: 1rem;
      
      .logo-link {
        margin: 0 auto 1rem;
      }
    }
    
    .section-title::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
  
  .social-icons {
    justify-content: center;
  }
}
</style>

