<template>
  <q-page class="index-page">
    <!-- Hero Section -->
    <section id="hero" class="hero-section mbr-parallax-background" style="background-image: url('/assets/images/header.webp');">
      <div class="mbr-overlay" style="opacity: 0.5; background-color: rgb(9, 57, 89);"></div>
      <div class="hero-content q-pa-xl text-white text-center">
        <h1 class="text-h1 q-mb-md header-title">
          <strong>Anonimni Alkoholičari Hrvatske</strong>
        </h1>
        <p class="text-h4 q-mb-lg">Grupa Prvi Korak Osijek</p>
        <p class="text-italic text-h5 q-mb-xl">Dovedi tijelo i um će ga slijediti.</p>
        <q-btn
          color="primary"
          label="Sastanci"
          size="lg"
          to="#sastanci"
          class="q-px-xl"
        />
      </div>
    </section>

    <!-- Problem Section -->
    <section id="problem" class="content-section q-pa-lg bg-white">
      <div class="container">
        <div class="row items-center">
          <!-- Video on the left -->
          <div class="col-12 col-md-6 q-pa-md">
            <video
              ref="videoPlayer"
              class="video-player full-width"
              controls
              :poster="`/videos/imam_nadu_thumbnail.jpg`"
              @ended="resetVideo"
            >
              <source src="/videos/imam_nadu.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <!-- Text content on the right -->
          <div class="col-12 col-md-6 q-pa-md">
            <h2 class="text-h3 text-weight-bold q-mb-md">
              <strong>Imate problem s alkoholom? Postoji rješenje.</strong>
            </h2>
            <p class="text-h6 q-mb-lg">
              A.A. ima jednostavan program koji djeluje. Temelji se na tome da jedan alkoholičar pomaže drugome.
            </p>
            <q-btn
              color="primary"
              label="Saznaj više"
              size="lg"
              to="/informacije"
              class="q-px-xl"
            />
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
    <section id="sastanci" class="content-section q-pa-lg bg-grey-2">
      <div class="container">
        <div class="row">
          <!-- Text content - left on desktop, bottom on mobile -->
          <div class="col-12 col-md-6 q-pa-md sastanci-text">
            <h2 class="sastanci text-weight-bold q-mb-md">
              <strong>Sastanci</strong>
            </h2>
            <p class="text-h6 q-mb-lg">
              Pošto se u vrijeme korone sastanci nisu mogli održavati uživo, naša grupa je počela sa sastancima <strong>online</strong> pomoću aplikacije <strong>ZOOM</strong>.<br><br>
              Sastanci naše grupe se održavaju:<br>
              <strong>Utorak: 18:45</strong><br>
              <strong>Četvrtak: 18:45</strong><br>
              <strong>Subota: 09:00</strong><br><br>
              Za spajanje na sastanke kliknite na gumb "Otvori Zoom" kada se želite pridružiti.
            </p>
            <q-btn
              color="primary"
              label="Otvori Zoom"
              icon-right="launch"
              size="lg"
              href="https://us02web.zoom.us/j/74310661095?pwd=SWxOL3Z0RFBtR2g0cUYyRExBc2FBZz09"
              target="_blank"
              class="q-px-xl"
            />
          </div>

          <!-- Image - right on desktop, top on mobile -->
          <div class="col-12 col-md-6 q-pa-md sastanci-image">
            <div class="flex flex-center">
              <img
                src="assets/images/zoom.webp"
                alt="Sastanci se održavaju online"
                style="max-width: 100%; max-height: 400px; width: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="content-section q-pa-lg">
      <div class="container">
        <div class="row justify-center q-mb-lg">
          <div class="col-12 text-center">
            <hr class="q-my-lg" style="border-top: 1px solid #ddd; width: 100%;">
            <h2 class="kontakt text-weight-bold q-my-lg">Kontakt</h2>
            <hr class="q-my-lg" style="border-top: 1px solid #ddd; width: 100%;">
          </div>
        </div>

        <div class="row q-col-gutter-md">
          <!-- Phone -->
          <div class="col-12 col-md-4 text-center q-pa-md">
            <div class="contact-item">
              <q-btn
                round
                color="primary"
                icon="phone"
                size="lg"
                href="tel:+385955041511"
                class="q-mb-sm"
              />
              <h4 class="text-h6 text-weight-bold q-my-sm">Telefon</h4>
              <a href="tel:+385955041511" class="text-primary text-h6">+385 95 504 15 11</a>
            </div>
          </div>

          <!-- WhatsApp -->
          <div class="col-12 col-md-4 text-center q-pa-md">
            <div class="contact-item">
              <q-btn
                round
                color="primary"
                icon="chat"
                size="lg"
                href="https://api.whatsapp.com/send?phone=385955041511"
                class="q-mb-sm"
              />
              <h4 class="text-h6 text-weight-bold q-my-sm">WhatsApp</h4>
              <a href="https://api.whatsapp.com/send?phone=385955041511" class="text-primary text-h6">Poziv / Chat / Video</a>
            </div>
          </div>

          <!-- Email -->
          <div class="col-12 col-md-4 text-center q-pa-md">
            <div class="contact-item">
              <q-btn
                round
                color="primary"
                icon="email"
                size="lg"
                href="mailto:info@aahrvatska.org"
                class="q-mb-sm"
              />
              <h4 class="text-h6 text-weight-bold q-my-sm">Email</h4>
              <a href="mailto:info@aahrvatska.org" class="text-primary text-h6">info@aahrvatska.org</a>
            </div>
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

  /* Hero Section Styles */
  /* Problem Section Styles */
  .content-section {
    padding: 5rem 0;

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .video-player {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      max-width: 100%;
      height: auto;
    }

    h2 {
      color: #333;
      margin-bottom: 1.5rem;
      line-height: 1.3;
    }

    p {
      color: #555;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .q-btn {
      font-size: 1.1rem;
      padding: 0.8rem 2rem;
      border-radius: 30px;
      text-transform: none;
      font-weight: 500;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      }
    }
  }

  /* Hero Section */
  .hero-section {
    position: relative;
    height: 600px; /* Fixed height */
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-position: center;
    color: white;
    text-align: center;
    padding: 2rem 1rem;

    .mbr-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }

    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;

      h1 {
        font-size: 3.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

        @media (max-width: 768px) {
          font-size: 2.5rem;
        }
      }

      .text-h4 {
        font-size: 2rem;
        margin-bottom: 1.5rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

        @media (max-width: 768px) {
          font-size: 1.5rem;
        }
      }

      .text-italic {
        font-style: italic;
        font-size: 1.5rem;
        margin-bottom: 3rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

        @media (max-width: 768px) {
          font-size: 1.25rem;
        }
      }

      .q-btn {
        font-size: 1.2rem;
        padding: 0.8rem 2rem;
        border-radius: 30px;
        text-transform: none;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
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
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
}

.contact-item {
  text-align: center;
  padding: 2rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
}

.contact-item:hover {
  transform: translateY(-5px);
}

.contact-item .q-btn {
  width: 60px;
  height: 60px;
  font-size: 24px;
}

.contact-item h4 {
  margin: 1rem 0 0.5rem;
  color: #333;
}

.contact-item a {
  color: var(--q-primary);
  text-decoration: none;
  font-weight: 500;
  word-break: break-word;
}

.contact-item a:hover {
  text-decoration: underline;
}

/* Existing styles */
h2 {
  font-size: var(--font-size-2xl);
  margin: 0 0 var(--spacing-md) 0;
}

.kontakt {
  font-size: var(--font-size-4xl);
  color: var(--q-primary);
}

.sastanci {
  font-size: var(--font-size-4xl);
  color: var(--q-primary);
}

/* Sastanci section layout: image on top on mobile, on right on desktop/tablet */
@media (max-width: 767px) {
  .sastanci-image {
    order: 1;
  }
  .sastanci-text {
    order: 2;
  }
}

@media (max-width: 768px) {
  .header-title {
    line-height: 1.2;
  }
}
</style>
