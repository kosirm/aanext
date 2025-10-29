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
    <q-dialog v-model="showBookmarkManager" maximized>
      <q-card>
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
    <q-dialog v-model="showThemeManager" position="bottom">
      <q-card style="width: 100%; max-width: 900px; max-height: 80vh;">
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
        <q-card-section class="scroll" style="max-height: calc(80vh - 50px);">
          <ThemeManager />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useNavigationStore } from 'src/stores/navigation';
import { useQuasar } from 'quasar';
import BookmarkManager from './BookmarkManager.vue';
import ThemeManager from './ThemeManager.vue';

const navigationStore = useNavigationStore();
const $q = useQuasar();

// State for modals
const showBookmarkManager = ref(false);
const showThemeManager = ref(false);

// Tool actions
const openBookmarkManager = () => {
  navigationStore.toggleRightDrawer();
  showBookmarkManager.value = true;
};

const openSobrietyCalculator = () => {
  navigationStore.toggleRightDrawer();
  // TODO: Implement sobriety calculator modal
  $q.notify({
    message: 'Kalkulator trijeznosti - uskoro dostupno',
    color: 'info',
    position: 'top',
  });
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
</style>

