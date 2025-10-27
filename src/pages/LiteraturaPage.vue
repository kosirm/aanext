<template>
  <div class="literatura-page">
    <!-- Mobile Debug Modal -->
    <MobileDebugModal />

    <!-- Header Section -->
    <section id="header" class="hero-section">
      <div class="hero-content">
        <h1>A.A. Literatura</h1>
        <p>Dnevna razmatranja i knjige AA-a</p>
      </div>
    </section>

    <!-- Dnevna razmatranja Section -->
    <section id="daily" class="content-section dnevna-section">
      <div class="section-container">
        <h2>Dnevna razmatranja</h2>
        <p class="section-description">
          Dnevna razmatranja su od velike pomoći za članove A.A., jer su sinteza literature i živog iskustva A.A.
        </p>

        <div class="daily-controls">
          <!-- Calendar Button (Mobile) -->
          <q-btn
            v-if="$q.screen.xs || $q.screen.sm"
            flat
            icon="calendar_today"
            label="Odaberi datum"
            @click="showCalendarModal = true"
            class="calendar-btn"
          />

          <!-- Dropdown for date selection -->
          <div class="date-dropdown">
            <q-select
              v-model="selectedDate"
              :options="dateOptions"
              @update:model-value="onDateSelected"
              label="Odaberi dan"
              outlined
              dense
              emit-value
              map-options
              class="date-select"
            />
          </div>
        </div>

        <!-- Calendar (Desktop only) -->
        <div v-if="!($q.screen.xs || $q.screen.sm)" class="calendar-container">
          <q-date
            v-model="selectedDate"
            @update:model-value="onDateSelected"
            class="daily-calendar"
          />
        </div>

        <!-- Daily Text Display -->
        <div v-if="currentDailyEntry" class="daily-entry">
          <p class="entry-date">{{ currentDailyEntry.date }}</p>
          <h3 class="entry-title">{{ currentDailyEntry.title }}</h3>
          <p v-if="currentDailyEntry.header" class="entry-header">
            {{ currentDailyEntry.header }}
          </p>
          <p v-if="currentDailyEntry.source" class="entry-source">
            {{ currentDailyEntry.source }}
          </p>
          <div class="entry-content">
            <p
              v-for="(line, index) in currentDailyEntry.text.split('\n\n')"
              :key="index"
              class="content-text"
            >
              {{ line }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Čitaonica Section -->
    <section id="library" class="content-section citaonica-section">
      <div class="section-container">
        <h2>Čitaonica</h2>
        <div class="books-grid">
          <div
            v-for="book in booksStore.books.filter((b) => b.bookTitle !== 'DNEVNA RAZMATRANJA')"
            :key="book.bookTitle"
            class="book-card"
            :class="{ 'book-card--active': booksStore.currentBookId === getBookId(book.bookTitle) }"
            @click="selectBook(getBookId(book.bookTitle))"
          >
            <div class="book-cover">
              <q-icon name="library_books" size="3rem" />
            </div>
            <h3>{{ book.bookTitle }}</h3>
            <p>{{ book.bookParts.reduce((sum, p) => sum + p.chapters.length, 0) }} poglavlja</p>
            <q-btn
              color="primary"
              label="Čitaj"
              @click.stop="selectBook(getBookId(book.bookTitle))"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Book Reader Section (shown only when book is selected) -->
    <section v-if="booksStore.currentBookId" id="reader" class="content-section reader-section">
      <div class="section-container">
        <div class="reader-header">
          <h2>{{ booksStore.currentBook?.bookTitle }}</h2>
        </div>

        <!-- Chapter Dropdown with Parts -->
        <div class="chapter-selector">
          <q-select
            v-model="selectedChapterId"
            :options="chapterOptions"
            @update:model-value="onChapterSelected"
            label="Odaberi poglavlje"
            outlined
            dense
            emit-value
            map-options
            class="chapter-select"
          >
            <template #prepend>
              <q-icon name="list" />
            </template>
            <template #option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <div :class="scope.opt.isPartTitle ? 'part-title' : 'chapter-title'">
                    {{ scope.opt.label }}
                  </div>
                </q-item-section>
              </q-item>
            </template>
            <template #selected-item="scope">
              <div v-if="scope.opt" :class="scope.opt.isPartTitle ? 'part-title' : 'chapter-title'">
                {{ scope.opt.label }}
              </div>
            </template>
          </q-select>
        </div>

        <q-separator class="q-my-lg" />

        <!-- Reader Controls -->
        <div class="reader-controls-top">
          <q-btn
            flat
            dense
            round
            icon="bookmark"
            :color="isCurrentChapterBookmarked ? 'primary' : 'grey'"
            @click="toggleBookmark"
            title="Dodaj u oznake"
          />
          <span class="entry-counter">
            {{ booksStore.currentChapterIndex + 1 }} / {{ booksStore.allCurrentChapters.length }}
          </span>
        </div>

        <!-- Reader Content -->
        <div v-if="booksStore.currentChapter" class="reader-content">
          <h3 class="entry-title">{{ booksStore.currentChapter.chapterTitle }}</h3>
          <p v-if="booksStore.currentChapter.chapterDateString" class="entry-date">
            {{ booksStore.currentChapter.chapterDateString }}
          </p>
          <p v-if="booksStore.currentChapter.chapterHeader" class="entry-header">
            {{ booksStore.currentChapter.chapterHeader }}
          </p>
          <p v-if="booksStore.currentChapter.chapterSource" class="entry-source">
            {{ booksStore.currentChapter.chapterSource }}
          </p>
          <div class="entry-content">
            <template v-for="(item, index) in booksStore.currentChapter.content" :key="index">
              <p v-if="item.type === 'text'" class="content-text">
                {{ item.value }}
              </p>
              <p v-else-if="item.type === 'subtitle'" class="content-subtitle">
                {{ item.value }}
              </p>
              <p v-else-if="item.type === 'subtitleBold'" class="content-subtitle-bold">
                {{ item.value }}
              </p>
              <div v-else-if="item.type === 'letter'" class="content-letter">
                {{ item.value }}
              </div>
              <div v-else-if="item.type === 'table'" class="content-table">
                {{ item.value }}
              </div>
              <p v-else class="content-text">
                {{ item.value }}
              </p>
            </template>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="reader-navigation">
          <q-btn
            v-if="booksStore.hasPreviousChapter"
            flat
            icon="navigate_before"
            label="Nazad"
            @click="booksStore.previousChapter()"
            class="nav-btn nav-btn--prev"
          />
          <q-space />
          <q-btn
            v-if="booksStore.hasNextChapter"
            flat
            icon-right="navigate_next"
            label="Naprijed"
            @click="booksStore.nextChapter()"
            class="nav-btn nav-btn--next"
          />
        </div>
      </div>
    </section>

    <!-- Calendar Modal (Mobile) -->
    <q-dialog v-model="showCalendarModal">
      <q-card style="min-width: 300px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Odaberi datum</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="showCalendarModal = false" />
        </q-card-section>

        <q-card-section class="calendar-modal-section">
          <div class="calendar-modal-header">
            {{ formattedSelectedDate }}
          </div>
          <q-date
            v-model="selectedDate"
            @update:model-value="onDateSelectedModal"
            class="daily-calendar"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Floating Action Menu -->
    <FloatingActionMenu
      :is-active="selectionInfo.isActive"
      :selected-text="selectionInfo.text"
      :position="{ x: selectionInfo.x, y: selectionInfo.y }"
      @bookmark="handleBookmarkFromSelection"
      @share="handleShareSelection"
      @report-error="handleReportError"
      @close="clearSelection"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from 'vue';
import { useQuasar } from 'quasar';
import { useBooksStore } from 'src/stores/books';
import { useTextSelection } from 'src/composables/useTextSelection';
import FloatingActionMenu from 'src/components/FloatingActionMenu.vue';
import MobileDebugModal from 'src/components/MobileDebugModal.vue';
import type { Bookmark } from 'src/types/book';

const $q = useQuasar();
const booksStore = useBooksStore();
const { selectionInfo, clearSelection, handleContextMenu, handleSelectionChange, getTruncatedSelectedText } = useTextSelection();

// Helper function to generate book ID from title
const getBookId = (bookTitle: string): string => {
  return bookTitle
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

// State
// Initialize selectedDate with today's date in 2024 reference year format
const initializeSelectedDate = (): string => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `2024-${month}-${day}`;
};

const selectedDate = ref(initializeSelectedDate());
const showCalendarModal = ref(false);
const selectedChapterId = ref<string | null>(null);

// Initialize books on mount
// Listen for navigation to dnevna razmatranja
const handleNavigateToDnevna = (event: Event) => {
  const customEvent = event as CustomEvent;
  if (customEvent.detail?.date) {
    selectedDate.value = customEvent.detail.date;
  }
};

onMounted(async () => {
  console.log('[LiteraturaPage] Component mounted');
  await booksStore.loadBooks();
  // Initialize selectedChapterId with current chapter
  if (booksStore.currentChapterId) {
    selectedChapterId.value = booksStore.currentChapterId;
  }

  // Add text selection listeners for bookmarks
  console.log('[LiteraturaPage] Adding text selection event listeners');
  document.addEventListener('selectionchange', handleSelectionChange);
  document.addEventListener('contextmenu', handleContextMenu);
  window.addEventListener('navigate-to-dnevna', handleNavigateToDnevna);
});

// Cleanup event listeners on unmount
onUnmounted(() => {
  document.removeEventListener('selectionchange', handleSelectionChange);
  document.removeEventListener('contextmenu', handleContextMenu);
  window.removeEventListener('navigate-to-dnevna', handleNavigateToDnevna);
});

// Watch for current chapter changes to update selected chapter
watch(
  () => booksStore.currentChapterId,
  (newId) => {
    if (newId) {
      selectedChapterId.value = newId;
    }
  }
);

// Watch for book changes to reset chapter selection
watch(
  () => booksStore.currentBookId,
  (newBookId) => {
    if (newBookId && booksStore.currentChapterId) {
      selectedChapterId.value = booksStore.currentChapterId;
    }
  }
);

// Computed properties
const currentDailyEntry = computed(() => {
  const dailyBook = booksStore.books.find((b) => b.bookTitle === 'DNEVNA RAZMATRANJA');
  if (!dailyBook) return null;

  for (const part of dailyBook.bookParts) {
    const chapter = part.chapters.find((c) => c.chapterDateObject === selectedDate.value);
    if (chapter) {
      return {
        title: chapter.chapterTitle,
        date: chapter.chapterDateString,
        header: chapter.chapterHeader,
        text: chapter.content?.map((c) => c.value).join('\n\n') || '',
        source: chapter.chapterSource,
      };
    }
  }
  return null;
});

const dateOptions = computed(() => {
  const dailyBook = booksStore.books.find((b) => b.bookTitle === 'DNEVNA RAZMATRANJA');
  if (!dailyBook) return [];
  const chapters: Array<{ label: string; value: string }> = [];
  dailyBook.bookParts.forEach((part) => {
    part.chapters.forEach((chapter) => {
      chapters.push({
        label: `${chapter.chapterDateString} - ${chapter.chapterTitle}`,
        value: chapter.chapterDateObject || chapter.chapterId,
      });
    });
  });
  return chapters;
});

const chapterOptions = computed(() => {
  const book = booksStore.currentBook;
  if (!book) return [];

  const options: Array<{
    label: string;
    value: string;
    isPartTitle?: boolean;
  }> = [];

  // If only one part, don't show part titles
  if (book.bookParts.length === 1) {
    const part = book.bookParts[0];
    if (part) {
      part.chapters.forEach((chapter) => {
        options.push({
          label: `${chapter.chapterId} - ${chapter.chapterTitle}`,
          value: chapter.chapterId,
        });
      });
    }
  } else {
    // Multiple parts - show part titles
    book.bookParts.forEach((part) => {
      // Add part title
      options.push({
        label: part.partTitle || `Dio ${part.partId}`,
        value: `part-${part.partId}`,
        isPartTitle: true,
      });

      // Add chapter entries
      part.chapters.forEach((chapter) => {
        options.push({
          label: `${chapter.chapterId} - ${chapter.chapterTitle}`,
          value: chapter.chapterId,
        });
      });
    });
  }

  return options;
});

const isCurrentChapterBookmarked = computed(() => {
  if (!booksStore.currentBookId || !booksStore.currentChapterId) return false;
  return booksStore.bookmarksList.some(
    (b) => b.type === 'book' && b.bookId === booksStore.currentBookId && b.chapterId === booksStore.currentChapterId
  );
});

// Helper function to convert date to 2024 reference year format
const convertToReferenceYear = (date: string): string => {
  // Convert from YYYY/MM/DD or YYYY-MM-DD to 2024-MM-DD format
  const normalized = date.replace(/\//g, '-'); // Convert slashes to dashes
  const parts = normalized.split('-');
  if (parts.length === 3) {
    // Replace year with 2024 (reference year for leap year support)
    return `2024-${parts[1]}-${parts[2]}`;
  }
  return normalized;
};

// Methods
const onDateSelected = (date: string) => {
  const convertedDate = convertToReferenceYear(date);
  selectedDate.value = convertedDate;
};

const onDateSelectedModal = (date: string) => {
  const convertedDate = convertToReferenceYear(date);
  selectedDate.value = convertedDate;
  showCalendarModal.value = false;
};

const selectBook = (bookId: string) => {
  booksStore.setCurrentBook(bookId);
};

const onChapterSelected = (chapterId: string) => {
  if (chapterId && !chapterId.startsWith('part-')) {
    booksStore.setCurrentChapter(chapterId);
  }
};

// Format selected date for display in calendar header
const formattedSelectedDate = computed(() => {
  if (!currentDailyEntry.value) return '';
  return currentDailyEntry.value.date;
});

const toggleBookmark = () => {
  if (!booksStore.currentBookId || !booksStore.currentChapterId || !booksStore.currentChapter) return;

  const isBookmarked = isCurrentChapterBookmarked.value;

  if (isBookmarked) {
    // Remove bookmark
    const bookmarkToRemove = booksStore.bookmarksList.find(
      (b) => b.type === 'book' && b.bookId === booksStore.currentBookId && b.chapterId === booksStore.currentChapterId
    );
    if (bookmarkToRemove) {
      booksStore.removeBookmark(bookmarkToRemove.id);
    }
  } else {
    // Add bookmark
    const bookmarkData: Omit<Bookmark, 'id' | 'timestamp'> = {
      type: 'book',
      selectedText: booksStore.currentChapter.chapterTitle || '',
      bookId: booksStore.currentBookId,
      chapterId: booksStore.currentChapterId,
    };
    if (booksStore.currentBook?.bookTitle) {
      bookmarkData.bookTitle = booksStore.currentBook.bookTitle;
    }
    if (booksStore.currentChapter.chapterTitle) {
      bookmarkData.chapterTitle = booksStore.currentChapter.chapterTitle;
    }
    booksStore.addBookmark(bookmarkData);
  }
};

// Handle bookmark creation from text selection
const handleBookmarkFromSelection = () => {
  if (!selectionInfo.value.text) return;

  const truncatedText = getTruncatedSelectedText();

  // Determine if we're in dnevna or book content
  const isDnevna = document.querySelector('.daily-entry .entry-content')?.contains(
    window.getSelection()?.anchorNode as Node
  );

  if (isDnevna) {
    // Create bookmark for dnevna razmatranja
    const bookmarkData: Omit<Bookmark, 'id' | 'timestamp'> = {
      type: 'dnevna_razmatranja',
      selectedText: truncatedText,
    };
    if (selectedDate.value) {
      bookmarkData.date = selectedDate.value;
    }
    if (currentDailyEntry.value?.date) {
      bookmarkData.dateString = currentDailyEntry.value.date;
    }
    booksStore.addBookmark(bookmarkData);
  } else {
    // Create bookmark for book
    if (!booksStore.currentBookId || !booksStore.currentChapterId || !booksStore.currentChapter) return;

    const bookmarkData: Omit<Bookmark, 'id' | 'timestamp'> = {
      type: 'book',
      selectedText: truncatedText,
      bookId: booksStore.currentBookId,
      chapterId: booksStore.currentChapterId,
    };
    if (booksStore.currentBook?.bookTitle) {
      bookmarkData.bookTitle = booksStore.currentBook.bookTitle;
    }
    if (booksStore.currentChapter.chapterTitle) {
      bookmarkData.chapterTitle = booksStore.currentChapter.chapterTitle;
    }
    booksStore.addBookmark(bookmarkData);
  }

  clearSelection();
  $q.notify({
    type: 'positive',
    message: 'Bookmark je dodan',
    position: 'top',
    timeout: 2000,
  });
};

// Handle share (placeholder for now)
const handleShareSelection = async () => {
  const text = selectionInfo.value.text;
  if (!text) return;

  // Try to use native share API if available
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'AA Hrvatska - Bookmark',
        text: text,
        url: window.location.href,
      });
    } catch (error) {
      console.error('Share failed:', error);
    }
  } else {
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(text);
      $q.notify({
        type: 'positive',
        message: 'Tekst je kopiran u clipboard',
        position: 'top',
        timeout: 2000,
      });
    } catch (error) {
      console.error('Clipboard copy failed:', error);
    }
  }

  clearSelection();
};

// Handle error reporting (placeholder for now)
const handleReportError = () => {
  const text = selectionInfo.value.text;
  $q.notify({
    type: 'info',
    message: 'Greška je prijavljena: ' + text.substring(0, 50),
    position: 'top',
    timeout: 2000,
  });
  clearSelection();
};
</script>

<style scoped lang="scss">
.literatura-page {
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

  &.dnevna-section {
    background-color: var(--bg-secondary);
  }

  &.reader-section {
    background-color: var(--bg-primary);
  }
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  font-size: var(--font-size-2xl);
  margin: 0 0 var(--spacing-lg) 0;
}

.section-description {
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-lg) 0;
}

// Daily Razmatranja Styles
.daily-controls {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
  align-items: center;

  .calendar-btn {
    flex-shrink: 0;
  }

  .date-dropdown {
    flex: 1;
    min-width: 200px;

    .date-select {
      width: 100%;
    }
  }
}

.calendar-container {
  margin-bottom: var(--spacing-xl);
  display: flex;
  justify-content: center;
}

.calendar-modal-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.calendar-modal-header {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: 4px;
  font-size: var(--font-size-lg);
  font-weight: 600;
  text-align: center;
  width: 100%;
}

.daily-calendar {
  max-width: 400px;

  // Hide the default q-date header with the hyphens
  :deep(.q-date__header) {
    display: none;
  }
}

.daily-entry {
  background-color: var(--bg-primary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  margin-top: var(--spacing-lg);
  border-left: 4px solid var(--color-primary);

  h3 {
    margin: 0 0 var(--spacing-md) 0;
    font-size: var(--font-size-xl);
  }

  .entry-date {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    margin: 0 0 var(--spacing-md) 0;
    font-weight: 600;
  }

  .entry-header {
    color: var(--text-secondary);
    font-size: var(--font-size-base);
    margin: 0 0 var(--spacing-md) 0;
    font-style: italic;
  }

  .entry-content {
    line-height: 1.8;
    margin-bottom: var(--spacing-md);
  }

  .entry-source {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    margin: 0;
  }
}

// Content Type Styles
.content-text {
  margin: var(--spacing-md) 0;
  line-height: 1.8;
  text-align: left;
}

.content-subtitle {
  margin: var(--spacing-lg) 0 var(--spacing-md) 0;
  font-size: var(--font-size-lg);
  font-weight: 500;
  text-align: left;
  color: var(--text-primary);
}

.content-subtitle-bold {
  margin: var(--spacing-lg) 0 var(--spacing-md) 0;
  font-size: var(--font-size-lg);
  font-weight: 700;
  text-align: left;
  color: var(--text-primary);
}

.content-letter {
  margin: var(--spacing-lg) 0;
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--bg-secondary);
  border-left: 4px solid var(--color-primary);
  font-style: italic;
  line-height: 1.8;
}

.content-table {
  margin: var(--spacing-lg) 0;
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: var(--spacing-md);
      border: 1px solid var(--border-color);
      text-align: left;
    }

    th {
      background-color: var(--bg-secondary);
      font-weight: 600;
    }
  }
}

// Reader Content Styles
.reader-content {
  .entry-title {
    margin: 0 0 var(--spacing-md) 0;
    font-size: var(--font-size-2xl);
    font-weight: 700;
    text-align: center;
  }

  .entry-date {
    text-align: right;
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    margin: 0 0 var(--spacing-md) 0;
  }

  .entry-header {
    text-align: left;
    color: var(--text-secondary);
    font-size: var(--font-size-base);
    margin: 0 0 var(--spacing-md) 0;
    font-style: italic;
  }

  .entry-source {
    text-align: right;
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    margin: 0 0 var(--spacing-lg) 0;
  }

  .entry-content {
    margin: var(--spacing-lg) 0;
    line-height: 1.8;
  }
}

// Daily Entry Alignment Styles
.daily-entry {
  .entry-title {
    text-align: center;
    margin: 0 0 var(--spacing-md) 0;
  }

  .entry-date {
    text-align: right;
    margin: 0 0 var(--spacing-md) 0;
  }

  .entry-header {
    text-align: left;
    margin: 0 0 var(--spacing-md) 0;
  }

  .entry-source {
    text-align: right;
    margin: 0 0 var(--spacing-lg) 0;
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
  }

  .entry-content {
    text-align: left;
  }
}

// Books Grid Styles
.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}

.book-card {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  &.book-card--active {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
  }

  .book-cover {
    width: 100%;
    aspect-ratio: 3 / 4;
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    color: white;
  }

  h3 {
    padding: var(--spacing-md) var(--spacing-md) 0;
    margin: 0;
    font-size: var(--font-size-base);
    line-height: 1.3;
  }

  p {
    padding: 0 var(--spacing-md) var(--spacing-md);
    margin: 0;
    color: var(--text-secondary);
    font-size: var(--font-size-xs);
    line-height: 1.4;
  }

  :deep(.q-btn) {
    width: calc(100% - var(--spacing-md) * 2);
    margin: var(--spacing-md);
  }
}

// Reader Styles
.reader-header {
  h2 {
    margin: 0;
  }
}

.chapter-selector {
  margin: var(--spacing-lg) 0;

  .chapter-select {
    width: 100%;
  }

  :deep(.part-title) {
    font-weight: 700;
    color: var(--color-primary);
    padding: var(--spacing-sm) 0;
  }

  :deep(.chapter-title) {
    color: var(--text-primary);
    padding-left: var(--spacing-md);
  }
}

.reader-controls-top {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin: var(--spacing-lg) 0;

  .entry-counter {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
  }
}

.reader-content {
  padding: var(--spacing-lg) 0;

  h3 {
    margin: 0 0 var(--spacing-md) 0;
    font-size: var(--font-size-xl);
  }

  .entry-date {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    margin: 0 0 var(--spacing-md) 0;
    font-weight: 600;
  }

  .entry-header {
    color: var(--text-secondary);
    font-size: var(--font-size-base);
    margin: 0 0 var(--spacing-md) 0;
    font-style: italic;
  }

  .entry-text {
    line-height: 1.8;
    margin-bottom: var(--spacing-lg);
  }

  .entry-source {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    margin: 0;
  }
}

.reader-navigation {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-2xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-color);

  .nav-btn {
    &--prev {
      order: -1;
    }

    &--next {
      order: 1;
    }
  }
}

// Highlight styles for bookmarks
mark.highlight {
  background-color: #e8e8e8;
  border-radius: 3px;
  border: 1px solid #cccccc;
  padding: 0;
  margin: 0;
  display: inline;
}

// Responsive
@media (max-width: 600px) {
  .hero-section {
    min-height: 200px;
    padding: var(--spacing-xl) var(--spacing-md);
  }

  .hero-content {
    h1 {
      font-size: var(--font-size-2xl);
    }

    p {
      font-size: var(--font-size-base);
    }
  }

  .content-section {
    padding: var(--spacing-xl) var(--spacing-md);
  }

  .daily-controls {
    flex-direction: column;

    .date-dropdown {
      width: 100%;
    }
  }

  .reader-header {
    flex-direction: column;
    align-items: flex-start;

    .reader-controls {
      width: 100%;
      justify-content: space-between;
    }
  }
}
</style>

