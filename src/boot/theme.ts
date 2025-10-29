import { boot } from 'quasar/wrappers';
import { useUserPreferencesStore } from 'src/stores/userPreferences';
import { useBooksStore } from 'src/stores/books';

// Import all theme CSS files
import 'src/css/themes/default.css';
import 'src/css/themes/ocean.css';
import 'src/css/themes/forest.css';
import 'src/css/themes/sunset.css';
import 'src/css/themes/lavender.css';
import 'src/css/themes/earth.css';

export default boot(async ({ app }) => {
  const userPreferences = useUserPreferencesStore();
  const booksStore = useBooksStore();

  // Load user preferences from localStorage
  userPreferences.loadPreferences();
  booksStore.loadBookmarks();

  // Apply font size
  const applyFontSize = () => {
    document.documentElement.setAttribute('data-font-size', userPreferences.fontSize);
  };

  // Initial application
  applyFontSize();

  // Watch for font size changes
  userPreferences.$subscribe((mutation) => {
    try {
      const events = Array.isArray(mutation.events) ? mutation.events : [mutation.events];
      for (const event of events) {
        if (event.key === 'fontSize') {
          applyFontSize();
        }
      }
    } catch (error) {
      console.error('Error in theme subscription:', error);
    }
  });

  // Load books
  await booksStore.loadBooks();

  // Make stores available globally
  app.config.globalProperties.$userPreferences = userPreferences;
  app.config.globalProperties.$booksStore = booksStore;
});

