<template>
  <q-page class="informacije-page">
    <section
      id="header"
      class="hero-section"
      v-touch-swipe.mouse.horizontal="handleSwipe"
    >
      <div class="hero-content">
        <h1>Informacije</h1>
        <p>Saznajte više o Anonimnim Alkoholičarima</p>
      </div>
    </section>

    <section id="about" class="content-section">
      <div class="section-container">
        <h2>O nama</h2>
        <p>AA je svjetska zajednica muškaraca i žena koji dijele iskustvo, snagu i nadu.</p>
      </div>
    </section>

    <section id="founding" class="content-section">
      <div class="section-container">
        <h2>Osnivanje AA-a</h2>
        <q-tabs v-model="foundingTab" dense class="text-primary">
          <q-tab name="history" label="Povijest" />
          <q-tab name="principles" label="Principi" />
          <q-tab name="steps" label="12 koraka" />
        </q-tabs>
        <q-tab-panels v-model="foundingTab" animated>
          <q-tab-panel name="history">
            <p>AA je osnovan 1935. godine...</p>
          </q-tab-panel>
          <q-tab-panel name="principles">
            <p>Principi AA-a su...</p>
          </q-tab-panel>
          <q-tab-panel name="steps">
            <p>12 koraka su...</p>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </section>

    <section id="anonymity" class="content-section">
      <div class="section-container">
        <h2>Anonimnost u AA-u</h2>
        <q-tabs v-model="anonymityTab" dense class="text-primary">
          <q-tab name="importance" label="Važnost" />
          <q-tab name="protection" label="Zaštita" />
          <q-tab name="traditions" label="Tradicije" />
        </q-tabs>
        <q-tab-panels v-model="anonymityTab" animated>
          <q-tab-panel name="importance">
            <p>Anonimnost je temelj AA-a...</p>
          </q-tab-panel>
          <q-tab-panel name="protection">
            <p>Vaša privatnost je zaštićena...</p>
          </q-tab-panel>
          <q-tab-panel name="traditions">
            <p>12 tradicija AA-a...</p>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </section>

    <section id="faq" class="content-section">
      <div class="section-container">
        <h2>Pitanja i odgovori</h2>
        <q-expansion-item
          v-for="(item, index) in faqItems"
          :key="index"
          :label="item.question"
          header-class="text-primary"
        >
          <p>{{ item.answer }}</p>
        </q-expansion-item>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePageNavigation } from 'src/composables/usePageNavigation';

// Page navigation
const { handleSwipe } = usePageNavigation();

const foundingTab = ref('history');
const anonymityTab = ref('importance');

const faqItems = [
  {
    question: 'Što je AA?',
    answer: 'AA je zajednica muškaraca i žena koji dijele iskustvo, snagu i nadu...',
  },
  {
    question: 'Kako se pridružiti?',
    answer: 'Možete se pridružiti bilo kojem sastanku AA-a...',
  },
  {
    question: 'Je li besplatno?',
    answer: 'AA je besplatan. Nema članarina ili naknada...',
  },
];
</script>

<style scoped lang="scss">
.informacije-page {
  padding: 0;
}

.hero-section {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  padding: var(--spacing-2xl);
  text-align: center;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  h1 {
    font-size: var(--font-size-4xl);
    margin: 0 0 var(--spacing-md) 0;
  }

  p {
    font-size: var(--font-size-lg);
    margin: 0;
    opacity: 0.9;
  }
}

.content-section {
  padding: var(--spacing-2xl) var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  font-size: var(--font-size-2xl);
  margin: 0 0 var(--spacing-lg) 0;
}

p {
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}
</style>

