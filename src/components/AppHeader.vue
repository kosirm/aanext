<template>
  <q-header elevated class="app-header">
    <q-toolbar>
      <!-- Left Drawer Toggle -->
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="navigationStore.toggleLeftDrawer()"
      />

      <!-- Logo/Title -->
      <q-toolbar-title class="text-center">
        <div class="app-title">AA Hrvatska</div>
      </q-toolbar-title>

      <!-- Sobriety Badge (right side) -->
      <SobrietyBadge v-if="userPreferences.sobrietyDate" class="right-badge" />

      <!-- Right Drawer Toggle -->
      <q-btn
        flat
        dense
        round
        icon="more_vert"
        aria-label="More"
        @click="navigationStore.toggleRightDrawer()"
      />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useNavigationStore } from 'src/stores/navigation';
import { useUserPreferencesStore } from 'src/stores/userPreferences';
import SobrietyBadge from './SobrietyBadge.vue';

const navigationStore = useNavigationStore();
const userPreferences = useUserPreferencesStore();
</script>

<style scoped lang="scss">
.app-header {
  background-color: var(--color-primary);
  color: white;
}

.app-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  letter-spacing: 0.5px;
}

.right-badge {
  margin-right: var(--spacing-md);
}

:deep(.q-toolbar) {
  padding: 0 var(--spacing-md);
}
</style>

