<template>
  <q-drawer
    v-model="navigationStore.leftDrawerOpen"
    side="left"
    overlay
    elevated
    :width="180"
    class="left-drawer"
  >
    <!-- Drawer Header -->
    <q-toolbar class="drawer-header">
      <q-icon name="list" size="sm" class="q-mr-sm" />
      <q-btn
        flat
        dense
        round
        icon="close"
        @click="navigationStore.toggleLeftDrawer()"
        class="q-ml-auto"
      />
    </q-toolbar>

    <!-- Navigation List -->
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
  </q-drawer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useNavigationStore, type PageName } from 'src/stores/navigation';

const router = useRouter();
const navigationStore = useNavigationStore();

const pages = [
  { id: 'index' as PageName, label: 'Sastanci', icon: 'home' },
  { id: 'informacije' as PageName, label: 'Informacije', icon: 'info' },
  { id: 'literatura' as PageName, label: 'Literatura', icon: 'library_books' },
  { id: 'o-nama' as PageName, label: 'O nama', icon: 'people' },
  { id: 'privatnost' as PageName, label: 'Privatnost', icon: 'privacy_tip' },
  { id: 'help' as PageName, label: 'Pomoć', icon: 'help' },
];

const navigateToPage = (page: PageName) => {
  navigationStore.setCurrentPage(page);
  void router.push({ name: page });
  navigationStore.toggleLeftDrawer();
};
</script>

<style scoped lang="scss">
.left-drawer {
  width: 220px;
  z-index: 2000 !important;
}

.drawer-header {
  background-color: var(--color-primary);
  color: white;
}
</style>

