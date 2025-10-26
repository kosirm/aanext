<template>
  <div
    class="responsive-carousel"
    :style="{
      '--carousel-dots-gap': `${gap}px`,
      '--carousel-dots-size': `${dotSize}px`,
      '--carousel-dots-inactive-color': dotInactiveColor,
      '--carousel-dots-active-color': dotActiveColor,
    }"
  >
    <!-- Carousel Container with Navigation Buttons -->
    <div ref="wrapperElement" class="carousel-wrapper" v-touch-swipe.horizontal.mouse="onSwipe">
      <QResizeObserver @resize="onResize" />

      <!-- Previous Button (Left) -->
      <q-btn
        v-if="showControls"
        round
        dense
        flat
        icon="chevron_left"
        color="primary"
        :disable="currentIndex === 0"
        @click="previous"
        class="carousel-btn carousel-btn-prev"
      />

      <!-- Carousel Items -->
      <div
        ref="carouselContainer"
        class="carousel-container"
        :style="{
          transform: `translateX(-${currentOffset}px)`,
          gap: `${gap}px`,
          '--carousel-item-width': `${itemWidthCalculated}px`,
          '--carousel-item-height': `${itemHeight}px`,
        }"
      >
        <!-- Original items -->
        <slot />
        <!-- Duplicate items at the end for infinite scroll -->
        <slot />
      </div>

      <!-- Next Button (Right) -->
      <q-btn
        v-if="showControls"
        round
        dense
        flat
        icon="chevron_right"
        color="primary"
        :disable="currentIndex + visibleItems >= totalItems"
        @click="next"
        class="carousel-btn carousel-btn-next"
      />
    </div>

    <!-- Dots Indicator (Bottom) -->
    <div v-if="showControls" class="carousel-dots-container">
      <button
        v-for="index in totalItems"
        :key="index"
        class="carousel-dot"
        :class="{ 'carousel-dot--active': isItemVisible(index - 1) }"
        @click="goToItem(index - 1)"
        :aria-label="`Go to item ${index}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { QResizeObserver } from 'quasar';

interface Props {
  minItemWidth?: number; // Minimum width of each item in pixels
  maxItemWidth?: number; // Maximum width of each item in pixels
  gap?: number; // Gap between items in pixels
  itemHeight?: number; // Height of each item in pixels
  dotSize?: number; // Size of indicator dots in pixels
  dotInactiveColor?: string; // Color of inactive dots
  dotActiveColor?: string; // Color of active dots
}

const props = withDefaults(defineProps<Props>(), {
  minItemWidth: 200,
  maxItemWidth: 300,
  gap: 16,
  itemHeight: 280,
  dotSize: 12,
  dotInactiveColor: 'var(--text-secondary)',
  dotActiveColor: 'var(--primary)',
});

const carouselContainer = ref<HTMLElement | null>(null);
const wrapperElement = ref<HTMLElement | null>(null);
const containerWidth = ref(0);
const currentIndex = ref(0);

// Get total number of items from DOM (divided by 2 because we duplicate them)
const totalItems = computed(() => {
  if (!carouselContainer.value) {
    console.log('[DEBUG] totalItems: 0 (container not ready)');
    return 0;
  }
  const count = Math.floor(carouselContainer.value.children.length / 2);
  console.log('[DEBUG] totalItems:', count, 'actual children:', carouselContainer.value.children.length);
  return count;
});

// Calculate how many items can fit
const visibleItems = computed(() => {
  if (containerWidth.value === 0) return 1;
  const totalWidth = containerWidth.value;
  const maxItemWidth = props.maxItemWidth + props.gap;

  // Start with max items that can fit with maxItemWidth
  let visible = Math.max(1, Math.floor(totalWidth / maxItemWidth));

  // If we can fit more items with minItemWidth, increase visible count
  while (visible < totalItems.value && totalWidth / (visible + 1) >= props.minItemWidth) {
    visible++;
  }

  console.log('[DEBUG] visibleItems:', visible, 'containerWidth:', totalWidth, 'minItemWidth:', props.minItemWidth, 'maxItemWidth:', props.maxItemWidth);
  return visible;
});

// Calculate actual item width to fill container
const itemWidthCalculated = computed(() => {
  if (visibleItems.value === 0) return props.maxItemWidth;
  const totalGaps = (visibleItems.value - 1) * props.gap;
  const availableWidth = containerWidth.value - totalGaps;
  const width = Math.floor(availableWidth / visibleItems.value);
  console.log('[DEBUG] itemWidthCalculated:', width, 'visibleItems:', visibleItems.value, 'totalGaps:', totalGaps);
  return width;
});

// Check if an item is currently visible (handles circular carousel)
const isItemVisible = (itemIndex: number): boolean => {
  const endIndex = currentIndex.value + visibleItems.value;

  // If we don't wrap around, simple check
  if (endIndex <= totalItems.value) {
    return itemIndex >= currentIndex.value && itemIndex < endIndex;
  }

  // If we wrap around (e.g., showing items 6,7,0,1 when we have 8 items)
  return itemIndex >= currentIndex.value || itemIndex < (endIndex % totalItems.value);
};

// Current offset for transform
const currentOffset = computed(() => {
  const offset = currentIndex.value * (itemWidthCalculated.value + props.gap);
  console.log('[DEBUG] currentOffset:', offset, 'currentIndex:', currentIndex.value, 'itemWidth:', itemWidthCalculated.value);
  return offset;
});

// Show controls only if there are more items than visible
const showControls = computed(() => {
  const show = totalItems.value > visibleItems.value;
  console.log('[DEBUG] showControls:', show, 'totalItems:', totalItems.value, 'visibleItems:', visibleItems.value);
  return show;
});

// Navigation functions with circular/endless carousel
const next = () => {
  const nextIndex = currentIndex.value + visibleItems.value;
  // If we've gone past the original items, reset to the beginning
  if (nextIndex >= totalItems.value) {
    currentIndex.value = nextIndex - totalItems.value;
  } else {
    currentIndex.value = nextIndex;
  }
  console.log('[DEBUG] next - currentIndex:', currentIndex.value, 'totalItems:', totalItems.value);
};

const previous = () => {
  let prevIndex = currentIndex.value - visibleItems.value;
  // If we go before 0, wrap to the end
  if (prevIndex < 0) {
    prevIndex = totalItems.value + prevIndex;
  }
  currentIndex.value = prevIndex;
  console.log('[DEBUG] previous - currentIndex:', currentIndex.value);
};

const goToItem = (itemIndex: number) => {
  // Calculate which page this item is on
  const pageIndex = Math.floor(itemIndex / visibleItems.value);
  currentIndex.value = pageIndex * visibleItems.value;
  console.log('[DEBUG] goToItem:', itemIndex, 'currentIndex:', currentIndex.value);
};

// Handle swipe gestures
const onSwipe = (details: { direction?: 'left' | 'right' | 'up' | 'down' }) => {
  console.log('[DEBUG] swipe detected, direction:', details.direction);
  if (details.direction === 'left') {
    next();
  } else if (details.direction === 'right') {
    previous();
  }
};

// Handle resize
const onResize = () => {
  if (wrapperElement.value) {
    containerWidth.value = wrapperElement.value.clientWidth;
    console.log('[DEBUG] onResize - containerWidth set to:', containerWidth.value);
  } else {
    console.log('[DEBUG] onResize - wrapperElement is null');
  }
};

// Watch for changes in visibleItems and ensure currentIndex is valid
watch(visibleItems, () => {
  const maxIndex = Math.max(0, totalItems.value - visibleItems.value);
  if (currentIndex.value > maxIndex) {
    currentIndex.value = maxIndex;
    console.log('[DEBUG] visibleItems changed, adjusted currentIndex to:', currentIndex.value);
  }
});

onMounted(() => {
  console.log('[DEBUG] onMounted - calling onResize');
  onResize();
});
</script>

<style scoped lang="scss">
.responsive-carousel {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.carousel-wrapper {
  width: 100%;
  overflow: hidden;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  min-height: 200px;
  flex: 1;
  padding-bottom: var(--spacing-lg);
}

.carousel-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  transition: transform 0.3s ease-in-out;
  align-items: stretch;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.9);

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
}

.carousel-btn-prev {
  left: var(--spacing-md);
}

.carousel-btn-next {
  right: var(--spacing-md);
}

.carousel-dots-container {
  display: flex;
  gap: var(--carousel-dots-gap, var(--spacing-md));
  align-items: center;
  justify-content: center;
  padding: var(--carousel-dots-padding, var(--spacing-md) 0);
}

.carousel-dot {
  width: var(--carousel-dots-size, 12px);
  height: var(--carousel-dots-size, 12px);
  border-radius: 50%;
  border: none;
  background-color: var(--carousel-dots-inactive-color, var(--text-secondary));
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  padding: 0;
  opacity: 0.6;

  &:hover {
    opacity: 0.8;
    transform: scale(1.1);
  }

  &.carousel-dot--active {
    background-color: var(--carousel-dots-active-color, var(--primary));
    opacity: 1;
  }
}
</style>

