<template>
  <q-drawer
    v-model="navigationStore.rightDrawerOpen"
    side="right"
    overlay
    elevated
    :width="180"
    class="right-drawer"
  >
    <!-- Drawer Header -->
    <q-toolbar class="drawer-header">
      <q-icon name="build" size="sm" class="q-mr-sm" />
      <q-btn
        flat
        dense
        round
        icon="close"
        @click="navigationStore.toggleRightDrawer()"
        class="q-ml-auto"
      />
    </q-toolbar>

    <!-- Tools List -->
    <q-list>
      <q-item
        clickable
        @click="openBookmarkManager"
      >
        <q-item-section avatar>
          <q-icon name="bookmark" />
        </q-item-section>
        <q-item-section>
          Oznake
        </q-item-section>
      </q-item>

      <q-item
        clickable
        @click="openSobrietyCalculator"
      >
        <q-item-section avatar>
          <q-icon name="calculate" />
        </q-item-section>
        <q-item-section>
          Kalkulator
        </q-item-section>
      </q-item>

      <q-item
        clickable
        @click="openThemeSettings"
      >
        <q-item-section avatar>
          <q-icon name="palette" />
        </q-item-section>
        <q-item-section>
          Teme
        </q-item-section>
      </q-item>

      <q-item
        clickable
        @click="forceUpdate"
      >
        <q-item-section avatar>
          <q-icon name="refresh" />
        </q-item-section>
        <q-item-section>
          Ažuriranje
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Bookmark Manager Modal -->
    <q-dialog v-model="showBookmarkManager" class="bookmark-manager-dialog">
      <q-card class="bookmark-manager-card">
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title>Upravitelj oznaka</q-toolbar-title>
          <q-btn
            flat
            dense
            round
            icon="close"
            @click="showBookmarkManager = false"
          />
        </q-toolbar>
        <q-card-section class="q-pa-none">
          <BookmarkManager />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Theme Manager Modal -->
    <q-dialog v-model="showThemeManager" class="theme-manager-dialog">
      <q-card class="theme-manager-card">
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title>Upravljanje temama</q-toolbar-title>
          <q-btn
            flat
            dense
            round
            icon="close"
            @click="showThemeManager = false"
          />
        </q-toolbar>
        <q-card-section class="scroll theme-manager-content">
          <ThemeManager />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Sobriety Calculator Modal -->
    <SobrietyCalculator v-model="showSobrietyCalculator" />
  </q-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useNavigationStore } from 'src/stores/navigation';
import { useQuasar } from 'quasar';
import BookmarkManager from './BookmarkManager.vue';
import ThemeManager from './ThemeManager.vue';
import SobrietyCalculator from './SobrietyCalculator.vue';

const navigationStore = useNavigationStore();
const $q = useQuasar();

// State for modals
const showBookmarkManager = ref(false);
const showThemeManager = ref(false);
const showSobrietyCalculator = ref(false);

// Tool actions
const openBookmarkManager = () => {
  navigationStore.toggleRightDrawer();
  showBookmarkManager.value = true;
};

const openSobrietyCalculator = () => {
  navigationStore.toggleRightDrawer();
  showSobrietyCalculator.value = true;
};

const openThemeSettings = () => {
  navigationStore.toggleRightDrawer();
  showThemeManager.value = true;
};

const forceUpdate = () => {
  navigationStore.toggleRightDrawer();
  // TODO: Implement force update functionality
  $q.notify({
    message: 'Ažuriranje stranice - uskoro dostupno',
    color: 'info',
    position: 'top',
  });
};

</script>

<style scoped lang="scss">
.right-drawer {
  width: 220px;
  z-index: 2000 !important;
}

.drawer-header {
  background-color: var(--color-primary);
  color: white;
}

// Theme Manager Modal - 50px spacing on all sides, allows page scroll
:deep(.theme-manager-dialog) {
  .q-dialog__backdrop {
    background-color: rgba(0, 0, 0, 0.3) !important;
  }

  .theme-manager-card {
    margin: 50px;
    max-width: calc(100vw - 100px);
    max-height: calc(100vh - 100px);
    width: 100%;

    @media (max-width: 600px) {
      margin: 50px 20px;
      max-width: calc(100vw - 40px);
    }
  }

  .theme-manager-content {
    max-height: calc(100vh - 150px);
    overflow-y: auto;
  }
}

// Bookmark Manager Modal - 10-20px spacing on all sides
:deep(.bookmark-manager-dialog) {
  .q-dialog__backdrop {
    background-color: rgba(0, 0, 0, 0.5) !important;
  }

  .bookmark-manager-card {
    margin: 15px;
    max-width: calc(100vw - 30px);
    max-height: calc(100vh - 30px);
    width: 100%;

    @media (max-width: 600px) {
      margin: 10px;
      max-width: calc(100vw - 20px);
      max-height: calc(100vh - 20px);
    }
  }
}
</style>

