/**
 * Book Format Converter
 * Converts old book JSON formats to unified format
 */

import type {
  UnifiedBook,
  BookPart,
  BookChapter,
  BookContent,
  OldBook,
} from 'src/types/book';

/**
 * Parse old text array format to new content array
 * Old format: [{ subtitleBold: "..." }, { tx: "..." }, { letter: "..." }]
 * New format: [{ type: "subtitleBold", value: "..." }, { type: "text", value: "..." }]
 */
function parseTextArray(textArray: Array<Record<string, string>>): BookContent[] {
  if (!textArray || !Array.isArray(textArray)) {
    return [];
  }

  const result: BookContent[] = [];

  for (const item of textArray) {
    // Handle text
    if (item.tx) {
      result.push({ type: 'text', value: item.tx });
      continue;
    }
    // Handle bold subtitle
    if (item.subtitleBold) {
      result.push({ type: 'subtitleBold', value: item.subtitleBold });
      continue;
    }
    // Handle regular subtitle
    if (item.subtitle) {
      result.push({ type: 'subtitle', value: item.subtitle });
      continue;
    }
    // Handle letter
    if (item.letter) {
      result.push({ type: 'letter', value: item.letter });
      continue;
    }
    // Handle table header
    if (item.tableHeader) {
      const headers = Array.isArray(item.tableHeader)
        ? item.tableHeader
        : [item.tableHeader];
      result.push({ type: 'table', headers, rows: [] });
      continue;
    }
    // Handle table row
    if (item.tableRow) {
      const rows: string[][] = Array.isArray(item.tableRow[0])
        ? (item.tableRow as unknown as string[][])
        : [item.tableRow as unknown as string[]];
      result.push({ type: 'table', headers: [], rows });
      continue;
    }
  }

  return result;
}

/**
 * Convert standard book format (12_Koraka, 12_Tradicija, Živjeti_Trijezno)
 */
export function convertStandardBook(
  oldBooks: OldBook[],
  bookTitle: string,
  bookType: 'steps' | 'traditions' | 'guide'
): UnifiedBook {
  if (!oldBooks || oldBooks.length === 0) {
    throw new Error(`No data to convert for ${bookTitle}`);
  }

  // Standard books have single part
  const oldBook = oldBooks[0];
  if (!oldBook) {
    throw new Error(`No book data found for ${bookTitle}`);
  }

  const chapters: BookChapter[] = (oldBook.choices || []).map((choice) => ({
    chapterId: choice.id,
    chapterTitle: choice.title,
    content: parseTextArray(choice.text || []),
  }));

  const bookPart: BookPart = {
    partId: 1,
    partTitle: oldBook.label,
    chapters,
  };

  return {
    bookTitle,
    bookType,
    bookParts: [bookPart],
  };
}

/**
 * Convert daily reflections format (dnevna_razmatranja_full.json)
 *
 * Note: Includes Feb 29 for leap year support
 * Quasar QCalendar expects YYYY-MM-DD format
 */
export function convertDnevnaRazmatranja(oldBooks: OldBook[]): UnifiedBook {
  if (!oldBooks || oldBooks.length === 0) {
    throw new Error('No data to convert for Dnevna Razmatranja');
  }

  const bookParts: BookPart[] = oldBooks.map((oldBook, index) => {
    const chapters: BookChapter[] = (oldBook.choices || []).map((choice) => {
      // Convert old format [month, day] to YYYY-MM-DD for Quasar QCalendar
      // Using 2024 as reference year (leap year to support Feb 29)
      let dateString: string | undefined;
      if (choice.startDate && Array.isArray(choice.startDate) && choice.startDate.length >= 2) {
        const monthStr = choice.startDate[0];
        const dayStr = choice.startDate[1];
        if (monthStr !== undefined && dayStr !== undefined) {
          const month = String(parseInt(monthStr) + 1).padStart(2, '0');
          const day = String(dayStr).padStart(2, '0');
          dateString = `2024-${month}-${day}`;
        }
      }

      const content: BookContent[] = [];
      if (choice.text && typeof choice.text === 'string') {
        content.push({ type: 'text', value: choice.text });
      }

      const chapter: BookChapter = {
        chapterId: choice.id,
        chapterTitle: choice.title,
        chapterDateObject: dateString, // YYYY-MM-DD format for Quasar QCalendar
        chapterDateString: choice.date, // Display format (e.g., "1. SIJEČNJA")
        chapterHeader: choice.header,
        chapterSource: choice.source,
        content,
      };
      return chapter;
    });

    return {
      partId: index + 1,
      partTitle: oldBook.label, // Month name
      chapters,
    };
  });

  return {
    bookTitle: 'DNEVNA RAZMATRANJA',
    bookType: 'daily',
    bookParts,
  };
}

/**
 * Convert multi-part book format (Anonimni_Alkoholičari.json)
 */
export function convertAnonimniAlkoholičari(oldBooks: OldBook[]): UnifiedBook {
  if (!oldBooks || oldBooks.length === 0) {
    throw new Error('No data to convert for Anonimni Alkoholičari');
  }

  const bookParts: BookPart[] = oldBooks.map((oldBook, index) => {
    const chapters: BookChapter[] = (oldBook.choices || []).map((choice) => ({
      chapterId: choice.id,
      chapterTitle: choice.title,
      content: parseTextArray(choice.text || []),
    }));

    return {
      partId: index + 1,
      partTitle: oldBook.label,
      chapters,
    };
  });

  return {
    bookTitle: 'ANONIMNI ALKOHOLIČARI',
    bookType: 'guide',
    bookParts,
  };
}

/**
 * Auto-detect book type and convert
 */
export function convertBook(
  oldBooks: OldBook[],
  bookId: string
): UnifiedBook {
  // Detect book type by ID
  if (bookId.includes('dnevna')) {
    return convertDnevnaRazmatranja(oldBooks);
  }

  if (bookId.includes('anonimni')) {
    return convertAnonimniAlkoholičari(oldBooks);
  }

  if (bookId.includes('koraka')) {
    return convertStandardBook(oldBooks, '12 KORAKA', 'steps');
  }

  if (bookId.includes('tradicija')) {
    return convertStandardBook(oldBooks, '12 TRADICIJA', 'traditions');
  }

  if (bookId.includes('trijezno')) {
    return convertStandardBook(oldBooks, 'ŽIVJETI TRIJEZNO', 'guide');
  }

  throw new Error(`Unknown book type: ${bookId}`);
}

