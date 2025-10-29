<template>
  <div class="theme-manager">
    <!-- Light/Dark Mode Toggle -->
    <div class="mode-toggle">
      <q-btn-toggle
        v-model="userPreferences.themeMode"
        toggle-color="primary"
        :options="[
          { label: 'Svijetla', value: 'light', icon: 'light_mode' },
          { label: 'Tamna', value: 'dark', icon: 'dark_mode' },
        ]"
        @update:model-value="userPreferences.setThemeMode"
        class="full-width"
      />
    </div>

    <!-- Theme Selection -->
    <div class="themes-grid">
      <q-card
        v-for="theme in themes"
        :key="theme.id"
        :class="['theme-card', { 'selected': userPreferences.themeName === theme.id }]"
        clickable
        @click="selectTheme(theme.id)"
      >
        <q-card-section class="theme-header">
          <div class="theme-name">{{ theme.name }}</div>
          <q-icon
            v-if="userPreferences.themeName === theme.id"
            name="check_circle"
            color="primary"
            size="sm"
          />
        </q-card-section>

        <q-card-section class="theme-preview">
          <div class="color-swatches">
            <div
              v-for="(color, key) in getCurrentColors(theme)"
              :key="key"
              :style="{ backgroundColor: color }"
              class="color-swatch"
              :title="key"
            />
          </div>
        </q-card-section>

        <q-card-section class="theme-description">
          <div class="text-caption text-grey-7">{{ theme.description }}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserPreferencesStore } from 'src/stores/userPreferences';
import { themes, type ThemeInfo } from 'src/config/themes';

const userPreferences = useUserPreferencesStore();

const getCurrentColors = (theme: ThemeInfo) => {
  return userPreferences.themeMode === 'light' ? theme.lightColors : theme.darkColors;
};

const selectTheme = (themeId: string) => {
  userPreferences.setThemeName(themeId);
};
</script>

<style scoped lang="scss">
.theme-manager {
  padding: var(--spacing-md, 16px);
}

.mode-toggle {
  margin-bottom: var(--spacing-lg, 24px);
  
  :deep(.q-btn-toggle) {
    width: 100%;
    border-radius: var(--radius-md, 8px);
  }
}

.themes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-md, 16px);
}

.theme-card {
  border: 2px solid transparent;
  transition: all var(--transition-base, 250ms ease-in-out);
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1));
  }
  
  &.selected {
    border-color: var(--color-primary, #1976d2);
    box-shadow: var(--shadow-lg, 0 10px 20px rgba(0, 0, 0, 0.15));
  }
}

.theme-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md, 16px);
  padding-bottom: var(--spacing-sm, 8px);
}

.theme-name {
  font-size: var(--font-size-lg, 18px);
  font-weight: var(--font-weight-medium, 500);
  color: var(--color-text, #212121);
}

.theme-preview {
  padding: var(--spacing-md, 16px);
  padding-top: 0;
  padding-bottom: var(--spacing-sm, 8px);
}

.color-swatches {
  display: flex;
  gap: var(--spacing-xs, 4px);
  height: 48px;
  border-radius: var(--radius-sm, 4px);
  overflow: hidden;
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.12));
}

.color-swatch {
  flex: 1;
  transition: transform var(--transition-fast, 150ms ease-in-out);
  
  &:hover {
    transform: scaleY(1.1);
  }
}

.theme-description {
  padding: var(--spacing-md, 16px);
  padding-top: 0;
  min-height: 40px;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .themes-grid {
    grid-template-columns: 1fr;
  }
  
  .mode-toggle {
    :deep(.q-btn-toggle) {
      .q-btn {
        font-size: var(--font-size-sm, 14px);
      }
    }
  }
}
</style>

