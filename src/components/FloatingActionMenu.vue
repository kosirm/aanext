<template>
  <teleport to="body">
    <div
      v-if="props.isActive"
      class="floating-action-menu"
      :style="getMenuStyle"
    >
      <q-btn
        icon="bookmark_border"
        flat
        round
        dense
        size="md"
        title="Dodaj bookmark"
        @click="handleBookmark"
        class="action-btn"
      />
      <q-btn
        icon="share"
        flat
        round
        dense
        size="md"
        title="Dijeli"
        @click="handleShare"
        class="action-btn"
      />
      <q-btn
        icon="error_outline"
        flat
        round
        dense
        size="md"
        title="Prijavi grešku"
        @click="handleReportError"
        class="action-btn"
      />
      <q-btn
        icon="close"
        flat
        round
        dense
        size="md"
        title="Zatvori"
        @click="handleClose"
        class="action-btn"
      />
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { watch, computed } from 'vue';
import { useTextSelection } from 'src/composables/useTextSelection';

interface Props {
  isActive: boolean;
  selectedText: string;
  position: {
    x: number;
    y: number;
  };
}

const props = defineProps<Props>();
const emit = defineEmits<{
  bookmark: [];
  share: [];
  'report-error': [];
  close: [];
}>();

const { clearSelection } = useTextSelection();

// Debug: watch for prop changes
watch(
  () => props.isActive,
  (newVal) => {
    console.log('[FloatingActionMenu] isActive changed to:', newVal, 'position:', props.position);
  }
);

// Memoize menu style calculation to prevent infinite re-renders
const getMenuStyle = computed(() => {
  let x = props.position.x;
  let y = props.position.y;

  const menuWidth = 200; // Approximate width of menu
  const menuHeight = 60; // Approximate height of menu
  const viewportHeight = window.innerHeight;
  const scrollY = window.scrollY;

  // For absolute positioning, use document coordinates directly
  // The menu will scroll with the page

  // Ensure menu doesn't go off-screen horizontally
  if (x + menuWidth > window.innerWidth) {
    x = window.innerWidth - menuWidth - 10;
  }
  if (x < 10) {
    x = 10;
  }

  // Ensure menu doesn't go off-screen vertically
  // If menu would go below viewport, position it above the selection
  const viewportY = y - scrollY;
  if (viewportY + menuHeight > viewportHeight) {
    y = y - menuHeight - 20; // Position above with 20px gap
  }

  console.log('[FloatingActionMenu] Calculated position:', {
    x,
    y,
    viewportHeight,
    scrollY,
    menuHeight,
  });

  return {
    top: `${y}px`,
    left: `${x}px`,
  };
});

const handleBookmark = () => {
  console.log('[FloatingActionMenu] Bookmark clicked');
  emit('bookmark');
};

const handleShare = () => {
  console.log('[FloatingActionMenu] Share clicked');
  emit('share');
};

const handleReportError = () => {
  console.log('[FloatingActionMenu] Report error clicked');
  emit('report-error');
};

const handleClose = () => {
  console.log('[FloatingActionMenu] Close clicked');
  clearSelection();
  emit('close');
};
</script>

<style scoped lang="scss">
.floating-action-menu {
  position: absolute;
  display: flex;
  gap: 4px;
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: 8px;
  box-shadow: var(--shadow-lg);
  z-index: 9999;
  border: 1px solid var(--border-color);
  animation: slideIn 0.2s ease-out;
  pointer-events: none; // Don't intercept events during text selection

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
}

.action-btn {
  color: var(--color-primary);
  pointer-events: auto; // Re-enable events for buttons so they can be clicked

  &:hover {
    background-color: var(--bg-secondary);
  }
}
</style>

