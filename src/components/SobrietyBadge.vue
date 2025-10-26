<template>
  <div class="sobriety-badge-container">
    <div class="sobriety-badge" :class="{ milestone: userPreferences.isMilestone }">
      <div class="badge-content">
        <div class="badge-label">Moji dani trijeznosti</div>
        <div class="badge-value">
          <span v-if="userPreferences.sobrietyYearsMonthsDays">
            {{ userPreferences.sobrietyYearsMonthsDays.years }}g
            {{ userPreferences.sobrietyYearsMonthsDays.months }}m
            {{ userPreferences.sobrietyYearsMonthsDays.days }}d
          </span>
          <span v-else>-</span>
        </div>
        <div class="badge-total">
          {{ userPreferences.sobrietyDays }} dana
        </div>
      </div>
      <q-btn
        flat
        dense
        round
        size="sm"
        icon="close"
        @click="clearSobrietyDate"
        class="badge-close"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserPreferencesStore } from 'src/stores/userPreferences';

const userPreferences = useUserPreferencesStore();

const clearSobrietyDate = () => {
  userPreferences.setSobrietyDate(null);
};
</script>

<style scoped lang="scss">
.sobriety-badge-container {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: rgba(0, 0, 0, 0.1);
}

.sobriety-badge {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  transition: all 0.3s ease;

  &.milestone {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.1));
    border-color: rgba(255, 215, 0, 0.4);
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.2);
  }
}

.badge-content {
  flex: 1;
}

.badge-label {
  font-size: var(--font-size-xs);
  opacity: 0.9;
  margin-bottom: 2px;
}

.badge-value {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: 2px;
}

.badge-total {
  font-size: var(--font-size-sm);
  opacity: 0.8;
}

.badge-close {
  color: white;
  opacity: 0.7;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
}
</style>

