<template>
  <q-page class="o-nama-page">
    <section id="header" class="hero-section">
      <div class="hero-content">
        <h1>O nama</h1>
        <p>Saznajte više o AA zajednici</p>
      </div>
    </section>

    <section id="calculator" class="content-section">
      <div class="section-container">
        <h2>Kalkulator trijeznosti</h2>
        <div class="calculator-card">
          <q-input
            v-model="sobrietyDate"
            type="date"
            label="Datum početka trijeznosti"
            outlined
          />
          <div v-if="sobrietyDate" class="results">
            <div class="result-item">
              <span class="label">Godina:</span>
              <span class="value">{{ years }}</span>
            </div>
            <div class="result-item">
              <span class="label">Mjeseci:</span>
              <span class="value">{{ months }}</span>
            </div>
            <div class="result-item">
              <span class="label">Dani:</span>
              <span class="value">{{ days }}</span>
            </div>
            <div class="result-item total">
              <span class="label">Ukupno dana:</span>
              <span class="value">{{ totalDays }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="prayer" class="content-section">
      <div class="section-container">
        <h2>Molitva spokoja</h2>
        <div class="prayer-card">
          <p>
            Bože, daj mi mir da prihvatim ono što ne mogu promijeniti,
            snagu da promijenim ono što mogu,
            i mudrost da razlikujem jedno od drugoga.
          </p>
        </div>
      </div>
    </section>

    <section id="news" class="content-section">
      <div class="section-container">
        <h2>Vijesti</h2>
        <div class="news-list">
          <div v-for="(news, index) in newsList" :key="index" class="news-item">
            <h4>{{ news.title }}</h4>
            <p>{{ news.content }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="links" class="content-section">
      <div class="section-container">
        <h2>Korisni linkovi</h2>
        <div class="links-grid">
          <a
            v-for="(link, index) in linksList"
            :key="index"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="link-card"
          >
            <q-icon :name="link.icon" size="2rem" />
            <span>{{ link.title }}</span>
          </a>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const sobrietyDate = ref('');

const years = computed(() => {
  if (!sobrietyDate.value) return 0;
  const start = new Date(sobrietyDate.value);
  const today = new Date();
  return Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365));
});

const months = computed(() => {
  if (!sobrietyDate.value) return 0;
  const start = new Date(sobrietyDate.value);
  const today = new Date();
  const days = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.floor((days % 365) / 30);
});

const days = computed(() => {
  if (!sobrietyDate.value) return 0;
  const start = new Date(sobrietyDate.value);
  const today = new Date();
  const days = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return days % 30;
});

const totalDays = computed(() => {
  if (!sobrietyDate.value) return 0;
  const start = new Date(sobrietyDate.value);
  const today = new Date();
  return Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
});

const newsList = [
  {
    title: 'Vijest 1',
    content: 'Sadržaj vijesti...',
  },
  {
    title: 'Vijest 2',
    content: 'Sadržaj vijesti...',
  },
];

const linksList = [
  { title: 'AA Svjetski', url: 'https://www.aa.org', icon: 'language' },
  { title: 'AA Europa', url: 'https://www.aa.org.uk', icon: 'language' },
];
</script>

<style scoped lang="scss">
.o-nama-page {
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

.calculator-card {
  background-color: var(--bg-secondary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  max-width: 400px;

  .results {
    margin-top: var(--spacing-lg);
    display: grid;
    gap: var(--spacing-md);
  }

  .result-item {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-md);
    background-color: var(--bg-primary);
    border-radius: var(--radius-md);

    .label {
      font-weight: 600;
    }

    .value {
      color: var(--color-primary);
      font-weight: 700;
      font-size: var(--font-size-lg);
    }

    &.total {
      background-color: var(--color-primary);
      color: white;

      .value {
        color: white;
      }
    }
  }
}

.prayer-card {
  background-color: var(--bg-secondary);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  border-left: 4px solid var(--color-primary);
  font-style: italic;
  line-height: 1.8;

  p {
    margin: 0;
  }
}

.news-list {
  display: grid;
  gap: var(--spacing-lg);
}

.news-item {
  background-color: var(--bg-secondary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);

  h4 {
    margin: 0 0 var(--spacing-md) 0;
  }

  p {
    margin: 0;
    color: var(--text-secondary);
  }
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
}

.link-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  background-color: var(--bg-secondary);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-primary);
    color: white;
    transform: translateY(-4px);
  }

  span {
    margin-top: var(--spacing-md);
    text-align: center;
    font-weight: 600;
  }
}
</style>

