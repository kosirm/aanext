import { useRouter } from 'vue-router';
import { useNavigationStore } from 'src/stores/navigation';

interface SwipeEvent {
  evt?: Event;
  touch?: boolean;
  mouse?: boolean;
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  distance?: { x?: number; y?: number };
}

export function usePageNavigation() {
  const router = useRouter();
  const navigationStore = useNavigationStore();

  const handleSwipe = (info: SwipeEvent) => {
    // Only handle swipe on main pages
    if (!navigationStore.isMainPage(navigationStore.currentPage)) {
      return;
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

  return {
    handleSwipe,
  };
}

