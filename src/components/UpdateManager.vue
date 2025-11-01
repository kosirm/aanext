<template>
  <q-dialog
    v-model="isOpen"
    class="update-manager-dialog"
  >
    <q-card class="update-manager-card">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Ažuriranje aplikacije</div>
        <q-space />
        <q-btn
          icon="close"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>

      <q-card-section>
        <!-- Version Info -->
        <div class="version-info q-mb-md">
          <div class="row items-center q-mb-sm">
            <div class="col">
              <div class="text-caption text-grey-7">Trenutna verzija</div>
              <div class="text-h6">v{{ currentVersion }}</div>
            </div>
            <div class="col text-right">
              <div class="text-caption text-grey-7">Najnovija verzija</div>
              <div class="text-h6" :class="updateAvailable ? 'text-primary' : ''">
                v{{ latestVersion }}
                <q-badge
                  v-if="updateAvailable"
                  color="primary"
                  class="q-ml-sm"
                >
                  Nova
                </q-badge>
              </div>
            </div>
          </div>

          <!-- Update Button -->
          <q-btn
            v-if="updateAvailable"
            color="primary"
            class="full-width q-mt-md"
            icon="system_update"
            label="Pokreni ažuriranje"
            @click="handleUpdate"
            :loading="isUpdating"
          />

          <!-- Up to date message -->
          <div
            v-else
            class="text-center q-pa-md bg-positive text-white rounded-borders"
          >
            <q-icon name="check_circle" size="sm" class="q-mr-sm" />
            Imate najnoviju verziju aplikacije.
          </div>

          <!-- Show changelog button -->
          <q-btn
            flat
            color="primary"
            class="full-width q-mt-sm"
            icon="history"
            label="Povijest ažuriranja"
            @click="handleShowChangelog"
            :loading="isCheckingForUpdate"
          />
        </div>

        <!-- Changelog (shown only after button click) -->
        <div v-if="showChangelog" class="changelog-section">
          <q-separator class="q-my-md" />

          <div class="text-subtitle1 q-mb-md">Povijest ažuriranja</div>

          <q-scroll-area
            style="height: 300px"
            :thumb-style="thumbStyle"
          >
            <q-timeline color="primary" class="timeline-offset">
              <q-timeline-entry
                v-for="update in updates"
                :key="update.version"
                :subtitle="formatDate(update.date)"
                icon="package_2"
              >
                <div class="text-subtitle2 q-mb-sm">{{ update.title }}</div>
                <ul class="changelog-list">
                  <li
                    v-for="(change, index) in update.changes"
                    :key="index"
                  >
                    {{ change }}
                  </li>
                </ul>
              </q-timeline-entry>
            </q-timeline>
          </q-scroll-area>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePWAUpdate } from 'src/composables/usePWAUpdate';

// Props
const props = defineProps<{
  modelValue: boolean;
}>();

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

// Local state
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const isUpdating = ref(false);
const showChangelog = ref(false);

// PWA Update composable
const {
  updateAvailable,
  currentVersion,
  latestVersion,
  changelog,
  isCheckingForUpdate,
  checkForUpdate,
  installUpdate,
} = usePWAUpdate();

// Computed
const updates = computed(() => {
  return changelog.value?.updates || [];
});

// Scroll area styling
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const thumbStyle: any = {
  right: '4px',
  borderRadius: '5px',
  backgroundColor: 'var(--color-primary)',
  width: '5px',
  opacity: 0.75,
};

// Methods
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('hr-HR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const handleUpdate = () => {
  isUpdating.value = true;
  try {
    installUpdate();
    // Page will reload automatically
  } catch (error) {
    console.error('Update failed:', error);
    isUpdating.value = false;
  }
};

const handleShowChangelog = async () => {
  // Load changelog if not already loaded
  if (!showChangelog.value) {
    await checkForUpdate();
  }
  showChangelog.value = true;
};
</script>

<style lang="scss" scoped>
.update-manager-dialog {
  :deep(.q-dialog__backdrop) {
    background-color: rgba(0, 0, 0, 0.5) !important;
  }
}

.update-manager-card {
  width: 100%;
  max-width: 600px;
  margin: 15px;
  max-height: calc(100vh - 30px);

  @media (max-width: 600px) {
    margin: 10px;
    max-height: calc(100vh - 20px);
  }
}

.version-info {
  background-color: var(--color-surface-alternate);
  padding: 16px;
  border-radius: 8px;
}

.changelog-section {
  .text-subtitle1 {
    font-weight: 600;
    color: var(--color-text-primary);
  }
}

.changelog-list {
  margin: 0;
  padding-left: 20px;
  color: var(--color-text-secondary);

  li {
    margin-bottom: 4px;
  }
}

:deep(.q-timeline__subtitle) {
  opacity: 0.7;
}

.timeline-offset {
  padding-left: 15px;
}
</style>

