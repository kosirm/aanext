<template>
  <q-page class="help-page">
    <section class="hero-section">
      <div class="hero-content">
        <h1>Pomoć</h1>
        <p>Odgovori na česta pitanja</p>
      </div>
    </section>

    <section class="content-section">
      <div class="section-container">
        <h2>Česta pitanja</h2>

        <q-expansion-item
          v-for="(item, index) in faqItems"
          :key="index"
          :label="item.question"
          header-class="text-primary"
          class="faq-item"
        >
          <p>{{ item.answer }}</p>
        </q-expansion-item>
      </div>
    </section>

    <section class="content-section">
      <div class="section-container">
        <h2>Kontaktirajte nas</h2>
        <p>Ako ne možete pronaći odgovor, slobodno nas kontaktirajte:</p>

        <div class="contact-grid">
          <div class="contact-item">
            <q-icon name="phone" size="2rem" color="primary" />
            <h4>Telefon</h4>
            <a href="tel:+385123456789">+385 1 2345 6789</a>
          </div>
          <div class="contact-item">
            <q-icon name="email" size="2rem" color="primary" />
            <h4>Email</h4>
            <a href="mailto:info@aahrvatska.org">info@aahrvatska.org</a>
          </div>
          <div class="contact-item">
            <q-icon name="chat" size="2rem" color="primary" />
            <h4>WhatsApp</h4>
            <a href="https://wa.me/385123456789">Pošalji poruku</a>
          </div>
        </div>
      </div>
    </section>

    <section class="content-section">
      <div class="section-container">
        <h2>Tehnička pomoć</h2>
        <div class="tech-help">
          <h3>Aplikacija ne radi kako treba?</h3>
          <p>Pokušajte sljedeće:</p>
          <ul>
            <li>Osvježite stranicu (F5 ili Ctrl+R)</li>
            <li>Obriši cache aplikacije (idite na Resetiraj aplikaciju)</li>
            <li>Pokušajte u drugom pregledniku</li>
            <li>Kontaktirajte nas ako problem persists</li>
          </ul>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
const faqItems = [
  {
    question: 'Što je AA?',
    answer:
      'AA je svjetska zajednica muškaraca i žena koji dijele iskustvo, snagu i nadu u oporavku od alkoholizma.',
  },
  {
    question: 'Kako se pridružiti AA-u?',
    answer:
      'Možete se pridružiti bilo kojem sastanku AA-a. Nema članarina ili naknada. Jedini uvjet je želja da prestanete piti.',
  },
  {
    question: 'Je li AA besplatan?',
    answer:
      'Da, AA je potpuno besplatan. Nema članarina ili naknada. Ako želite, možete donirati mali iznos za održavanje sastanaka.',
  },
  {
    question: 'Kako funkcionira anonimnost?',
    answer:
      'Anonimnost je temelj AA-a. Ono što se čuje u AA-u, ostaje u AA-u. Vaša privatnost je zaštićena.',
  },
  {
    question: 'Mogu li doći na sastanak ako nisam siguran?',
    answer:
      'Apsolutno! Možete doći na bilo koji sastanak i samo slušati. Nema obaveze da govorite ili se predstavljate.',
  },
  {
    question: 'Kako mogu pronaći sastanak blizu mene?',
    answer:
      'Pogledajte stranicu Informacije ili nas kontaktirajte. Rado ćemo vam pomoći pronaći sastanak.',
  },
];
</script>

<style scoped lang="scss">
.help-page {
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
  max-width: 900px;
  margin: 0 auto;
}

h2 {
  font-size: var(--font-size-2xl);
  margin: 0 0 var(--spacing-lg) 0;
}

h3 {
  font-size: var(--font-size-lg);
  margin: var(--spacing-lg) 0 var(--spacing-md) 0;
}

p {
  line-height: 1.8;
  margin-bottom: var(--spacing-md);
}

.faq-item {
  margin-bottom: var(--spacing-md);

  :deep(.q-expansion-item__header) {
    padding: var(--spacing-md);
  }

  p {
    padding: var(--spacing-md);
  }
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
}

.contact-item {
  text-align: center;
  padding: var(--spacing-lg);
  background-color: var(--bg-secondary);
  border-radius: var(--radius-lg);

  h4 {
    margin: var(--spacing-md) 0;
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
}

.tech-help {
  background-color: var(--bg-secondary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);

  ul {
    margin: var(--spacing-md) 0;
    padding-left: var(--spacing-lg);

    li {
      margin-bottom: var(--spacing-sm);
      line-height: 1.6;
    }
  }
}
</style>

