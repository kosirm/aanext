<template>
  <q-page class="o-nama-page">
    <section
      id="header"
      class="hero-section"
      v-touch-swipe.mouse.horizontal="handleSwipe"
    >
      <div class="hero-content">
        <h1>O nama</h1>
        <p>Saznajte više o AA zajednici</p>
      </div>
    </section>

    <!-- Moji dani trijeznosti section -->
    <section
      v-if="userPreferences.hasSobrietyData"
      id="sobriety"
      class="content-section sobriety-section"
      :class="{ 'celebration-mode': isCelebration }"
    >
      <div class="section-container">
        <!-- Section Title with decorative lines -->
        <div class="section-title-wrapper">
          <div class="title-line"></div>
          <h2 class="section-title">Moji dani trijeznosti</h2>
          <div class="title-line"></div>
        </div>

        <!-- Responsive Layout Container -->
        <div class="sobriety-content">
          <!-- Left Side: Greeting Section -->
          <div class="greeting-section">
            <!-- Greeting Card for Image Capture -->
            <div class="greeting-card" ref="greetingCardRef">
              <div class="greeting-header">
                <div class="greeting-title">Bravo, {{ userPreferences.sobrietyName }}!</div>
                <div class="greeting-main">
                  Danas imaš<br />
                  <span class="duration-text">{{ durationText }}</span><br />
                  trijeznosti!
                </div>
              </div>

              <!-- Celebration Message -->
              <div v-if="isCelebration && celebrationMessage" class="celebration-message">
                <div class="celebration-text">{{ celebrationMessage }}</div>
                <div class="celebration-emojis">🎉🎂❤️✨🙏🥳</div>
                <div class="celebration-share">
                  Podijeli radosnu vijest sa prijateljima u svojoj AA grupi!
                </div>
              </div>

              <div class="greeting-footer">Mir 24h!</div>
            </div>
          </div>

          <!-- Right Side: Coins and Total Cards -->
          <div class="coins-and-totals">
            <!-- Coins Swiper -->
            <div v-if="coinImages.length > 0" class="coins-swiper-container">
              <swiper
                :modules="swiperModules"
                :slides-per-view="'auto'"
                :space-between="20"
                :centered-slides="true"
                :loop="false"
                :effect="'cards'"
                :cards-effect="{
                  perSlideOffset: 20,
                  slideShadows: false
                }"
                :grab-cursor="true"
                class="coins-swiper"
              >
                <swiper-slide
                  v-for="(coin, index) in coinImages"
                  :key="index"
                  class="coin-slide"
                >
                  <img :src="coin" :alt="`Coin ${index + 1}`" class="coin-image" />
                </swiper-slide>
              </swiper>
            </div>

            <!-- Total Cards - Only show achieved milestones -->
            <div v-if="duration" class="totals-grid">
              <div v-if="duration.years > 0" class="total-card">
                <div class="total-label">Ukupno godina</div>
                <div class="total-value">{{ duration.years }}</div>
              </div>
              <div v-if="duration.years > 0 || duration.months > 0" class="total-card">
                <div class="total-label">Ukupno mjeseci</div>
                <div class="total-value">{{ totalMonths }}</div>
              </div>
              <div class="total-card">
                <div class="total-label">Ukupno dana</div>
                <div class="total-value">{{ duration.totalDays }}</div>
              </div>
              <div class="total-card">
                <div class="total-label">Ukupno sati</div>
                <div class="total-value">{{ duration.totalHours }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Share Button (only on celebrations) -->
        <q-btn
          v-if="isCelebration"
          round
          color="primary"
          icon="share"
          class="share-button"
          @click="shareGreeting"
          :loading="isGeneratingImage"
        >
          <q-tooltip>Podijeli</q-tooltip>
        </q-btn>
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
import { ref, computed, onMounted, watch } from 'vue';
import { usePageNavigation } from 'src/composables/usePageNavigation';
import { useUserPreferencesStore } from 'src/stores/userPreferences';
import { useSobrietyCalculator } from 'src/composables/useSobrietyCalculator';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectCards } from 'swiper/modules';
import { useQuasar } from 'quasar';
import html2canvas from 'html2canvas';
import 'swiper/css';
import 'swiper/css/effect-cards';

// Page navigation
const { handleSwipe } = usePageNavigation();
const userPreferences = useUserPreferencesStore();
const $q = useQuasar();
const {
  calculateDuration,
  calculateMilestone,
  getDurationText,
  getCelebrationMessage,
  triggerCelebration
} = useSobrietyCalculator();

// Swiper modules
const swiperModules = [EffectCards];

// Refs
const greetingCardRef = ref<HTMLElement | null>(null);
const isGeneratingImage = ref(false);

// Audio elements
const applauseAudio = ref<HTMLAudioElement | null>(null);
const birthdayAudio = ref<HTMLAudioElement | null>(null);

// Computed properties
const duration = computed(() => {
  if (!userPreferences.sobrietyDate) return null;
  return calculateDuration(userPreferences.sobrietyDate);
});

const milestone = computed(() => {
  if (!duration.value) return null;
  return calculateMilestone(duration.value);
});

const durationText = computed(() => {
  if (!duration.value) return '';
  return getDurationText(duration.value);
});

const celebrationMessage = computed(() => {
  if (!milestone.value || !duration.value) return '';
  return getCelebrationMessage(milestone.value, duration.value.totalDays);
});

const totalMonths = computed(() => {
  if (!duration.value) return 0;
  return duration.value.years * 12 + duration.value.months;
});

const isCelebration = computed(() => {
  if (!milestone.value) return false;
  return (
    milestone.value.isFullYear ||
    milestone.value.isFullMonth ||
    milestone.value.isRoundedHundred ||
    milestone.value.isRoundedThousand
  );
});

const coinImages = computed(() => {
  if (!duration.value || !userPreferences.sobrietyCoinType) return [];

  const { years, months, days } = duration.value;
  const coinType = userPreferences.sobrietyCoinType;
  const images: string[] = [];

  // Logic from old implementation
  if (years === 0 && months === 0 && days > 0) {
    // Show 24h coin
    images.push('/assets/coins/mjeseci/hours_24h.webp');
  } else if (years === 0 && months > 0) {
    // Show month coins (countdown from current month to 1)
    for (let i = months; i > 0; i--) {
      images.push(`/assets/coins/mjeseci/months_${i}.webp`);
    }
    images.push('/assets/coins/mjeseci/hours_24h.webp');
  } else if (years > 0) {
    // Show year coins (countdown from current year to 1)
    const maxYear = Math.min(years, 50); // We have coins up to 50 years
    for (let i = maxYear; i > 0; i--) {
      images.push(`/assets/coins/${coinType}/years_${i}.webp`);
    }
    // Then show all 11 month coins
    for (let i = 11; i > 0; i--) {
      images.push(`/assets/coins/mjeseci/months_${i}.webp`);
    }
    images.push('/assets/coins/mjeseci/hours_24h.webp');
  }

  return images;
});

// Initialize audio
onMounted(() => {
  applauseAudio.value = new Audio('/assets/sounds/applause-8s.mp3');
  birthdayAudio.value = new Audio('/assets/sounds/Fantomi - Sretan Ti Rođendan.mp3');

  // Handle hash navigation (e.g., from badge click)
  if (window.location.hash === '#sobriety') {
    setTimeout(() => {
      const element = document.getElementById('sobriety');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300); // Small delay to ensure page is fully rendered
  }
});

// Watch for celebrations
watch(
  milestone,
  (newMilestone) => {
    if (!newMilestone) return;

    if (isCelebration.value) {
      // Trigger confetti
      triggerCelebration(newMilestone);

      // Play sound
      if (newMilestone.isFullYear && birthdayAudio.value) {
        birthdayAudio.value.play().catch((e) => console.log('Audio play failed:', e));
      } else if (
        (newMilestone.isFullMonth ||
          newMilestone.isRoundedHundred ||
          newMilestone.isRoundedThousand) &&
        applauseAudio.value
      ) {
        applauseAudio.value.play().catch((e) => console.log('Audio play failed:', e));
      }
    }
  },
  { immediate: true }
);

// Share greeting function
const shareGreeting = async () => {
  if (!greetingCardRef.value || !duration.value) return;

  isGeneratingImage.value = true;

  try {
    // Get the current coin image path (first coin in the array is the highest achievement)
    const currentCoinPath = coinImages.value[0];
    if (!currentCoinPath) {
      throw new Error('No coin image available');
    }

    // Load the coin image
    const coinImg = new Image();
    coinImg.crossOrigin = 'anonymous';
    coinImg.src = currentCoinPath;
    await new Promise((resolve, reject) => {
      coinImg.onload = resolve;
      coinImg.onerror = reject;
    });

    // Get the background color from the greeting card element
    const cardBgColor = getComputedStyle(greetingCardRef.value).backgroundColor;

    // Create canvas for the greeting card only
    const greetingCanvas = await html2canvas(greetingCardRef.value, {
      backgroundColor: cardBgColor,
      scale: 2,
      logging: false,
    });

    // Create a new canvas to combine coin + greeting
    const finalCanvas = document.createElement('canvas');
    const ctx = finalCanvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    // Set final canvas size
    const padding = 60;
    const coinSize = 300;
    const glowRadius = 40;
    const maxWidth = Math.max(greetingCanvas.width, coinSize + padding * 2);
    finalCanvas.width = maxWidth;
    finalCanvas.height = coinSize + greetingCanvas.height + padding * 2.5;

    // Fill background with the same color as greeting card
    ctx.fillStyle = cardBgColor;
    ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

    // Draw glow effect around coin
    const coinX = (finalCanvas.width - coinSize) / 2;
    const coinY = padding;
    const coinCenterX = coinX + coinSize / 2;
    const coinCenterY = coinY + coinSize / 2;

    // Create radial gradient for glow
    const glowGradient = ctx.createRadialGradient(
      coinCenterX, coinCenterY, coinSize / 2,
      coinCenterX, coinCenterY, coinSize / 2 + glowRadius
    );
    glowGradient.addColorStop(0, 'rgba(255, 215, 0, 0.6)');
    glowGradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.3)');
    glowGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');

    ctx.fillStyle = glowGradient;
    ctx.fillRect(
      coinX - glowRadius,
      coinY - glowRadius,
      coinSize + glowRadius * 2,
      coinSize + glowRadius * 2
    );

    // Draw coin at top center
    ctx.drawImage(coinImg, coinX, coinY, coinSize, coinSize);

    // Draw greeting card below coin
    const greetingX = (finalCanvas.width - greetingCanvas.width) / 2;
    const greetingY = coinSize + padding * 1.5;
    ctx.drawImage(greetingCanvas, greetingX, greetingY);

    // Convert to blob
    const blob = await new Promise<Blob>((resolve, reject) => {
      finalCanvas.toBlob((b) => {
        if (b) resolve(b);
        else reject(new Error('Failed to create blob'));
      }, 'image/png');
    });

    // Create file
    const file = new File([blob], 'moja-trijeznost.png', { type: 'image/png' });

    // Check if Web Share API is available
    if (navigator.share && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: 'Moja trijeznost',
        text: `${durationText.value} trijeznosti!`,
        files: [file],
      });
    } else {
      // Fallback: download the image
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'moja-trijeznost.png';
      a.click();
      URL.revokeObjectURL(url);

      $q.notify({
        message: 'Slika je preuzeta. Možeš je podijeliti ručno.',
        color: 'positive',
        icon: 'download',
      });
    }
  } catch (error) {
    console.error('Error sharing greeting:', error);
    $q.notify({
      message: 'Greška pri dijeljenju. Pokušaj ponovno.',
      color: 'negative',
      icon: 'error',
    });
  } finally {
    isGeneratingImage.value = false;
  }
};

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

// Sobriety section styles
.sobriety-section {
  background-color: var(--color-surface);
  transition: background-color 0.5s ease;
  position: relative;

  &.celebration-mode {
    background: linear-gradient(
      135deg,
      rgba(255, 215, 0, 0.1),
      rgba(255, 165, 0, 0.05),
      rgba(255, 215, 0, 0.1)
    );
  }
}

// Section title with decorative lines
.section-title-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
  padding: var(--spacing-xl) 0;
}

.title-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(
    to right,
    transparent,
    var(--color-primary),
    transparent
  );
  max-width: 200px;
}

.section-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--color-primary);
  text-align: center;
  margin: 0;
  white-space: nowrap;
  padding: var(--spacing-md) var(--spacing-xl);
  background: linear-gradient(
    135deg,
    rgba(var(--color-primary-rgb, 25, 118, 210), 0.1),
    rgba(var(--color-primary-rgb, 25, 118, 210), 0.05)
  );
  border-radius: var(--radius-lg);
  border: 2px solid var(--color-primary);
}

// Responsive layout container
.sobriety-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-2xl);

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}

// Share button
.share-button {
  position: absolute;
  bottom: var(--spacing-xl);
  right: var(--spacing-xl);
  z-index: 100;
}

// Coins and totals container
.coins-and-totals {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.coins-swiper-container {
  margin: 0;
}

.coins-swiper {
  width: 100%;
  max-width: 400px;
  height: 200px;
  margin: 0 auto;
}

.coin-slide {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent !important;
  box-shadow: none !important;
  border-radius: 0 !important;
}

.coin-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

// Override Swiper's effect-cards styling to make slides fully transparent
:deep(.swiper-slide) {
  background: transparent !important;
  box-shadow: none !important;
  border-radius: 0 !important;
}

:deep(.swiper-slide-shadow),
:deep(.swiper-slide-shadow-left),
:deep(.swiper-slide-shadow-right) {
  display: none !important;
}

.greeting-section {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 300px;
}

.greeting-card {
  background: var(--color-surface);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-xl);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.greeting-header {
  margin-bottom: var(--spacing-xl);
}

.greeting-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-lg);
}

.greeting-main {
  font-size: var(--font-size-xl);
  line-height: 1.8;
  color: var(--color-text);
}

.duration-text {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-primary);
}

.celebration-message {
  background-color: --var(--color-surface-variant);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  margin: var(--spacing-xl) 0;
  border: 2px solid rgba(236, 177, 129,.4);
}

.celebration-text {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.celebration-emojis {
  font-size: var(--font-size-3xl);
  margin: var(--spacing-md) 0;
}

.celebration-share {
  font-size: var(--font-size-lg);
  color: var(--color-text);
  margin-top: var(--spacing-md);
}

.greeting-footer {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-text);
  margin-top: var(--spacing-sm);
}

.totals-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
  max-width: 400px;
  margin: 0 auto;
}

.total-card {
  background-color: var(--color-surface-variant);
  padding: var(--spacing-sm);
  border-radius: var(--radius-lg);
  text-align: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
}

.total-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
  font-weight: 500;
}

.total-value {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-primary);
}

@media (max-width: 1023px) {
  .section-title {
    font-size: var(--font-size-2xl);
    white-space: normal;
  }

  .title-line {
    max-width: 100px;
  }

  .share-button {
    bottom: var(--spacing-md);
    right: var(--spacing-md);
  }
}

@media (max-width: 600px) {
  .section-title {
    font-size: var(--font-size-xl);
    padding: var(--spacing-sm) var(--spacing-md);
  }

  .title-line {
    max-width: 50px;
  }

  .coins-swiper {
    max-width: 300px;
    height: 160px;
  }

  .coin-slide {
    width: 160px;
    height: 160px;
  }

  .greeting-section {
    min-height: auto;
  }

  .greeting-title {
    font-size: var(--font-size-2xl);
  }

  .greeting-main {
    font-size: var(--font-size-lg);
  }

  .duration-text {
    font-size: var(--font-size-xl);
  }

  .celebration-text {
    font-size: var(--font-size-xl);
  }

  .celebration-emojis {
    font-size: var(--font-size-2xl);
  }

  .celebration-share {
    font-size: var(--font-size-base);
  }

  .totals-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
  }

  .total-value {
    font-size: var(--font-size-xl);
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

