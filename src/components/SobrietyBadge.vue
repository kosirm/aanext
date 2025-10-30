<template>
  <div v-if="badgeText" class="sobriety-badge-container" @click="navigateToSobriety">
    <div class="sobriety-badge">
      <div class="badge-text">{{ badgeText }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserPreferencesStore } from 'src/stores/userPreferences';
import { useSobrietyCalculator } from 'src/composables/useSobrietyCalculator';

const router = useRouter();
const route = useRoute();
const userPreferences = useUserPreferencesStore();
const { calculateDuration, getBadgeText } = useSobrietyCalculator();

const badgeText = computed(() => {
  if (!userPreferences.sobrietyDate) return '';

  const duration = calculateDuration(userPreferences.sobrietyDate);
  if (!duration) return '';

  return getBadgeText(duration);
});

const navigateToSobriety = async () => {
  // If we're already on o-nama page, scroll to sobriety section
  if (route.path === '/o-nama') {
    const element = document.getElementById('sobriety');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else {
    // Navigate to o-nama page with hash
    await router.push('/o-nama#sobriety');
  }
};
</script>

<style scoped lang="scss">
.sobriety-badge-container {
  display: inline-block;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
}

.sobriety-badge {
  background: transparent;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.badge-text {
  display: flex;
  align-items: center;
  gap: 4px;
}

@media (max-width: 600px) {
  .sobriety-badge {
    font-size: 11px;
    padding: 3px 10px;
  }
}
</style>

