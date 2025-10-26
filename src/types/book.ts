/**
 * Unified Book Format Types
 * Supports all book types: daily reflections, steps, traditions, guides, etc.
 */

export type ContentType = 'text' | 'subtitleBold' | 'subtitle' | 'letter' | 'table';
export type BookType = 'steps' | 'traditions' | 'daily' | 'guide' | 'other';

/**
 * Content block - represents a single piece of content
 * Can be text, subtitle, letter, or table
 */
export interface BookContent {
  type: ContentType;
  value?: string | undefined; // For text, subtitleBold, subtitle, letter
  headers?: string[] | undefined; // For table
  rows?: string[][] | undefined; // For table
}

/**
 * Chapter - represents a single chapter/entry in a book
 * Can have metadata for daily reflections (date, header, source)
 */
export interface BookChapter {
  chapterId: string;
  isPageStart?: boolean | undefined; // For PDF page breaks
  chapterTitle?: string | undefined;
  chapterSubtitle?: string | undefined;
  // Daily reflection specific fields
  chapterDateObject?: string | undefined; // For Quasar QCalendar (YYYY-MM-DD format, e.g., "2024-01-01")
  chapterDateString?: string | undefined; // For display (e.g., "1. SIJEČNJA")
  chapterHeader?: string | undefined; // Header text for daily reflections
  chapterSource?: string | undefined; // Source reference
  // Content
  content: BookContent[];
}

/**
 * Book Part - represents a section of a book
 * Most books have 1 part, but some (like Anonimni Alkoholičari) have multiple parts
 */
export interface BookPart {
  partId: number;
  isPageStart?: boolean; // For PDF page breaks
  partTitle?: string;
  partSubtitle?: string;
  partText?: string; // Introductory text for the part
  chapters: BookChapter[];
}

/**
 * Unified Book Format
 * All books follow this structure regardless of type
 */
export interface UnifiedBook {
  bookTitle: string;
  bookSubtitle?: string;
  bookType: BookType;
  bookParts: BookPart[];
}

/**
 * Old format types (for conversion reference)
 */
export interface OldBookChoice {
  id: string;
  title: string;
  text?: Array<Record<string, string>>;
  dt?: string;
  startDate?: string[];
  endDate?: string[];
  date?: string;
  header?: string;
  source?: string;
}

export interface OldBook {
  label: string;
  id: number;
  choices: OldBookChoice[];
}

