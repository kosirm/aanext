<template>
  <q-drawer
    v-model="navigationStore.leftDrawerOpen"
    side="left"
    overlay
    elevated
    class="left-drawer"
  >
    <!-- Drawer Header -->
    <q-toolbar class="drawer-header">
      <q-toolbar-title>Meni</q-toolbar-title>
      <q-btn
        flat
        dense
        round
        icon="close"
        @click="navigationStore.toggleLeftDrawer()"
      />
    </q-toolbar>

    <!-- Tabs -->
    <q-tabs
      v-model="navigationStore.leftDrawerTab"
      dense
      class="text-primary"
      active-color="primary"
      indicator-color="primary"
    >
      <q-tab name="tools" icon="settings" />
      <q-tab name="navigation" icon="home" />
    </q-tabs>

    <!-- Tab Panels -->
    <q-tab-panels v-model="navigationStore.leftDrawerTab" animated>
      <!-- Navigation Tab -->
      <q-tab-panel name="navigation" class="q-pa-none">
        <q-list>
          <q-item
            v-for="page in pages"
            :key="page.id"
            clickable
            :active="navigationStore.currentPage === page.id"
            active-class="bg-primary text-white"
            @click="navigateToPage(page.id)"
          >
            <q-item-section avatar>
              <q-icon :name="page.icon" />
            </q-item-section>
            <q-item-section>
              {{ page.label }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>

      <!-- Tools Tab -->
      <q-tab-panel name="tools" class="q-pa-md">
        <!-- Theme Toggle -->
        <div class="tool-section">
          <div class="tool-label">Tema</div>
          <q-option-group
            v-model="userPreferences.theme"
            :options="themeOptions"
            color="primary"
            @update:model-value="updateTheme"
          />
        </div>

        <!-- Font Size -->
        <div class="tool-section">
          <div class="tool-label">Veličina fonta</div>
          <q-option-group
            v-model="userPreferences.fontSize"
            :options="fontSizeOptions"
            color="primary"
            @update:model-value="updateFontSize"
          />
        </div>

        <!-- Sobriety Date -->
        <div class="tool-section">
          <div class="tool-label">Moji dani trijeznosti</div>
          <q-input
            v-model="sobrietyDateInput"
            type="date"
            outlined
            dense
            @update:model-value="(val) => updateSobrietyDate(val as string)"
          />
          <q-btn
            v-if="userPreferences.sobrietyDate"
            flat
            size="sm"
            color="negative"
            label="Obriši"
            @click="clearSobrietyDate"
            class="q-mt-sm full-width"
          />
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useNavigationStore, type PageName } from 'src/stores/navigation';
import { useUserPreferencesStore } from 'src/stores/userPreferences';

const router = useRouter();
const navigationStore = useNavigationStore();
const userPreferences = useUserPreferencesStore();

const pages = [
  { id: 'index' as PageName, label: 'Početna', icon: 'home' },
  { id: 'informacije' as PageName, label: 'Informacije', icon: 'info' },
  { id: 'literatura' as PageName, label: 'Literatura', icon: 'library_books' },
  { id: 'o-nama' as PageName, label: 'O nama', icon: 'people' },
  { id: 'privatnost' as PageName, label: 'Privatnost', icon: 'privacy_tip' },
  { id: 'help' as PageName, label: 'Pomoć', icon: 'help' },
];

const themeOptions = [
  { label: 'Automatski', value: 'auto' },
  { label: 'Svjetlo', value: 'light' },
  { label: 'Tamno', value: 'dark' },
];

const fontSizeOptions = [
  { label: 'Mala', value: 'small' },
  { label: 'Normalna', value: 'normal' },
  { label: 'Velika', value: 'large' },
];

const sobrietyDateInput = computed({
  get: () => userPreferences.sobrietyDate || '',
  set: () => {
    // Handled by updateSobrietyDate
  },
});

const navigateToPage = (page: PageName) => {
  navigationStore.setCurrentPage(page);
  void router.push({ name: page });
  navigationStore.toggleLeftDrawer();
};

const updateTheme = (value: string | number | null) => {
  if (typeof value === 'string') {
    userPreferences.setTheme(value as 'light' | 'dark' | 'auto');
  }
};

const updateFontSize = (value: string | number | null) => {
  if (typeof value === 'string') {
    userPreferences.setFontSize(value as 'small' | 'normal' | 'large');
  }
};

const updateSobrietyDate = (value: string) => {
  if (value) {
    userPreferences.setSobrietyDate(value);
  }
};

const clearSobrietyDate = () => {
  userPreferences.setSobrietyDate(null);
};
</script>

<style scoped lang="scss">
.left-drawer {
  width: 280px;
  z-index: 2000 !important;
}

.drawer-header {
  background-color: var(--color-primary);
  color: white;
}

.tool-section {
  margin-bottom: var(--spacing-lg);

  &:last-child {
    margin-bottom: 0;
  }
}

.tool-label {
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

:deep(.q-option-group) {
  .q-radio {
    margin-bottom: var(--spacing-sm);
  }
}
</style>

