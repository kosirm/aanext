<template>
  <q-dialog v-model="isOpen" class="sobriety-calculator-dialog">
    <q-card class="sobriety-calculator-card">
      <q-card-section class="calculator-header">
        <div class="text-h6">Kalkulator trijeznosti</div>
        <q-btn flat round dense icon="close" @click="closeDialog" />
      </q-card-section>

      <q-card-section class="calculator-content">
        <div class="form-section">
          <q-input
            v-model="formData.name"
            label="Tvoje ime"
            outlined
            dense
            :rules="[(val) => !!val || 'Ime je obavezno']"
            class="input-field"
          />

          <q-input
            v-model="formData.firstDay"
            type="date"
            label="Prvi dan trijeznosti"
            outlined
            dense
            :rules="[(val) => !!val || 'Datum je obavezan']"
            class="input-field"
          />

          <div class="coin-selector">
            <div class="coin-label">Odaberi stil medalje:</div>
            <div class="coin-options">
              <div
                v-for="coinType in coinTypes"
                :key="coinType.value"
                class="coin-option"
                :class="{ selected: formData.coinType === coinType.value }"
                @click="formData.coinType = coinType.value"
              >
                <img
                  :src="`/assets/coins/${coinType.value}/years_1.webp`"
                  :alt="coinType.label"
                  class="coin-preview"
                />
                <div class="coin-name">{{ coinType.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="calculator-actions">
        <q-btn
          v-if="userPreferences.hasSobrietyData"
          flat
          label="Obriši podatke"
          color="negative"
          @click="clearData"
        />
        <q-btn flat label="Odustani" @click="closeDialog" />
        <q-btn
          unelevated
          label="Spremi"
          color="primary"
          @click="saveData"
          :disable="!isFormValid"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useUserPreferencesStore } from 'src/stores/userPreferences';
import { useQuasar } from 'quasar';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const $q = useQuasar();
const userPreferences = useUserPreferencesStore();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const formData = ref({
  name: '',
  firstDay: '',
  coinType: 'godine_bronza',
});

const coinTypes = [
  { value: 'godine_bronza', label: 'Bronza' },
  { value: 'godine_stablo', label: 'Stablo' },
  { value: 'godine_stablo_crvena', label: 'Stablo Crvena' },
  { value: 'godine_stablo_plava', label: 'Stablo Plava' },
  { value: 'godine_rijeka', label: 'Rijeka' },
  { value: 'godine_rosie', label: 'Rosie' },
];

const isFormValid = computed(() => {
  return formData.value.name.trim() !== '' && formData.value.firstDay !== '';
});

// Load existing data when dialog opens
watch(isOpen, (newValue) => {
  if (newValue) {
    if (userPreferences.sobrietyName && userPreferences.sobrietyDate) {
      formData.value.name = userPreferences.sobrietyName;
      formData.value.firstDay = userPreferences.sobrietyDate;
      formData.value.coinType = userPreferences.sobrietyCoinType;
    }
  }
});

const saveData = () => {
  if (!isFormValid.value) return;

  userPreferences.setSobrietyData(
    formData.value.name,
    formData.value.firstDay,
    formData.value.coinType
  );

  $q.notify({
    message: 'Podaci su spremljeni!',
    color: 'positive',
    position: 'top',
    timeout: 2000,
  });

  closeDialog();
};

const clearData = () => {
  $q.dialog({
    title: 'Potvrda',
    message: 'Jesi li siguran da želiš obrisati sve podatke o trijeznosti?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    userPreferences.clearSobrietyData();
    formData.value.name = '';
    formData.value.firstDay = '';
    formData.value.coinType = 'godine_bronza';

    $q.notify({
      message: 'Podaci su obrisani',
      color: 'info',
      position: 'top',
      timeout: 2000,
    });

    closeDialog();
  });
};

const closeDialog = () => {
  isOpen.value = false;
};
</script>

<style scoped lang="scss">
// Calculator Modal - centered with spacing around
:deep(.sobriety-calculator-dialog) {
  .q-dialog__backdrop {
    background-color: rgba(0, 0, 0, 0.4) !important;
  }
}

.sobriety-calculator-card {
  max-width: 900px;
  max-height: calc(100vh - 100px);
  margin: 50px;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    margin: 50px 20px;
    max-height: calc(100vh - 100px);
  }
}

.calculator-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border);
}

.calculator-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px 20px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.input-field {
  width: 100%;
}

.coin-selector {
  margin-top: 8px;
}

.coin-label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
  color: var(--color-text-primary);
}

.coin-options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
}

.coin-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: var(--color-surface);

  &:hover {
    border-color: var(--color-primary);
    transform: translateY(-2px);
  }

  &.selected {
    border-color: var(--color-primary);
    background-color: var(--color-primary-light, rgba(25, 118, 210, 0.1));
  }
}

.coin-preview {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 8px;
}

.coin-name {
  font-size: 12px;
  text-align: center;
  color: var(--color-text-secondary);
}

.calculator-actions {
  padding: 16px 20px;
  border-top: 1px solid var(--color-border);
}

@media (max-width: 600px) {
  .sobriety-calculator-card {
    max-height: 100vh;
  }

  .coin-options {
    grid-template-columns: repeat(2, 1fr);
  }

  .coin-preview {
    width: 60px;
    height: 60px;
  }
}
</style>

