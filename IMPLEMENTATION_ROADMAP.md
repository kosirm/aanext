# Implementation Roadmap - Detailed Tasks

## Phase 1: Foundation & Setup (Days 1-2)

### 1.1 Quasar Configuration
- [ ] Update quasar.config.ts for PWA, Mobile, Electron targets
- [ ] Configure service worker (Workbox)
- [ ] Set up environment variables
- [ ] Configure build output paths

### 1.2 Service Worker Toggle
- [ ] Create boot file for service worker registration
- [ ] Add environment flag for SW on/off
- [ ] Update work.sh with new commands:
  - `w q` - dev without SW
  - `w q -d` - dev without SW (explicit)
  - `w q -ds` - dev with SW
  - `w q build` - production build
- [ ] Test SW toggle functionality

### 1.3 Theme System
- [ ] Create Pinia store for user preferences
- [ ] Implement light/dark mode toggle
- [ ] Set up CSS variables for theming
- [ ] Configure Quasar color palette (#093959 primary)
- [ ] Add font size preference store

### 1.4 State Management (Pinia)
Create stores:
- [ ] `userPreferences.ts` - theme, font size, sobriety date
- [ ] `navigation.ts` - current page, drawer state
- [ ] `books.ts` - loaded books, current book, bookmarks
- [ ] `ui.ts` - UI state (modals, notifications)

### 1.5 Reusable Components
- [ ] `AppHeader.vue` - with left/right hamburgers
- [ ] `AppFooter.vue` - footer with links
- [ ] `SobrietyBadge.vue` - fixed position badge
- [ ] `LeftDrawer.vue` - navigation + tools tabs
- [ ] `RightDrawer.vue` - page nav + tools tabs
- [ ] `SectionNavigation.vue` - prev/next page buttons

---

## Phase 2: Layout & Navigation (Days 2-3)

### 2.1 Main Layout
- [ ] Create `MainLayout.vue` with header, drawers, footer
- [ ] Implement drawer toggle logic
- [ ] Add responsive behavior
- [ ] Style to match old site

### 2.2 Left Drawer Implementation
- [ ] Tab 1: Site Navigation
  - Links to all 7 pages
  - Highlight current page
- [ ] Tab 2: Site Tools
  - Light/dark mode toggle
  - Font size slider (small/normal/large)
  - Sobriety date input
  - Settings persistence

### 2.3 Right Drawer Implementation
- [ ] Tab 1: Page Navigation (dynamic per page)
  - Section links for current page
  - Smooth scroll to sections
- [ ] Tab 2: Page Tools (varies by page)
  - Literatura: bookmarks, font size
  - O Nama: calculator
  - Others: empty or page-specific

### 2.4 Sobriety Badge
- [ ] Create badge component
- [ ] Calculate days from date
- [ ] Show/hide based on date entry
- [ ] Update in real-time
- [ ] Persist date in localStorage

### 2.5 Styling
- [ ] Copy color scheme from old site
- [ ] Implement responsive grid
- [ ] Add animations/transitions
- [ ] Test on mobile/tablet/desktop

---

## Phase 3: Core Pages (Days 3-5)

### 3.1 Index Page
- [ ] Header section with "Sastanci" button
- [ ] "Imate problem s alkoholom?" section
  - Video player integration
  - "Saznaj više" button
- [ ] Swiper carousel (6 cards)
  - Card styling
  - Navigation arrows
  - Auto-play
- [ ] Sastanci section with Zoom link
- [ ] Kontakt section (phone, WhatsApp, email)
- [ ] Susjedne Grupe Swiper
- [ ] Živi Sastanci expandable sections
- [ ] Footer

### 3.2 Informacije Page
- [ ] Header with video + button
- [ ] Članovi o sebi section
- [ ] Osnivanje A.A. (3 tabs)
  - Tab content from old site
  - Tab switching
- [ ] Anonimnost u A.A. (3 tabs)
- [ ] Pitanja i odgovori (expandable)
  - Q&A data structure
  - Expand/collapse animation
- [ ] Footer

### 3.3 O Nama Page
- [ ] Header with video + button
- [ ] Moji dani trijeznosti section
  - Sobriety calculator
  - Display calculations
- [ ] Greetings and medallions
- [ ] Molitva spokoja (Prayer)
- [ ] Vijesti (News section)
- [ ] Povezave (Links section)
- [ ] Footer

### 3.4 Additional Pages
- [ ] Privatnost (Privacy Policy)
  - Copy content from old site
- [ ] Reset (Service Worker reset)
  - Clear cache button
  - Reload app
- [ ] Help (Help page)
  - FAQ
  - Instructions

---

## Phase 4: Literatura Page - Priority (Days 5-8)

### 4.1 Unify Book JSON Format
- [ ] Analyze current formats:
  - dnevna_razmatranja.json (calendar-based)
  - 12_Koraka.json (chapter-based)
- [ ] Design unified format:
  ```json
  {
    "id": "book-id",
    "title": "Book Title",
    "cover": "path/to/cover.png",
    "entries": [
      {
        "id": "entry-id",
        "date": "1.1.",
        "title": "Entry Title",
        "header": "Header text",
        "text": "Full text",
        "source": "Source reference"
      }
    ]
  }
  ```
- [ ] Convert all 4 books to unified format
- [ ] Validate JSON structure
- [ ] Test data loading

### 4.2 Book Data Management
- [ ] Create book loader service
- [ ] Implement caching strategy
- [ ] Add error handling
- [ ] Lazy load book data

### 4.3 Calendar Component (Desktop Only)
- [ ] Implement calendar UI
- [ ] Date selection
- [ ] Hide on mobile
- [ ] Sync with book entries
- [ ] Highlight available dates

### 4.4 Book Reader
- [ ] Entry display component
- [ ] Navigation (prev/next entry)
- [ ] Date/title display
- [ ] Source attribution
- [ ] Font size controls (3 sizes)
- [ ] Bookmarks functionality:
  - Add/remove bookmark
  - List bookmarks
  - Jump to bookmark
  - Persist in localStorage

### 4.5 Čitaonica (Book Library)
- [ ] Book card component
  - Cover image
  - Title
  - Description
  - "Read" button
- [ ] Book selection
- [ ] Display 4 books
- [ ] Responsive grid

### 4.6 Literatura Page Layout
- [ ] Header section
- [ ] Dnevna razmatranja section
  - Calendar (desktop) + dropdown (mobile)
  - Daily text display
- [ ] Čitaonica section
  - Book cards
  - Book reader modal/page
- [ ] Footer

---

## Phase 5: Service Worker & PWA (Days 8-9)

### 5.1 Service Worker Configuration
- [ ] Update workbox-config.js
- [ ] Configure caching strategies
- [ ] Cache book JSON files
- [ ] Cache images
- [ ] Cache CSS/JS

### 5.2 Offline Support
- [ ] Test offline functionality
- [ ] Verify cached content loads
- [ ] Test service worker updates
- [ ] Implement update notification

### 5.3 Manifest Configuration
- [ ] Update manifest.json
- [ ] Set theme colors
- [ ] Configure icons
- [ ] Set start URL
- [ ] Test PWA installation

### 5.4 Testing
- [ ] Test on Chrome DevTools
- [ ] Test on mobile browser
- [ ] Test offline mode
- [ ] Test PWA installation
- [ ] Test service worker updates

---

## Phase 6: Mobile & Electron (Days 9-10)

### 6.1 TWA (Trusted Web Activity)
- [ ] Create Android project structure
- [ ] Configure manifest for TWA
- [ ] Set up signing
- [ ] Build and test APK

### 6.2 Electron Build
- [ ] Configure Electron in quasar.config.ts
- [ ] Build Electron app
- [ ] Test on desktop
- [ ] Configure auto-update

### 6.3 Testing
- [ ] Test on Android device
- [ ] Test on iOS (if possible)
- [ ] Test Electron app
- [ ] Verify all features work

---

## Phase 7: PDF Generator Update (Days 10-11)

### 7.1 Unify Book Format
- [ ] Update PDF generator to use unified JSON
- [ ] Remove duplicate generators
- [ ] Test PDF generation

### 7.2 Simplify UI
- [ ] Update pdf_config_ui.py
- [ ] Remove duplicate tabs
- [ ] Simplify configuration

### 7.3 Testing
- [ ] Generate PDFs for all books
- [ ] Verify output quality
- [ ] Test with corrected text

---

## Testing Checklist

- [ ] All pages load correctly
- [ ] Navigation works (drawers, links)
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] Dark/light mode toggle
- [ ] Sobriety badge calculation
- [ ] Book reader functionality
- [ ] Bookmarks persistence
- [ ] PWA installation
- [ ] Offline functionality
- [ ] Service worker toggle
- [ ] Mobile app build
- [ ] Electron app build
- [ ] PDF generation

---

## Deployment Checklist

- [ ] Build production PWA
- [ ] Test production build
- [ ] Deploy to Netlify
- [ ] Verify PWA installation
- [ ] Test offline mode
- [ ] Build and publish mobile app
- [ ] Build and publish Electron app
- [ ] Update documentation

