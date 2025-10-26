import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Notification {
  id: string;
  message: string;
  type: 'positive' | 'negative' | 'warning' | 'info';
  timeout?: number;
}

export const useUiStore = defineStore('ui', () => {
  // State
  const notifications = ref<Notification[]>([]);
  const isOnline = ref(navigator.onLine);
  const showSobrietyDateModal = ref(false);

  // Listen for online/offline events
  window.addEventListener('online', () => {
    isOnline.value = true;
    addNotification('Back online', 'positive', 3000);
  });

  window.addEventListener('offline', () => {
    isOnline.value = false;
    addNotification('You are offline', 'warning', 3000);
  });

  // Notification methods
  const addNotification = (
    message: string,
    type: 'positive' | 'negative' | 'warning' | 'info' = 'info',
    timeout = 5000
  ) => {
    const id = `notification-${Date.now()}`;
    const notification: Notification = { id, message, type, timeout };
    notifications.value.push(notification);

    if (timeout > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, timeout);
    }
  };

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex((n) => n.id === id);
    if (index > -1) {
      notifications.value.splice(index, 1);
    }
  };

  const clearNotifications = () => {
    notifications.value = [];
  };

  // Modal methods
  const openSobrietyDateModal = () => {
    showSobrietyDateModal.value = true;
  };

  const closeSobrietyDateModal = () => {
    showSobrietyDateModal.value = false;
  };

  return {
    // State
    notifications,
    isOnline,
    showSobrietyDateModal,
    // Methods
    addNotification,
    removeNotification,
    clearNotifications,
    openSobrietyDateModal,
    closeSobrietyDateModal,
  };
});

