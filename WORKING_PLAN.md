# AA Hrvatska Quasar Migration - Working Plan

## Project Overview
Migrate the existing AA Hrvatska website (currently at https://aahrvatska.org/ built with Mobirise) to a modern Quasar framework application with TypeScript, PWA support, dark/light mode, and enhanced navigation.

## Current State Analysis

### Old Site Structure (git folder)
- **Framework**: Mobirise (vanilla HTML/CSS/JS)
- **Pages**: 7 total (4 main + 3 additional)
  - Main: index, o-nama, literatura, informacije
  - Additional: privatnost, reset, help
- **Key Features**:
  - PWA with service worker (Workbox)
  - Manifest.json for installation
  - Sobriety badge (fixed position)
  - Swiper carousels (shortcuts, groups)
  - Expandable sections (live meetings, Q&A)
  - Video player (Plyr)
  - Google Maps integration
  - Bootstrap 5 grid system
  - Custom CSS styling

### Books/Content
- 4 books in JSON format (git/assets/books/)
- Dnevna razmatranja (daily reflections) with calendar
- Books: 12 Koraka, 12 Tradicija, Anonimni Alkoholičari, Živjeti Trijezno
- **Issue**: JSON format inconsistent between books and dnevna razmatranja
- **Goal**: Unify JSON format for all books

### PDF Generator
- Located in git/pdf_creator (Python + ReportLab)
- Currently has 2 separate generators (books vs dnevna razmatranja)
- Ongoing OCR error corrections

## New Site Architecture (Quasar)

### Technology Stack
- **Framework**: Quasar v2 with Vue 3 + TypeScript
- **Build Targets**: PWA, Mobile App (TWA), Electron
- **Service Worker**: Workbox (with on/off toggle for development)
- **Styling**: SCSS with Quasar components + custom theme
- **State Management**: Pinia stores
- **Routing**: Vue Router (hash mode)
- **Components**: All Quasar components (QMediaPlayer, QCarousel, QCalendar, QSelect, etc.)
- **Gestures**: Quasar Touch Swipe Directive (no external libraries)
- **Tree-shaking**: Enabled for components and styles (faster builds)

### Navigation Structure
**Top Bar**:
- Left hamburger → Left Drawer (2 tabs)
  - Tab 1: Site Navigation (default)
  - Tab 2: Site Tools (light/dark mode, font size, etc.)
- Logo/Title
- Right hamburger → Right Drawer (2 tabs)
  - Tab 1: Page Navigation (section links)
  - Tab 2: Page Tools (varies by page)

**Sobriety Badge**: Fixed position below top bar (visible when date entered)

**Page Swipe Navigation**: 4 main pages (index, informacije, literatura, o-nama) are swipeable left-right in circle
- Swipe left → next page
- Swipe right → previous page
- Circular navigation (o-nama → index)
- Implemented with Quasar Touch Swipe Directive
- Carousels use swipe for carousel content (not page navigation)

### Pages to Build

#### 1. **Index Page** (Home)
- Header section with "Sastanci" button
- "Imate problem s alkoholom?" section with video + button
- Swiper carousel (6 cards for main content)
- Sastanci section with Zoom button
- Kontakt section (phone, WhatsApp, email)
- Susjedne Grupe section (Swiper carousel)
- Živi Sastanci section (expandable groups)
- Footer

#### 2. **Informacije Page**
- Header with video + "Kako A.A. djeluje" button
- Članovi o sebi section
- Osnivanje A.A. (3 tabs)
- Anonimnost u A.A. (3 tabs)
- Pitanja i odgovori (expandable Q&A)
- Footer

#### 3. **Literatura Page** (Most Complex)
- Header with video + button
- **Dnevna razmatranja**:
  - Calendar (desktop only) + dropdown
  - Daily text display
- **Čitaonica**:
  - 4 book cards with covers
  - Book reader with:
    - Bookmarks functionality
    - Font size adjustment
    - Navigation between entries
- Footer

#### 4. **O Nama Page**
- Header with video + "Kalkulator trijeznosti" button
- Moji dani trijeznosti (sobriety calculations)
- Greetings and medallions
- Molitva spokoja (Prayer of Serenity)
- Vijesti (News)
- Povezave (Links)
- Footer

#### 5. **Additional Pages**
- Privatnost (Privacy Policy)
- Reset (Service Worker reset)
- Help (Help page)

## Implementation Phases

### Phase 1: Foundation & Setup
- [ ] Configure Quasar for PWA, Mobile, Electron targets
- [ ] Set up service worker with on/off toggle (work.sh integration)
- [ ] Create theme system (light/dark mode)
- [ ] Set up Pinia stores for:
  - User preferences (theme, font size, sobriety date)
  - Navigation state (current page for swipe navigation)
  - Book data
- [ ] Create reusable components:
  - AppHeader with drawers
  - AppFooter
  - SobrietyBadge
  - SectionNavigation
- [ ] Set up page swipe navigation:
  - Quasar Touch Swipe Directive
  - Circular navigation between 4 main pages
  - Carousel swipe handling (no page navigation)

### Phase 2: Layout & Navigation
- [ ] Create MainLayout with left/right drawers
- [ ] Implement drawer tabs (navigation, tools)
- [ ] Create page navigation component
- [ ] Implement sobriety badge with date input
- [ ] Copy styling from old site (colors, fonts, spacing)

### Phase 3: Core Pages
- [ ] Index page with Swiper carousels
- [ ] Informacije page with tabs and expandable sections
- [ ] O Nama page with calculator
- [ ] Privatnost, Reset, Help pages

### Phase 4: Literatura Page (Priority)
- [ ] Unify book JSON format
- [ ] Create book data loader
- [ ] Implement calendar component (desktop only)
- [ ] Build book reader with:
  - Entry display
  - Bookmarks (localStorage)
  - Font size controls
  - Navigation
- [ ] Create Čitaonica book cards

### Phase 5: Service Worker & PWA
- [ ] Implement service worker toggle in work.sh
- [ ] Test offline functionality
- [ ] Configure manifest.json
- [ ] Test PWA installation

### Phase 6: Mobile & Electron
- [ ] Build TWA wrapper (Android)
- [ ] Configure Electron build
- [ ] Test on mobile devices

### Phase 7: PDF Generator Update
- [ ] Unify book JSON format
- [ ] Update PDF generator for unified format
- [ ] Remove duplicate generators
- [ ] Simplify pdf_config_ui.py

## Work.sh Integration

### New Commands Needed
```bash
w q                    # quasar dev (default)
w q -d                 # quasar dev --development (skip service worker)
w q -ds                # quasar dev --development --service-worker
w q build              # quasar build
w q build pwa          # quasar build -m pwa
w q build electron     # quasar build -m electron
```

## Key Considerations

### Styling
- Maintain visual consistency with old site
- Use Quasar color palette (primary: #093959)
- Responsive design (mobile-first)
- Dark mode support

### Performance
- Lazy load book data
- Cache book JSON files
- Optimize images
- Service worker caching strategy

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast

### Data Management
- Books stored in public/assets/books/ (JSON)
- User preferences in localStorage
- Bookmarks in localStorage

## Success Criteria
1. All 7 pages functional and styled
2. PWA installable and works offline
3. Dark/light mode toggle working
4. Sobriety calculator functional
5. Book reader with bookmarks working
6. Service worker toggle in work.sh
7. Mobile app (TWA) buildable
8. Electron app buildable
9. Unified book JSON format
10. PDF generator updated

## Timeline Estimate
- Phase 1-2: 2-3 days
- Phase 3: 2-3 days
- Phase 4: 3-4 days (most complex)
- Phase 5-6: 2-3 days
- Phase 7: 1-2 days
- **Total**: 10-15 days

## Next Steps
1. Review and approve this plan
2. Discuss any modifications
3. Begin Phase 1 implementation

