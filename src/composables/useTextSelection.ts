import { ref, computed } from 'vue';

export interface SelectionInfo {
  text: string;
  x: number;
  y: number;
  isActive: boolean;
}

/**
 * Composable for detecting text selection in content areas
 * Used for bookmarks and search result highlighting
 * Reusable for both dnevna razmatranja and book content
 *
 * Uses selectionchange event (like old site) for reliable mobile detection
 */
export const useTextSelection = () => {
  const selectionInfo = ref<SelectionInfo>({
    text: '',
    x: 0,
    y: 0,
    isActive: false,
  });

  const selectedText = computed(() => selectionInfo.value.text);
  const isSelectionActive = computed(() => selectionInfo.value.isActive);

  // Track the selection text from the last time we showed the menu
  let lastShownSelectionText = '';
  // Store timeout to prevent multiple triggers
  let selectionTimeout: ReturnType<typeof setTimeout> | null = null;
  // Track if menu is currently shown to detect when user is dragging selection handles
  let isMenuCurrentlyShown = false;

  /**
   * Check if selection is within allowed content areas
   */
  const isSelectionInContentArea = (): boolean => {
    const selection = window.getSelection();
    if (!selection || selection.toString().length === 0) {
      console.log('[useTextSelection] No selection or empty selection');
      return false;
    }

    const selectedNode = selection.anchorNode;
    if (!selectedNode) {
      console.log('[useTextSelection] No selected node');
      return false;
    }

    // Check if selection is in dnevna razmatranja (entire daily-entry section)
    const dailyEntry = document.querySelector('.daily-entry');
    console.log('[useTextSelection] Daily entry element:', dailyEntry);
    if (dailyEntry && dailyEntry.contains(selectedNode)) {
      console.log('[useTextSelection] Selection is in daily entry');
      return true;
    }

    // Check if selection is in book reader content
    const bookContent = document.querySelector('.reader-content .entry-content');
    console.log('[useTextSelection] Book content element:', bookContent);
    if (bookContent && bookContent.contains(selectedNode)) {
      console.log('[useTextSelection] Selection is in book content');
      return true;
    }

    console.log('[useTextSelection] Selection is NOT in allowed content areas');
    return false;
  };



  /**
   * Check if device is mobile
   */
  const isMobileDevice = (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || !!(navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
  };

  /**
   * Handle selection change event - main event for detecting text selection
   * Uses delay to avoid interference with selection dragging (like old site)
   */
  const handleSelectionChange = () => {
    console.log('[useTextSelection] handleSelectionChange called, menu currently shown:', isMenuCurrentlyShown);

    const selection = window.getSelection();

    if (!selection || selection.toString().trim().length === 0) {
      console.log('[useTextSelection] No selection or empty selection');
      // Clear any existing timeout
      if (selectionTimeout) {
        clearTimeout(selectionTimeout);
        selectionTimeout = null;
      }
      selectionInfo.value.isActive = false;
      lastShownSelectionText = '';
      isMenuCurrentlyShown = false;
      return;
    }

    // Check if selection is within allowed content areas
    if (!isSelectionInContentArea()) {
      console.log('[useTextSelection] Selection not in content area');
      if (selectionTimeout) {
        clearTimeout(selectionTimeout);
        selectionTimeout = null;
      }
      selectionInfo.value.isActive = false;
      lastShownSelectionText = '';
      isMenuCurrentlyShown = false;
      return;
    }

    // If menu is currently shown and selection changed, hide it immediately
    // This happens when user is dragging the selection handles (blue tears)
    if (isMenuCurrentlyShown) {
      console.log('[useTextSelection] Menu is shown and selection changed - hiding menu temporarily');
      selectionInfo.value.isActive = false;
      isMenuCurrentlyShown = false;
    }

    // Clear any existing timeout to prevent multiple triggers
    if (selectionTimeout) {
      clearTimeout(selectionTimeout);
      console.log('[useTextSelection] Cleared existing timeout');
    }

    // Use longer delay on mobile to avoid interference with selection dragging
    const delay = isMobileDevice() ? 800 : 300;
    console.log('[useTextSelection] Setting delay:', delay, 'ms');

    // Show floating action menu after a delay
    selectionTimeout = setTimeout(() => {
      console.log('[useTextSelection] Timeout fired - checking selection');

      const currentSelection = window.getSelection();
      const hasSelection = currentSelection && currentSelection.toString().trim().length > 0;

      if (hasSelection) {
        console.log('[useTextSelection] Selection still active - showing menu');
        handleTextSelection();
      } else {
        console.log('[useTextSelection] Selection lost during timeout');
        selectionInfo.value.isActive = false;
        lastShownSelectionText = '';
        isMenuCurrentlyShown = false;
      }
      selectionTimeout = null;
    }, delay);
  };

  /**
   * Handle text selection - called from handleSelectionChange after delay
   */
  const handleTextSelection = () => {
    console.log('[useTextSelection] handleTextSelection called');

    const selection = window.getSelection();

    if (!selection || selection.toString().length === 0) {
      console.log('[useTextSelection] No selection');
      selectionInfo.value.isActive = false;
      lastShownSelectionText = '';
      return;
    }

    const selectedString = selection.toString().trim();
    console.log('[useTextSelection] Selection text length:', selectedString.length);

    // Check if selection is within allowed content areas
    if (!isSelectionInContentArea()) {
      console.log('[useTextSelection] Selection not in content area');
      selectionInfo.value.isActive = false;
      lastShownSelectionText = '';
      return;
    }

    if (selectedString.length === 0) {
      console.log('[useTextSelection] Selected string is empty after trim');
      selectionInfo.value.isActive = false;
      lastShownSelectionText = '';
      return;
    }

    // Check if this is the same selection as before (e.g., from scrolling)
    if (selectedString === lastShownSelectionText) {
      console.log('[useTextSelection] Same selection as before - not showing menu again');
      return;
    }

    // Get selection position for floating menu (below the selection)
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // Position menu below the selection
    const x = rect.left + window.scrollX + rect.width / 2 - 100; // Center horizontally
    // On mobile, add more gap to avoid selection handles (blue tears) hovering over menu
    const verticalGap = isMobileDevice() ? 30 : 10;
    const y = rect.bottom + window.scrollY + verticalGap; // Below selection with gap

    console.log('[useTextSelection] Setting selection info:', {
      text: selectedString,
      x: Math.max(10, x),
      y: y,
      isActive: true,
    });

    lastShownSelectionText = selectedString;
    selectionInfo.value = {
      text: selectedString,
      x: Math.max(10, x), // Ensure menu doesn't go off-screen left
      y: y,
      isActive: true,
    };
    // Mark that menu is now shown
    isMenuCurrentlyShown = true;
    console.log('[useTextSelection] Menu is now shown');
  };

  /**
   * Handle context menu - just prevent default
   * The selectionchange event will handle showing the menu
   */
  const handleContextMenu = (e: MouseEvent) => {
    console.log('[useTextSelection] handleContextMenu called');
    const selection = window.getSelection();

    if (!selection || selection.toString().length === 0) {
      console.log('[useTextSelection] No selection in context menu');
      return;
    }

    // Check if selection is within allowed content areas
    if (!isSelectionInContentArea()) {
      console.log('[useTextSelection] Context menu selection not in content area');
      return;
    }

    // Prevent default context menu
    console.log('[useTextSelection] Preventing default context menu');
    e.preventDefault();
    e.stopPropagation();

    // selectionchange event will handle showing the menu
  };

  /**
   * Clear selection
   */
  const clearSelection = () => {
    selectionInfo.value.isActive = false;
    selectionInfo.value.text = '';
    lastShownSelectionText = '';
    isMenuCurrentlyShown = false;
    window.getSelection()?.removeAllRanges();
    console.log('[useTextSelection] Selection cleared');
  };

  /**
   * Get selected text (max 500 chars for storage)
   */
  const getTruncatedSelectedText = (maxLength: number = 500): string => {
    return selectedText.value.substring(0, maxLength);
  };

  return {
    selectionInfo,
    selectedText,
    isSelectionActive,
    handleTextSelection,
    handleContextMenu,
    handleSelectionChange,
    clearSelection,
    getTruncatedSelectedText,
  };
};

