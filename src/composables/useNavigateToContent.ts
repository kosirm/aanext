import { useBooksStore } from 'src/stores/books';
import type { NavigationTarget } from 'src/types/book';

/**
 * Composable for navigating to bookmarks or search results
 * Handles both dnevna razmatranja and book content
 * Reusable for bookmarks and search results
 */
export const useNavigateToContent = () => {
  const booksStore = useBooksStore();

  /**
   * Navigate to a specific content location
   * Works for both bookmarks and search results
   */
  const navigateTo = async (target: NavigationTarget): Promise<boolean> => {
    try {
      if (target.type === 'dnevna_razmatranja') {
        return navigateToDnevna(target.date || '');
      } else if (target.type === 'book') {
        return navigateToBook(target.bookId || '', target.chapterId || '');
      }
      return false;
    } catch (error) {
      console.error('Navigation error:', error);
      return false;
    }
  };

  /**
   * Navigate to dnevna razmatranja entry by date
   */
  const navigateToDnevna = async (date: string): Promise<boolean> => {
    if (!date) return false;

    // Find the dnevna razmatranja book
    const dailyBook = booksStore.books.find((b) => b.bookTitle === 'DNEVNA RAZMATRANJA');
    if (!dailyBook) return false;

    // Find chapter by date
    for (const part of dailyBook.bookParts) {
      const chapter = part.chapters.find((c) => c.chapterDateObject === date);
      if (chapter) {
        booksStore.setCurrentBook('dnevna-razmatranja');
        booksStore.setCurrentChapter(chapter.chapterId);
        
        // Scroll to content after navigation
        await scrollToContent('.entry-content');
        return true;
      }
    }
    return false;
  };

  /**
   * Navigate to book chapter
   */
  const navigateToBook = async (bookId: string, chapterId: string): Promise<boolean> => {
    if (!bookId || !chapterId) return false;

    // Set current book
    booksStore.setCurrentBook(bookId);

    // Set current chapter
    booksStore.setCurrentChapter(chapterId);

    // Scroll to content after navigation
    await scrollToContent('.entry-content');
    return true;
  };

  /**
   * Scroll to content element with smooth behavior
   */
  const scrollToContent = async (selector: string): Promise<void> => {
    // Wait for DOM to update
    await new Promise((resolve) => setTimeout(resolve, 100));

    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  /**
   * Highlight text in content
   * Used for both bookmarks and search results
   */
  const highlightText = (textToFind: string, className: string = 'highlight'): boolean => {
    const contentElement = document.querySelector('.entry-content');
    if (!contentElement || !textToFind) return false;

    const walker = document.createTreeWalker(
      contentElement,
      NodeFilter.SHOW_TEXT,
      null
    );

    let node;
    let found = false;
    const nodesToReplace: Array<{ node: Node; parent: Node }> = [];

    while ((node = walker.nextNode())) {
      const text = node.textContent || '';
      if (text.includes(textToFind)) {
        nodesToReplace.push({ node, parent: node.parentNode! });
        found = true;
      }
    }

    // Replace nodes with highlighted versions
    nodesToReplace.forEach(({ node, parent }) => {
      const text = node.textContent || '';
      const regex = new RegExp(`(${textToFind.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      const html = text.replace(regex, `<mark class="${className}">$1</mark>`);
      
      const span = document.createElement('span');
      span.innerHTML = html;
      parent.replaceChild(span, node);
    });

    return found;
  };

  /**
   * Clear all highlights
   */
  const clearHighlights = (className: string = 'highlight'): void => {
    const marks = document.querySelectorAll(`mark.${className}`);
    marks.forEach((mark) => {
      const parent = mark.parentNode;
      if (parent) {
        while (mark.firstChild) {
          parent.insertBefore(mark.firstChild, mark);
        }
        parent.removeChild(mark);
      }
    });
  };

  return {
    navigateTo,
    navigateToDnevna,
    navigateToBook,
    scrollToContent,
    highlightText,
    clearHighlights,
  };
};

