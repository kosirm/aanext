<template>
  <div class="bookmark-manager">
    <!-- Header -->
    <div class="bookmark-header">
      <h3 class="oznakeTitle">Oznake</h3>
      <div class="header-actions">
        <!-- Search Toggle Button -->
        <q-btn
          icon="search"
          flat
          round
          dense
          @click="showSearch = !showSearch"
          :color="showSearch ? 'primary' : 'inherit'"
        />
        <!-- Import/Export Button -->
        <q-btn
          icon="swap_vert"
          flat
          round
          dense
          @click="showImportExportDialog = true"
        />
        <!-- Delete All Button -->
        <q-btn
          icon="delete_sweep"
          flat
          round
          dense
          @click="deleteAllBookmarks"
          :disable="filteredBookmarks.length === 0"
        />
      </div>
    </div>

    <!-- Search Input (Hidden by default) -->
    <q-input
      v-if="showSearch"
      v-model="searchQuery"
      outlined
      dense
      placeholder="Pretraži oznake..."
      class="q-ma-md"
      autofocus
    >
      <template #prepend>
        <q-icon name="search" />
      </template>
    </q-input>

    <!-- Bookmarks List -->
    <div v-if="filteredBookmarks.length > 0" class="bookmarks-list">
      <!-- Dnevna Razmatranja Bookmarks -->
      <div v-if="dnevnaBookmarks.length > 0" class="bookmark-group">
        <div class="group-header" @click="toggleGroup('dnevna')">
          <q-icon :name="expandedGroups.dnevna ? 'expand_less' : 'expand_more'" />
          <span>Dnevna Razmatranja ({{ dnevnaBookmarks.length }} oznaka)</span>
        </div>
        <div v-if="expandedGroups.dnevna" class="group-items">
          <div
            v-for="bookmark in dnevnaBookmarks"
            :key="bookmark.id"
            class="bookmark-item"
            @click="navigateToBookmark(bookmark)"
          >
            <div class="bookmark-content">
              <div class="bookmark-date">{{ bookmark.dateString }}</div>
              <div class="bookmark-text">{{ bookmark.selectedText }}</div>
              <div v-if="bookmark.comment" class="bookmark-comment">
                {{ bookmark.comment }}
              </div>
            </div>
            <q-btn
              icon="delete"
              flat
              round
              dense
              size="sm"
              @click.stop="removeBookmark(bookmark.id)"
            />
          </div>
        </div>
      </div>

      <!-- Book Bookmarks (grouped by book) -->
      <div v-for="book in booksByTitle" :key="book.bookId" class="bookmark-group">
        <div class="group-header" @click="toggleGroup(book.bookId)">
          <q-icon :name="expandedGroups[book.bookId] ? 'expand_less' : 'expand_more'" />
          <span>{{ book.bookTitle }} ({{ book.bookmarks.length }} oznaka)</span>
        </div>
        <div v-if="expandedGroups[book.bookId]" class="group-items">
          <div
            v-for="bookmark in book.bookmarks"
            :key="bookmark.id"
            class="bookmark-item"
            @click="navigateToBookmark(bookmark)"
          >
            <div class="bookmark-content">
              <div class="bookmark-chapter">{{ bookmark.chapterTitle }}</div>
              <div class="bookmark-text">{{ bookmark.selectedText }}</div>
              <div v-if="bookmark.comment" class="bookmark-comment">
                {{ bookmark.comment }}
              </div>
            </div>
            <q-btn
              icon="delete"
              flat
              round
              dense
              size="sm"
              @click.stop="removeBookmark(bookmark.id)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <q-icon name="bookmark_border" size="48px" />
      <p>Nema oznaka</p>
      <p class="text-caption">Odaberi tekst u knjizi ili dnevnim razmatrajima i kreiraj oznaku.</p>
    </div>

    <!-- Import/Export Dialog -->
    <q-dialog v-model="showImportExportDialog">
      <q-card style="min-width: 300px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Import/Export Oznaka</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="row gap-md">
            <q-btn
              label="Export"
              icon="download"
              color="primary"
              @click="exportBookmarks"
              class="col"
            />
            <q-btn
              label="Import"
              icon="upload"
              color="primary"
              @click="importBookmarks"
              class="col"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useBooksStore } from 'src/stores/books';
import { useNavigationStore } from 'src/stores/navigation';
import { useNavigateToContent } from 'src/composables/useNavigateToContent';
import type { Bookmark, NavigationTarget } from 'src/types/book';

defineEmits<{
  close: [];
}>();

const router = useRouter();
const booksStore = useBooksStore();
const navigationStore = useNavigationStore();
const { navigateTo } = useNavigateToContent();

const searchQuery = ref('');
const showSearch = ref(false);
const showImportExportDialog = ref(false);
const expandedGroups = ref<Record<string, boolean>>({
  dnevna: true,
});

// Filter bookmarks by search query
const filteredBookmarks = computed(() => {
  if (!searchQuery.value) return booksStore.bookmarksList;

  const query = searchQuery.value.toLowerCase();
  return booksStore.bookmarksList.filter(
    (b) =>
      b.selectedText.toLowerCase().includes(query) ||
      b.comment?.toLowerCase().includes(query) ||
      b.chapterTitle?.toLowerCase().includes(query) ||
      b.dateString?.toLowerCase().includes(query)
  );
});

// Dnevna razmatranja bookmarks
const dnevnaBookmarks = computed(() => {
  return filteredBookmarks.value.filter((b) => b.type === 'dnevna_razmatranja');
});

// Book bookmarks grouped by book
const booksByTitle = computed(() => {
  const grouped: Record<string, { bookId: string; bookTitle: string; bookmarks: Bookmark[] }> = {};

  filteredBookmarks.value
    .filter((b) => b.type === 'book')
    .forEach((bookmark) => {
      const key = bookmark.bookId || 'unknown';
      if (!grouped[key]) {
        grouped[key] = {
          bookId: key,
          bookTitle: bookmark.bookTitle || 'Unknown',
          bookmarks: [],
        };
      }
      grouped[key].bookmarks.push(bookmark);
    });

  return Object.values(grouped);
});

// Toggle group expansion
const toggleGroup = (groupId: string) => {
  expandedGroups.value[groupId] = !expandedGroups.value[groupId];
};

// Navigate to bookmark
const navigateToBookmark = async (bookmark: Bookmark) => {
  // First, navigate to Literatura page if not already there
  if (navigationStore.currentPage !== 'literatura') {
    await router.push('/literatura');
    // Wait for page to load
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  const target: NavigationTarget = {
    type: bookmark.type,
    textToHighlight: bookmark.selectedText,
  };

  if (bookmark.type === 'dnevna_razmatranja' && bookmark.date) {
    target.date = bookmark.date;
  } else if (bookmark.type === 'book') {
    if (bookmark.bookId) target.bookId = bookmark.bookId;
    if (bookmark.chapterId) target.chapterId = bookmark.chapterId;
  }

  await navigateTo(target);
};

// Remove bookmark
const removeBookmark = (bookmarkId: string) => {
  booksStore.removeBookmark(bookmarkId);
};

// Delete all bookmarks
const deleteAllBookmarks = () => {
  if (confirm('Jeste li sigurni da želite obrisati sve oznake?')) {
    booksStore.deleteAllBookmarks();
    showImportExportDialog.value = false;
  }
};

// Export bookmarks
const exportBookmarks = () => {
  const data = JSON.stringify(booksStore.bookmarksList, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `oznake-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showImportExportDialog.value = false;
};

// Import bookmarks
const importBookmarks = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          if (Array.isArray(data)) {
            // Add imported bookmarks to store
            data.forEach((bookmark: Bookmark) => {
              booksStore.addBookmark(bookmark);
            });
            showImportExportDialog.value = false;
          }
        } catch (error) {
          console.error('Error importing bookmarks:', error);
          alert('Greška pri učitavanju oznaka');
        }
      };
      reader.readAsText(file);
    }
  };
  input.click();
};
</script>

<style scoped lang="scss">
.bookmark-manager {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--bg-primary);
}

.bookmark-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);

  h3 {
    margin: 0;
    font-size: var(--font-size-lg);
    flex: 1;
  }
}

.header-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.bookmarks-list {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md);
}

.bookmark-group {
  margin-bottom: var(--spacing-lg);
}

.group-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  user-select: none;
  font-weight: 600;

  &:hover {
    background-color: var(--bg-tertiary);
  }
}

.group-items {
  margin-top: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.bookmark-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--bg-tertiary);
    transform: translateX(4px);
  }
}

.bookmark-content {
  flex: 1;
  min-width: 0;
}

.bookmark-date,
.bookmark-chapter {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--spacing-xs);
}

.bookmark-text {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
  word-break: break-word;
}

.bookmark-comment {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-style: italic;
  margin-top: var(--spacing-xs);
}
.oznakeTitle {
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  color: var(--color-primary);
}
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-secondary);

  p {
    margin: var(--spacing-md) 0 0 0;
  }

  .text-caption {
    font-size: var(--font-size-sm);
    text-align: center;
    padding-top: 30px;
    max-width: 80%;
    margin: auto;
  }
}
</style>

