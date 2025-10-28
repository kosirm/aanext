import { defineStore } from 'pinia';
import { ref } from 'vue';

export type PageName = 'index' | 'informacije' | 'literatura' | 'o-nama' | 'privatnost' | 'reset' | 'help';

// Main pages that support swipe navigation (in circular order)
const MAIN_PAGES: PageName[] = ['index', 'informacije', 'literatura', 'o-nama'];

export const useNavigationStore = defineStore('navigation', () => {
  // State
  const currentPage = ref<PageName>('index');
  const leftDrawerOpen = ref(false);
  const rightDrawerOpen = ref(false);
  const leftDrawerTab = ref<'navigation' | 'tools'>('navigation');
  const rightDrawerTab = ref<'navigation' | 'tools'>('navigation');
  const isNavigating = ref(false);

  // Setters
  const setCurrentPage = (page: PageName) => {
    currentPage.value = page;
  };

  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  };

  const toggleRightDrawer = () => {
    rightDrawerOpen.value = !rightDrawerOpen.value;
  };

  const setLeftDrawerTab = (tab: 'navigation' | 'tools') => {
    leftDrawerTab.value = tab;
  };

  const setRightDrawerTab = (tab: 'navigation' | 'tools') => {
    rightDrawerTab.value = tab;
  };

  const closeDrawers = () => {
    leftDrawerOpen.value = false;
    rightDrawerOpen.value = false;
  };

  // Page navigation methods
  const nextPage = () => {
    if (!MAIN_PAGES.includes(currentPage.value)) return;
    const currentIndex = MAIN_PAGES.indexOf(currentPage.value);
    const nextIndex = (currentIndex + 1) % MAIN_PAGES.length;
    const nextPage = MAIN_PAGES[nextIndex];
    if (nextPage) {
      currentPage.value = nextPage;
    }
  };

  const previousPage = () => {
    if (!MAIN_PAGES.includes(currentPage.value)) return;
    const currentIndex = MAIN_PAGES.indexOf(currentPage.value);
    const prevIndex = (currentIndex - 1 + MAIN_PAGES.length) % MAIN_PAGES.length;
    const prevPage = MAIN_PAGES[prevIndex];
    if (prevPage) {
      currentPage.value = prevPage;
    }
  };

  const isMainPage = (page: PageName): boolean => {
    return MAIN_PAGES.includes(page);
  };

  return {
    // State
    currentPage,
    leftDrawerOpen,
    rightDrawerOpen,
    leftDrawerTab,
    rightDrawerTab,
    isNavigating,
    // Methods
    setCurrentPage,
    toggleLeftDrawer,
    toggleRightDrawer,
    setLeftDrawerTab,
    setRightDrawerTab,
    closeDrawers,
    nextPage,
    previousPage,
    isMainPage,
  };
});

