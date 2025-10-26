<template>
  <q-page class="index-page">
    <!-- Hero Section -->
    <section id="hero" class="hero-section">
      <div class="hero-content">
        <h1>Anonimni Alkoholičari</h1>
        <p>Dobrodošli na stranicu AA Hrvatske</p>
        <q-btn
          color="primary"
          label="Saznaj više"
          size="lg"
          to="#problem"
        />
      </div>
    </section>

    <!-- Problem Section -->
    <section id="problem" class="content-section">
      <div class="section-container">
        <h2>Imate problem s alkoholom?</h2>
        <div class="section-content">
          <div class="text-content">
            <p>
              Ako ste se ikada zapitali je li vaša konzumacija alkohola postala problem,
              možda ste na mjestu gdje trebate pomoć.
            </p>
            <p>
              AA je zajednica ljudi koji dijele iskustvo, snagu i nadu u oporavku od alkoholizma.
            </p>
          </div>
          <div class="video-content">
            <video
              ref="videoPlayer"
              class="video-player"
              controls
              :poster="`/videos/imam_nadu_thumbnail.jpg`"
              @ended="resetVideo"
            >
              <source src="/videos/imam_nadu.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>

    <!-- Shortcuts Carousel -->
    <section id="shortcuts" class="carousel-section" data-carousel>
      <div class="section-container">
        <h2>Brzi pristup</h2>
        <ResponsiveCarousel
          :min-item-width="280"
          :max-item-width="300"
          :gap="16"
          :item-height="280"
          :dot-size="24"
          dot-inactive-color="var(--text-secondary)"
          dot-active-color="#000000"
        >
          <div
            v-for="(card, index) in shortcutCards"
            :key="index"
            class="shortcut-card"
          >
            <div class="card-content">
              <q-icon :name="card.icon" size="3rem" color="primary" />
              <h3>{{ card.title }}</h3>
              <p>{{ card.description }}</p>
              <q-btn
                flat
                color="primary"
                :label="card.buttonLabel"
                :to="card.link"
              />
            </div>
          </div>
        </ResponsiveCarousel>
      </div>
    </section>

    <!-- Meetings Section -->
    <section id="meetings" class="content-section">
      <div class="section-container">
        <h2>Sastanci</h2>
        <p>Pronađite sastanak blizu vas ili se pridružite online sastanku.</p>
        <q-btn
          color="primary"
          label="Zoom sastanci"
          icon="video_call"
          size="lg"
        />
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="content-section">
      <div class="section-container">
        <h2>Kontakt</h2>
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
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ResponsiveCarousel from 'src/components/ResponsiveCarousel.vue';

const videoPlayer = ref<HTMLVideoElement | null>(null);

const resetVideo = () => {
  if (videoPlayer.value) {
    videoPlayer.value.currentTime = 0;
  }
};

const shortcutCards = [
  {
    icon: 'info',
    title: 'Informacije',
    description: 'Saznajte više o AA-u',
    buttonLabel: 'Pročitaj',
    link: '/informacije',
  },
  {
    icon: 'library_books',
    title: 'Literatura',
    description: 'Pristupite našoj knjižnici',
    buttonLabel: 'Čitaj',
    link: '/literatura',
  },
  {
    icon: 'people',
    title: 'O nama',
    description: 'Upoznajte našu zajednicu',
    buttonLabel: 'Saznaj',
    link: '/o-nama',
  },
  {
    icon: 'help',
    title: 'Pomoć',
    description: 'Trebate pomoć?',
    buttonLabel: 'Kontaktiraj',
    link: '/help',
  },
  {
    icon: 'video_call',
    title: 'Zoom Sastanci',
    description: 'Pridružite se online',
    buttonLabel: 'Priključi se',
    link: '/informacije',
  },
  {
    icon: 'location_on',
    title: 'Pronađi Sastanak',
    description: 'Lokalni sastanci',
    buttonLabel: 'Pretraži',
    link: '/informacije',
  },
  {
    icon: 'phone',
    title: 'Kontaktiraj Nas',
    description: 'Pozovi nas sada',
    buttonLabel: 'Pozovi',
    link: '/help',
  },
  {
    icon: 'mail',
    title: 'Pošalji Poruku',
    description: 'Kontaktiraj nas',
    buttonLabel: 'Pošalji',
    link: '/help',
  },
];
</script>

<style scoped lang="scss">
.index-page {
  padding: 0;
}

.hero-section {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  padding: var(--spacing-2xl);
  text-align: center;
  min-height: 400px;
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
    margin: 0 0 var(--spacing-lg) 0;
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

.section-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  margin-top: var(--spacing-lg);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.text-content {
  p {
    margin-bottom: var(--spacing-md);
    line-height: 1.6;
  }
}

.video-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
}

.video-player {
  width: 100%;
  max-width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-lg);
  background-color: #000;
}

.carousel-section {
  padding: var(--spacing-2xl) var(--spacing-lg);
  background-color: var(--bg-secondary);

  .section-container {
    max-width: 100%;
  }
}

.shortcut-card {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--carousel-item-height, 280px);
  width: var(--carousel-item-width, 280px);
  min-width: var(--carousel-item-width, 280px);
  max-width: var(--carousel-item-width, 280px);
  flex-shrink: 0;
}

.card-content {
  text-align: center;
  padding: var(--spacing-lg);
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
  overflow-wrap: break-word;

  h3 {
    margin: var(--spacing-md) 0;
    font-size: var(--font-size-lg);
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  p {
    margin: 0 0 var(--spacing-md) 0;
    color: var(--text-secondary);
    word-wrap: break-word;
    overflow-wrap: break-word;
    flex-grow: 1;
    display: flex;
    align-items: center;
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

h2 {
  font-size: var(--font-size-2xl);
  margin: 0 0 var(--spacing-md) 0;
}
</style>
