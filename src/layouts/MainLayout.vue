<template>
  <q-layout view="hHh lpR fff" class="main-layout" v-touch-swipe.mouse.horizontal="handleSwipe">
    <!-- App Header -->
    <AppHeader />

    <!-- Left Drawer -->
    <LeftDrawer />

    <!-- Right Drawer -->
    <RightDrawer>
      <template #tools>
        <slot name="drawer-tools" />
      </template>
    </RightDrawer>

    <!-- Page Container -->
    <q-page-container class="page-container">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="router.currentRoute.value.path" />
        </transition>
      </router-view>
    </q-page-container>

    <!-- App Footer -->
    <AppFooter />

    <!-- Notifications -->
    <div class="notifications-container">
      <transition-group name="slide-in-up">
        <q-banner
          v-for="notification in uiStore.notifications"
          :key="notification.id"
          :class="`bg-${notification.type}`"
          text-color="white"
          class="notification-item"
        >
          {{ notification.message }}
          <template #avatar>
            <q-icon :name="getNotificationIcon(notification.type)" />
          </template>
        </q-banner>
      </transition-group>
    </div>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useNavigationStore } from 'src/stores/navigation';
import { useUiStore } from 'src/stores/ui';
import AppHeader from 'components/AppHeader.vue';
import LeftDrawer from 'components/LeftDrawer.vue';
import RightDrawer from 'components/RightDrawer.vue';
import AppFooter from 'components/AppFooter.vue';

const router = useRouter();
const navigationStore = useNavigationStore();
const uiStore = useUiStore();

interface SwipeEvent {
  evt?: Event;
  touch?: boolean;
  mouse?: boolean;
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  distance?: { x?: number; y?: number };
}

const handleSwipe = (info: SwipeEvent) => {
  // Only handle swipe on main pages
  if (!navigationStore.isMainPage(navigationStore.currentPage)) {
    return;
  }

  // Check if swipe is on a carousel (has data-carousel attribute)
  if (info.evt) {
    const target = info.evt.target as HTMLElement;
    if (target.closest('[data-carousel]')) {
      return; // Let carousel handle the swipe
    }
  }

  if (info.direction === 'left') {
    navigationStore.nextPage();
    const nextPageName = navigationStore.currentPage;
    void router.push(`/${nextPageName === 'index' ? '' : nextPageName}`);
  } else if (info.direction === 'right') {
    navigationStore.previousPage();
    const prevPageName = navigationStore.currentPage;
    void router.push(`/${prevPageName === 'index' ? '' : prevPageName}`);
  }
};

const getNotificationIcon = (type: string): string => {
  const icons: Record<string, string> = {
    positive: 'check_circle',
    negative: 'error',
    warning: 'warning',
    info: 'info',
  };
  return icons[type] || 'info';
};
</script>

<style scoped lang="scss">
.main-layout {
  // Let Quasar handle the layout
}

.page-container {
  // Quasar handles this
}

.notifications-container {
  position: fixed;
  bottom: var(--spacing-lg);
  right: var(--spacing-lg);
  z-index: 9999;
  max-width: 400px;
}

.notification-item {
  margin-bottom: var(--spacing-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}

// Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-in-up-enter-active,
.slide-in-up-leave-active {
  transition: all 0.3s ease;
}

.slide-in-up-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.slide-in-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
