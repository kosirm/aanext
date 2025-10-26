<template>
  <q-page class="privatnost-page">
    <section class="hero-section">
      <div class="hero-content">
        <h1>Politika privatnosti</h1>
      </div>
    </section>

    <section class="content-section">
      <div class="section-container">
        <h2>Zaštita vaših podataka</h2>
        <p>
          AA Hrvatska poštuje vašu privatnost. Ova politika objašnjava kako prikupljamo,
          koristimo i štitimo vaše podatke.
        </p>

        <h3>Prikupljanje podataka</h3>
        <p>
          Prikupljamo samo podatke koje nam dobrovoljno date, kao što su kontaktne informacije
          kada nas kontaktirate.
        </p>

        <h3>Korištenje podataka</h3>
        <p>
          Vaše podatke koristimo samo za komunikaciju s vama i poboljšanje naših usluga.
        </p>

        <h3>Zaštita podataka</h3>
        <p>
          Vaši podaci su zaštićeni najnovijim sigurnosnim mjerama.
        </p>

        <h3>Kolačići</h3>
        <p>
          Ova aplikacija koristi kolačiće za pohranu vaših postavki i preferencija.
        </p>

        <h3>Kontakt</h3>
        <p>
          Ako imate pitanja o privatnosti, kontaktirajte nas na
          <a href="mailto:info@aahrvatska.org">info@aahrvatska.org</a>
        </p>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
// No script needed
</script>

<style scoped lang="scss">
.privatnost-page {
  padding: 0;
}

.hero-section {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  padding: var(--spacing-2xl);
  text-align: center;
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  h1 {
    font-size: var(--font-size-4xl);
    margin: 0;
  }
}

.content-section {
  padding: var(--spacing-2xl) var(--spacing-lg);
}

.section-container {
  max-width: 900px;
  margin: 0 auto;
}

h2 {
  font-size: var(--font-size-2xl);
  margin: var(--spacing-xl) 0 var(--spacing-md) 0;
}

h3 {
  font-size: var(--font-size-lg);
  margin: var(--spacing-lg) 0 var(--spacing-md) 0;
}

p {
  line-height: 1.8;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);

  a {
    color: var(--color-primary);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>

