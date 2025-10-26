import { boot } from 'quasar/wrappers';
import { useQuasar } from 'quasar';
import { useUserPreferencesStore } from 'src/stores/userPreferences';
import { useBooksStore } from 'src/stores/books';

export default boot(async ({ app }) => {
  const $q = useQuasar();
  const userPreferences = useUserPreferencesStore();
  const booksStore = useBooksStore();

  // Load user preferences from localStorage
  userPreferences.loadPreferences();
  booksStore.loadBookmarks();

  // Apply theme
  const applyTheme = () => {
    const theme = userPreferences.theme;
    let isDark = false;

    if (theme === 'auto') {
      // Use system preference
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      isDark = theme === 'dark';
    }

    // Apply dark mode using Quasar's Dark plugin
    try {
      if ($q && $q.dark && typeof $q.dark.set === 'function') {
        $q.dark.set(isDark);
      } else {
        // Fallback: set data attribute directly
        document.documentElement.setAttribute('data-dark', isDark ? 'true' : 'false');
      }
    } catch {
      // Fallback: set data attribute directly
      document.documentElement.setAttribute('data-dark', isDark ? 'true' : 'false');
    }
  };

  // Apply font size
  const applyFontSize = () => {
    document.documentElement.setAttribute('data-font-size', userPreferences.fontSize);
  };

  // Initial application - use setTimeout to ensure Dark plugin is ready
  setTimeout(() => {
    applyTheme();
    applyFontSize();
  }, 0);

  // Watch for theme changes
  userPreferences.$subscribe((mutation) => {
    try {
      const events = Array.isArray(mutation.events) ? mutation.events : [mutation.events];
      for (const event of events) {
        if (event.key === 'theme') {
          applyTheme();
        }
        if (event.key === 'fontSize') {
          applyFontSize();
        }
      }
    } catch (error) {
      console.error('Error in theme subscription:', error);
    }
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (userPreferences.theme === 'auto') {
      applyTheme();
    }
  });

  // Load books
  await booksStore.loadBooks();

  // Make stores available globally
  app.config.globalProperties.$userPreferences = userPreferences;
  app.config.globalProperties.$booksStore = booksStore;
});

