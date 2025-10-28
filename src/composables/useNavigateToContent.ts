import { useRouter } from 'vue-router';
import { nextTick } from 'vue';
import { useBooksStore } from 'src/stores/books';
import { useNavigationStore } from 'src/stores/navigation';
import type { NavigationTarget } from 'src/types/book';

/**
 * Composable for navigating to bookmarks or search results
 * Handles both dnevna razmatranja and book content
 * Reusable for bookmarks and search results
 */
export const useNavigateToContent = () => {
  const router = useRouter();
  const booksStore = useBooksStore();
  const navigationStore = useNavigationStore();

  /**
   * Navigate to a specific content location
   * Works for both bookmarks and search results
   * IMPORTANT: Highlight is created BEFORE router navigation
   */
  const navigateTo = async (target: NavigationTarget): Promise<boolean> => {
    try {
      // Start fade animation
      navigationStore.isNavigating = true;

      if (target.type === 'dnevna_razmatranja') {
        const success = await navigateToDnevna(target.date || '');
        if (success && target.textToHighlight) {
          // Clear any existing highlights first
          clearHighlights();
          // Wait for DOM to update and then highlight
          await new Promise((resolve) => setTimeout(resolve, 300));
          console.log('[useNavigateToContent] Creating dnevna highlight');
          const highlightId = highlightText(target.textToHighlight);
          console.log('[useNavigateToContent] Dnevna highlight created:', highlightId);
          if (highlightId) {
            // NOW navigate to the highlighted text (element already exists)
            await scrollToHighlight(highlightId);
          }
        }
        // End fade animation
        navigationStore.isNavigating = false;
        return success;
      } else if (target.type === 'book') {
        const success = await navigateToBook(target.bookId || '', target.chapterId || '');
        if (success && target.textToHighlight) {
          // Clear any existing highlights first
          clearHighlights();
          // Wait for DOM to update and then highlight (longer delay for books)
          await new Promise((resolve) => setTimeout(resolve, 500));
          console.log('[useNavigateToContent] Creating book highlight for text:', target.textToHighlight.substring(0, 50));
          const highlightId = highlightText(target.textToHighlight);
          console.log('[useNavigateToContent] Book highlight created:', highlightId);
          if (highlightId) {
            // NOW navigate to the highlighted text (element already exists)
            await scrollToHighlight(highlightId);
          }
        }
        // End fade animation
        navigationStore.isNavigating = false;
        return success;
      }
      // End fade animation
      navigationStore.isNavigating = false;
      return false;
    } catch (error) {
      console.error('Navigation error:', error);
      // End fade animation on error
      navigationStore.isNavigating = false;
      return false;
    }
  };

  /**
   * Navigate to dnevna razmatranja entry by date
   * Also dispatches a custom event so the page can update selectedDate
   * NOTE: We do NOT set currentBook for dnevna razmatranja to avoid showing it in book reader
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
        // Dispatch custom event to notify page to update selectedDate
        // This will display the dnevna razmatranja in the dnevna section, not in book reader
        window.dispatchEvent(new CustomEvent('navigate-to-dnevna', { detail: { date } }));

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
    console.log('[navigateToBook] START - bookId:', bookId, 'chapterId:', chapterId);

    if (!bookId || !chapterId) {
      console.log('[navigateToBook] FAILED - missing bookId or chapterId');
      return false;
    }

    console.log('[navigateToBook] Setting current book:', bookId);
    booksStore.setCurrentBook(bookId);

    console.log('[navigateToBook] Setting current chapter:', chapterId);
    booksStore.setCurrentChapter(chapterId);

    console.log('[navigateToBook] Current book after set:', booksStore.currentBookId);
    console.log('[navigateToBook] Current chapter after set:', booksStore.currentChapterId);
    console.log('[navigateToBook] Current chapter content length:', booksStore.currentChapter?.content?.length);

    // Scroll to content after navigation
    console.log('[navigateToBook] Scrolling to content');
    await scrollToContent('.entry-content');

    console.log('[navigateToBook] END - SUCCESS');
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
   * Navigate to the highlighted element using router
   * This ensures the element exists before navigation
   */
  const scrollToHighlight = async (highlightId: string): Promise<void> => {
    console.log('[scrollToHighlight] START - Navigating to highlight ID:', highlightId);

    // Wait for Vue to finish rendering the highlight element
    console.log('[scrollToHighlight] Waiting for nextTick');
    await nextTick();

    // Additional wait to ensure DOM is fully updated
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Verify element exists before navigating
    const highlightedElement = document.getElementById(highlightId);
    console.log('[scrollToHighlight] Highlighted element found:', !!highlightedElement);

    if (highlightedElement) {
      console.log('[scrollToHighlight] Element exists in DOM, using router to navigate');
      console.log('[scrollToHighlight] Element tag:', highlightedElement.tagName);
      console.log('[scrollToHighlight] Element text:', highlightedElement.textContent?.substring(0, 50));

      // Get element position for debugging
      const rect = highlightedElement.getBoundingClientRect();
      console.log('[scrollToHighlight] Element position - top:', rect.top, 'left:', rect.left);
      console.log('[scrollToHighlight] Current scroll position - x:', window.scrollX, 'y:', window.scrollY);

      // Use router to navigate to the element
      // This is the proper way to navigate in Vue/Quasar apps
      console.log('[scrollToHighlight] Calling router.push with hash:', `#${highlightId}`);
      await router.push({ hash: `#${highlightId}` });

      // Check scroll position after router navigation
      await new Promise((resolve) => setTimeout(resolve, 100));
      console.log('[scrollToHighlight] After router navigation - scroll x:', window.scrollX, 'y:', window.scrollY);

      const rectAfter = highlightedElement.getBoundingClientRect();
      console.log('[scrollToHighlight] After router - element position - top:', rectAfter.top, 'left:', rectAfter.left);

      // If element is not in view after router navigation, manually scroll to it
      if (rectAfter.top > window.innerHeight || rectAfter.top < 0) {
        console.log('[scrollToHighlight] Element not in view, manually scrolling to it');
        const elementTop = highlightedElement.offsetTop;
        console.log('[scrollToHighlight] Element offsetTop:', elementTop);
        // Scroll with offset to center the element better on screen
        const scrollOffset = 150; // More offset for smoother appearance
        window.scrollTo({ top: Math.max(0, elementTop - scrollOffset), behavior: 'smooth' });
      } else {
        console.log('[scrollToHighlight] Element is in view');
      }

      console.log('[scrollToHighlight] Router navigation completed');
    } else {
      console.log('[scrollToHighlight] No highlighted element found');
    }
    console.log('[scrollToHighlight] END');
  };

  /**
   * Highlight text in content
   * Used for both bookmarks and search results
   * Handles partial matches across multiple nodes
   * Uses simple ID 'bookmark-highlight' for router navigation
   */
  const highlightText = (textToFind: string, className: string = 'highlight'): string | false => {
    console.log('=== [highlightText] START ===');

    // Use simple ID for router navigation
    const highlightId = 'bookmark-highlight';
    console.log('[highlightText] Using highlight ID:', highlightId);

    // Try to find the correct content element by checking which one contains the text
    let contentElement: Element | null = null;

    // Get all possible content elements
    const readerSection = document.querySelector('.reader-section');
    const dnevnaSection = document.querySelector('.dnevna-section');

    const readerContent = readerSection?.querySelector('.reader-content .entry-content');
    const dnevnaContent = dnevnaSection?.querySelector('.daily-entry .entry-content');

    console.log('[highlightText] Reader content exists:', !!readerContent);
    console.log('[highlightText] Dnevna content exists:', !!dnevnaContent);

    // Get normalized search text for comparison
    const normalizedSearchText = textToFind.trim().replace(/\s+/g, ' ');

    // Try to find which content element contains the text
    if (readerContent) {
      const readerText = (readerContent.textContent || '').replace(/\s+/g, ' ');
      if (readerText.includes(normalizedSearchText) || readerText.includes(normalizedSearchText.substring(0, 40))) {
        contentElement = readerContent;
        console.log('[highlightText] Text found in reader content');
      }
    }

    if (!contentElement && dnevnaContent) {
      const dnevnaText = (dnevnaContent.textContent || '').replace(/\s+/g, ' ');
      if (dnevnaText.includes(normalizedSearchText) || dnevnaText.includes(normalizedSearchText.substring(0, 40))) {
        contentElement = dnevnaContent;
        console.log('[highlightText] Text found in dnevna content');
      }
    }

    // If still not found, use generic selector as fallback
    if (!contentElement) {
      contentElement = document.querySelector('.entry-content');
      console.log('[highlightText] Using generic .entry-content selector as fallback');
    }

    console.log('[highlightText] Final content element found:', !!contentElement);
    console.log('[highlightText] Text to find:', textToFind);
    console.log('[highlightText] Text to find length:', textToFind.length);

    if (!contentElement || !textToFind) {
      console.log('[highlightText] FAILED: contentElement or textToFind missing');
      console.log('=== [highlightText] END (FAILED) ===');
      return false;
    }

    // normalizedSearchText is already defined above
    console.log('[highlightText] Normalized search text:', normalizedSearchText);
    console.log('[highlightText] Normalized search text length:', normalizedSearchText.length);

    // Get all text content and find the position
    const fullText = contentElement.textContent || '';
    const normalizedFullText = fullText.replace(/\s+/g, ' ');

    console.log('[highlightText] Full content length:', fullText.length);
    console.log('[highlightText] Full content first 200 chars:', fullText.substring(0, 200));
    console.log('[highlightText] Full content last 200 chars:', fullText.substring(Math.max(0, fullText.length - 200)));

    const searchIndex = normalizedFullText.indexOf(normalizedSearchText);
    console.log('[highlightText] Search index in normalized text:', searchIndex);

    // Log character codes to check for special characters
    console.log('[highlightText] First 10 chars of search text (codes):',
      Array.from(normalizedSearchText.substring(0, 10)).map(c => c.charCodeAt(0)));
    console.log('[highlightText] First 10 chars of content (codes):',
      Array.from(fullText.substring(0, 10)).map(c => c.charCodeAt(0)));

    let searchText = textToFind;
    if (searchIndex === -1) {
      // Try partial match - search for first 40 characters
      const partialSearch = normalizedSearchText.substring(0, 40);
      const partialIndex = normalizedFullText.indexOf(partialSearch);
      console.log('[highlightText] Partial search (40 chars) index:', partialIndex);

      if (partialIndex === -1) {
        // Try even shorter - first 20 characters
        const shorterSearch = normalizedSearchText.substring(0, 20);
        const shorterIndex = normalizedFullText.indexOf(shorterSearch);
        console.log('[highlightText] Shorter search (20 chars) index:', shorterIndex);

        if (shorterIndex === -1) {
          console.log('[highlightText] Text not found in content');
          return false;
        }
        searchText = shorterSearch;
      } else {
        searchText = partialSearch;
      }
    }

    // Use Range and TreeWalker to find and highlight the text
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
      const normalizedText = text.replace(/\s+/g, ' ');

      // Check both exact and normalized match
      if (text.includes(searchText) || normalizedText.includes(searchText.replace(/\s+/g, ' '))) {
        console.log('[highlightText] Found matching text node:', text.substring(0, 50));
        nodesToReplace.push({ node, parent: node.parentNode! });
        found = true;
      }
    }

    console.log('[highlightText] Nodes to replace:', nodesToReplace.length);

    // Replace nodes with highlighted versions
    nodesToReplace.forEach(({ node, parent }, index) => {
      const text = node.textContent || '';
      const normalizedText = text.replace(/\s+/g, ' ');

      // Create regex that handles whitespace variations
      const escapedSearch = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Match the search text with flexible whitespace
      const regex = new RegExp(`(${escapedSearch})`, 'gi');

      let html = text;
      if (text.includes(searchText)) {
        // Add id to the first mark element for anchor navigation
        const idAttr = index === 0 ? ` id="${highlightId}"` : '';
        html = text.replace(regex, `<mark class="${className}"${idAttr}>$1</mark>`);
      } else if (normalizedText.includes(searchText.replace(/\s+/g, ' '))) {
        // For normalized match, replace in normalized text then apply to original
        const normalizedRegex = new RegExp(`(${escapedSearch.replace(/\\\s/g, '\\s+')})`, 'gi');
        const idAttr = index === 0 ? ` id="${highlightId}"` : '';
        html = normalizedText.replace(normalizedRegex, `<mark class="${className}"${idAttr}>$1</mark>`);
      }

      const span = document.createElement('span');
      span.innerHTML = html;
      parent.replaceChild(span, node);
    });

    console.log('[highlightText] Highlighting complete. Found:', found);
    console.log('[highlightText] Returning highlight ID:', highlightId);
    return found ? highlightId : false;
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

