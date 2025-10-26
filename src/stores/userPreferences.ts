import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserPreferencesStore = defineStore('userPreferences', () => {
  // State
  const theme = ref<'light' | 'dark' | 'auto'>('auto');
  const fontSize = ref<'small' | 'normal' | 'large'>('normal');
  const sobrietyDate = ref<string | null>(null);

  // Load from localStorage on initialization
  const loadPreferences = () => {
    const savedTheme = localStorage.getItem('aa-theme') as 'light' | 'dark' | 'auto' | null;
    const savedFontSize = localStorage.getItem('aa-fontSize') as 'small' | 'normal' | 'large' | null;
    const savedSobrietyDate = localStorage.getItem('aa-sobrietyDate');

    if (savedTheme) theme.value = savedTheme;
    if (savedFontSize) fontSize.value = savedFontSize;
    if (savedSobrietyDate) sobrietyDate.value = savedSobrietyDate;
  };

  // Setters with localStorage persistence
  const setTheme = (newTheme: 'light' | 'dark' | 'auto') => {
    theme.value = newTheme;
    localStorage.setItem('aa-theme', newTheme);
  };

  const setFontSize = (newSize: 'small' | 'normal' | 'large') => {
    fontSize.value = newSize;
    localStorage.setItem('aa-fontSize', newSize);
  };

  const setSobrietyDate = (date: string | null) => {
    sobrietyDate.value = date;
    if (date) {
      localStorage.setItem('aa-sobrietyDate', date);
    } else {
      localStorage.removeItem('aa-sobrietyDate');
    }
  };

  // Computed properties
  const sobrietyDays = computed(() => {
    if (!sobrietyDate.value) return null;
    const start = new Date(sobrietyDate.value);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - start.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  });

  const sobrietyYearsMonthsDays = computed(() => {
    if (!sobrietyDays.value) return null;
    const days = sobrietyDays.value;
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remainingDays = days % 30;
    return { years, months, days: remainingDays };
  });

  const isMilestone = computed(() => {
    if (!sobrietyDays.value) return false;
    const days = sobrietyDays.value;
    // Check for common milestones: 30, 60, 90, 180, 365, 730, 1095, etc.
    const milestones = [30, 60, 90, 180, 365, 730, 1095, 1825];
    return milestones.includes(days);
  });

  return {
    // State
    theme,
    fontSize,
    sobrietyDate,
    // Methods
    loadPreferences,
    setTheme,
    setFontSize,
    setSobrietyDate,
    // Computed
    sobrietyDays,
    sobrietyYearsMonthsDays,
    isMilestone,
  };
});

