import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserPreferencesStore = defineStore('userPreferences', () => {
  // State
  const themeMode = ref<'light' | 'dark'>('light');
  const themeName = ref<string>('default');
  const fontSize = ref<'small' | 'normal' | 'large'>('normal');
  const sobrietyDate = ref<string | null>(null);
  const sobrietyName = ref<string | null>(null);
  const sobrietyCoinType = ref<string>('godine_bronza');

  // Load from localStorage on initialization
  const loadPreferences = () => {
    const savedThemeMode = localStorage.getItem('aa-themeMode') as 'light' | 'dark' | null;
    const savedThemeName = localStorage.getItem('aa-themeName');
    const savedFontSize = localStorage.getItem('aa-fontSize') as 'small' | 'normal' | 'large' | null;
    const savedSobrietyDate = localStorage.getItem('aa-sobrietyDate');
    const savedSobrietyName = localStorage.getItem('aa-sobrietyName');
    const savedSobrietyCoinType = localStorage.getItem('aa-sobrietyCoinType');

    if (savedThemeMode) themeMode.value = savedThemeMode;
    if (savedThemeName) themeName.value = savedThemeName;
    if (savedFontSize) fontSize.value = savedFontSize;
    if (savedSobrietyDate) sobrietyDate.value = savedSobrietyDate;
    if (savedSobrietyName) sobrietyName.value = savedSobrietyName;
    if (savedSobrietyCoinType) sobrietyCoinType.value = savedSobrietyCoinType;

    // Apply theme on load
    applyTheme();
  };

  // Apply theme to document
  const applyTheme = () => {
    document.documentElement.setAttribute('data-theme', themeName.value);
    document.documentElement.setAttribute('data-mode', themeMode.value);
  };

  // Setters with localStorage persistence
  const setThemeMode = (newMode: 'light' | 'dark') => {
    themeMode.value = newMode;
    localStorage.setItem('aa-themeMode', newMode);
    applyTheme();
  };

  const setThemeName = (newTheme: string) => {
    themeName.value = newTheme;
    localStorage.setItem('aa-themeName', newTheme);
    applyTheme();
  };

  const toggleThemeMode = () => {
    setThemeMode(themeMode.value === 'light' ? 'dark' : 'light');
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

  const setSobrietyName = (name: string | null) => {
    sobrietyName.value = name;
    if (name) {
      localStorage.setItem('aa-sobrietyName', name);
    } else {
      localStorage.removeItem('aa-sobrietyName');
    }
  };

  const setSobrietyCoinType = (coinType: string) => {
    sobrietyCoinType.value = coinType;
    localStorage.setItem('aa-sobrietyCoinType', coinType);
  };

  const setSobrietyData = (name: string, date: string, coinType: string) => {
    setSobrietyName(name);
    setSobrietyDate(date);
    setSobrietyCoinType(coinType);
  };

  const clearSobrietyData = () => {
    sobrietyName.value = null;
    sobrietyDate.value = null;
    sobrietyCoinType.value = 'godine_bronza';
    localStorage.removeItem('aa-sobrietyName');
    localStorage.removeItem('aa-sobrietyDate');
    localStorage.removeItem('aa-sobrietyCoinType');
  };

  const hasSobrietyData = computed(() => {
    return !!(sobrietyName.value && sobrietyDate.value);
  });

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
    themeMode,
    themeName,
    fontSize,
    sobrietyDate,
    sobrietyName,
    sobrietyCoinType,
    // Methods
    loadPreferences,
    setThemeMode,
    setThemeName,
    toggleThemeMode,
    applyTheme,
    setFontSize,
    setSobrietyDate,
    setSobrietyName,
    setSobrietyCoinType,
    setSobrietyData,
    clearSobrietyData,
    // Computed
    sobrietyDays,
    sobrietyYearsMonthsDays,
    isMilestone,
    hasSobrietyData,
  };
});

