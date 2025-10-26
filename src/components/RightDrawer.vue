<template>
  <q-drawer
    v-model="navigationStore.rightDrawerOpen"
    side="right"
    overlay
    elevated
    class="right-drawer"
  >
    <!-- Drawer Header -->
    <q-toolbar class="drawer-header">
      <q-toolbar-title>Alati stranice</q-toolbar-title>
      <q-btn
        flat
        dense
        round
        icon="close"
        @click="navigationStore.toggleRightDrawer()"
      />
    </q-toolbar>

    <!-- Tabs -->
    <q-tabs
      v-model="navigationStore.rightDrawerTab"
      dense
      class="text-primary"
      active-color="primary"
      indicator-color="primary"
    >
      <q-tab name="navigation" label="Sekcije" icon="list" />
      <q-tab name="tools" label="Alati" icon="build" />
    </q-tabs>

    <!-- Tab Panels -->
    <q-tab-panels v-model="navigationStore.rightDrawerTab" animated>
      <!-- Navigation Tab -->
      <q-tab-panel name="navigation" class="q-pa-none">
        <q-list>
          <q-item
            v-for="section in pageSections"
            :key="section.id"
            clickable
            @click="scrollToSection(section.id)"
          >
            <q-item-section avatar>
              <q-icon :name="section.icon" />
            </q-item-section>
            <q-item-section>
              {{ section.label }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>

      <!-- Tools Tab -->
      <q-tab-panel name="tools" class="q-pa-md">
        <div class="tools-content">
          <slot name="tools">
            <div class="text-center text-grey">
              Nema dostupnih alata za ovu stranicu
            </div>
          </slot>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useNavigationStore } from 'src/stores/navigation';

interface PageSection {
  id: string;
  label: string;
  icon: string;
}

const navigationStore = useNavigationStore();

// Define sections for each page
const sectionsByPage: Record<string, PageSection[]> = {
  index: [
    { id: 'problem', label: 'Problem', icon: 'warning' },
    { id: 'solution', label: 'Rješenje', icon: 'lightbulb' },
    { id: 'meetings', label: 'Sastanci', icon: 'event' },
    { id: 'contact', label: 'Kontakt', icon: 'phone' },
  ],
  informacije: [
    { id: 'about', label: 'O nama', icon: 'info' },
    { id: 'founding', label: 'Osnivanje', icon: 'history' },
    { id: 'anonymity', label: 'Anonimnost', icon: 'privacy_tip' },
    { id: 'faq', label: 'Pitanja', icon: 'help' },
  ],
  literatura: [
    { id: 'daily', label: 'Dnevna razmatranja', icon: 'calendar_today' },
    { id: 'library', label: 'Čitaonica', icon: 'library_books' },
  ],
  'o-nama': [
    { id: 'calculator', label: 'Kalkulator', icon: 'calculate' },
    { id: 'prayer', label: 'Molitva', icon: 'favorite' },
    { id: 'news', label: 'Vijesti', icon: 'newspaper' },
    { id: 'links', label: 'Povezave', icon: 'link' },
  ],
};

const pageSections = computed(() => {
  return sectionsByPage[navigationStore.currentPage] || [];
});

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    navigationStore.toggleRightDrawer();
  }
};
</script>

<style scoped lang="scss">
.right-drawer {
  width: 280px;
  z-index: 2000 !important;
}

.drawer-header {
  background-color: var(--color-primary);
  color: white;
}

.tools-content {
  padding: var(--spacing-md);
}
</style>

