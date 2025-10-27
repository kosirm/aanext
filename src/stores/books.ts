import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { UnifiedBook, BookChapter, Bookmark } from 'src/types/book';

// Track last opened book and chapter
export interface LastReadState {
  bookId: string | null;
  chapterId: string | null;
  timestamp: number;
}

// Track last read chapter for each book
export interface BookReadState {
  [bookId: string]: {
    chapterId: string;
    timestamp: number;
  };
}

export const useBooksStore = defineStore('books', () => {
  // State
  const books = ref<UnifiedBook[]>([]);
  const currentBookId = ref<string | null>(null);
  const currentChapterId = ref<string | null>(null);
  const bookmarksList = ref<Bookmark[]>([]); // New comprehensive bookmarks list
  const lastRead = ref<LastReadState>({
    bookId: null,
    chapterId: null,
    timestamp: 0,
  });
  const bookReadStates = ref<BookReadState>({}); // Track last read chapter for each book
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Load bookmarks from localStorage
  const loadBookmarks = () => {
    const saved = localStorage.getItem('aa-bookmarks-list');
    if (saved) {
      try {
        bookmarksList.value = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load bookmarks:', e);
      }
    }
  };

  // Load last read state from localStorage
  const loadLastRead = () => {
    const saved = localStorage.getItem('aa-last-read');
    if (saved) {
      try {
        lastRead.value = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load last read state:', e);
      }
    }
  };

  // Load book read states from localStorage
  const loadBookReadStates = () => {
    const saved = localStorage.getItem('aa-book-read-states');
    if (saved) {
      try {
        bookReadStates.value = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load book read states:', e);
      }
    }
  };

  // Save book read states to localStorage
  const saveBookReadStates = () => {
    localStorage.setItem('aa-book-read-states', JSON.stringify(bookReadStates.value));
  };

  // Save bookmarks to localStorage
  const saveBookmarks = () => {
    localStorage.setItem('aa-bookmarks-list', JSON.stringify(bookmarksList.value));
  };

  // Save last read state to localStorage
  const saveLastRead = () => {
    lastRead.value.timestamp = Date.now();
    localStorage.setItem('aa-last-read', JSON.stringify(lastRead.value));
  };

  // Get book ID from title
  const getBookId = (bookTitle: string): string => {
    return bookTitle
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  // Get all chapters from a book (flattened from all parts)
  const getAllChapters = (book: UnifiedBook): BookChapter[] => {
    const chapters: BookChapter[] = [];
    book.bookParts.forEach((part) => {
      chapters.push(...part.chapters);
    });
    return chapters;
  };

  // Load books from JSON files
  const loadBooks = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      // Load bookmarks and last read state first
      loadBookmarks();
      loadLastRead();
      loadBookReadStates();

      // Load all books
      const bookIds = [
        'dnevna-razmatranja',
        '12-koraka',
        '12-tradicija',
        'anonimni-alkoholičari',
        'živjeti-trijezno',
      ];

      const loadedBooks: UnifiedBook[] = [];
      for (const bookId of bookIds) {
        try {
          const response = await fetch(`/assets/books/${bookId}.json`);
          if (response.ok) {
            const book = (await response.json()) as UnifiedBook;
            loadedBooks.push(book);
          }
        } catch (e) {
          console.warn(`Failed to load book ${bookId}:`, e);
        }
      }

      books.value = loadedBooks;

      // Restore last read state if available
      if (lastRead.value.bookId && lastRead.value.chapterId) {
        const lastBook = loadedBooks.find(
          (b) => getBookId(b.bookTitle) === lastRead.value.bookId
        );
        if (lastBook) {
          currentBookId.value = getBookId(lastBook.bookTitle);
          const allChapters = getAllChapters(lastBook);
          const lastChapter = allChapters.find(
            (c) => c.chapterId === lastRead.value.chapterId
          );
          if (lastChapter) {
            currentChapterId.value = lastChapter.chapterId;
          }
        }
      } else if (loadedBooks.length > 0) {
        // Default to first non-daily book if no last read state
        const firstBook = loadedBooks.find((b) => b.bookTitle !== 'DNEVNA RAZMATRANJA');
        if (firstBook) {
          currentBookId.value = getBookId(firstBook.bookTitle);
          const firstChapters = getAllChapters(firstBook);
          if (firstChapters.length > 0 && firstChapters[0]) {
            currentChapterId.value = firstChapters[0].chapterId;
          }
        }
      }
    } catch (e) {
      error.value = `Failed to load books: ${String(e)}`;
      console.error(error.value);
    } finally {
      isLoading.value = false;
    }
  };

  // Setters
  const setCurrentBook = (bookId: string) => {
    const book = books.value.find((b) => getBookId(b.bookTitle) === bookId);
    if (book) {
      currentBookId.value = bookId;
      const chapters = getAllChapters(book);

      // Check if there's a saved chapter for this book
      const savedChapterId = bookReadStates.value[bookId]?.chapterId;

      if (chapters.length > 0 && chapters[0]) {
        let chapterToLoad = chapters[0];

        // If there's a saved chapter, try to use it
        if (savedChapterId) {
          const savedChapter = chapters.find((c) => c.chapterId === savedChapterId);
          if (savedChapter) {
            chapterToLoad = savedChapter;
          }
        }

        currentChapterId.value = chapterToLoad.chapterId;
        lastRead.value.bookId = bookId;
        lastRead.value.chapterId = chapterToLoad.chapterId;
        saveLastRead();
      }
    }
  };

  const setCurrentChapter = (chapterId: string) => {
    currentChapterId.value = chapterId;
    if (currentBookId.value) {
      lastRead.value.bookId = currentBookId.value;
      lastRead.value.chapterId = chapterId;
      saveLastRead();

      // Also save to per-book read states
      bookReadStates.value[currentBookId.value] = {
        chapterId: chapterId,
        timestamp: Date.now(),
      };
      saveBookReadStates();
    }
  };

  // Bookmark methods
  const addBookmark = (bookmark: Omit<Bookmark, 'id' | 'timestamp'>): Bookmark => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      timestamp: Date.now(),
    };
    bookmarksList.value.unshift(newBookmark); // Add to beginning
    saveBookmarks();
    return newBookmark;
  };

  const removeBookmark = (bookmarkId: string): boolean => {
    const index = bookmarksList.value.findIndex((b) => b.id === bookmarkId);
    if (index !== -1) {
      bookmarksList.value.splice(index, 1);
      saveBookmarks();
      return true;
    }
    return false;
  };

  const updateBookmark = (bookmarkId: string, updates: Partial<Bookmark>): boolean => {
    const bookmark = bookmarksList.value.find((b) => b.id === bookmarkId);
    if (bookmark) {
      Object.assign(bookmark, updates);
      saveBookmarks();
      return true;
    }
    return false;
  };

  const getBookmarksByBook = (bookId: string): Bookmark[] => {
    return bookmarksList.value.filter((b) => b.type === 'book' && b.bookId === bookId);
  };

  const getBookmarksByDate = (date: string): Bookmark[] => {
    return bookmarksList.value.filter((b) => b.type === 'dnevna_razmatranja' && b.date === date);
  };

  const getAllBookmarks = (): Bookmark[] => {
    return bookmarksList.value;
  };

  const deleteAllBookmarks = (): void => {
    bookmarksList.value = [];
    saveBookmarks();
  };

  // Computed properties
  const currentBook = computed(() => {
    return books.value.find((b) => getBookId(b.bookTitle) === currentBookId.value);
  });

  const allCurrentChapters = computed(() => {
    if (!currentBook.value) return [];
    return getAllChapters(currentBook.value);
  });

  const currentChapter = computed(() => {
    return allCurrentChapters.value.find((c) => c.chapterId === currentChapterId.value);
  });

  const currentChapterIndex = computed(() => {
    if (!currentChapterId.value) return -1;
    return allCurrentChapters.value.findIndex((c) => c.chapterId === currentChapterId.value);
  });

  const hasNextChapter = computed(() => {
    return currentChapterIndex.value < allCurrentChapters.value.length - 1;
  });

  const hasPreviousChapter = computed(() => {
    return currentChapterIndex.value > 0;
  });

  // Navigation methods
  const nextChapter = () => {
    if (hasNextChapter.value) {
      const nextIndex = currentChapterIndex.value + 1;
      const nextChapter = allCurrentChapters.value[nextIndex];
      if (nextChapter) {
        setCurrentChapter(nextChapter.chapterId);
      }
    }
  };

  const previousChapter = () => {
    if (hasPreviousChapter.value) {
      const prevIndex = currentChapterIndex.value - 1;
      const prevChapter = allCurrentChapters.value[prevIndex];
      if (prevChapter) {
        setCurrentChapter(prevChapter.chapterId);
      }
    }
  };

  return {
    // State
    books,
    currentBookId,
    currentChapterId,
    bookmarksList,
    lastRead,
    isLoading,
    error,
    // Methods
    loadBooks,
    loadBookmarks,
    saveBookmarks,
    loadLastRead,
    saveLastRead,
    setCurrentBook,
    setCurrentChapter,
    addBookmark,
    removeBookmark,
    updateBookmark,
    getBookmarksByBook,
    getBookmarksByDate,
    getAllBookmarks,
    deleteAllBookmarks,
    nextChapter,
    previousChapter,
    // Computed
    currentBook,
    currentChapter,
    allCurrentChapters,
    currentChapterIndex,
    hasNextChapter,
    hasPreviousChapter,
  };
});

