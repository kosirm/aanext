# AA Hrvatska Quasar Migration - Executive Summary

## What We're Building

A modern, feature-rich web application that replicates the current AA Hrvatska website (https://aahrvatska.org/) using Quasar framework with TypeScript, while adding significant improvements:

### Current Site (git folder)
- Built with Mobirise (visual editor)
- Vanilla HTML/CSS/JavaScript
- 7 pages with PWA support
- Limited customization options

### New Site (next/aahrvatska)
- Built with Quasar v2 + Vue 3 + TypeScript
- Professional, maintainable codebase
- **Dark/Light mode** with user preferences
- **Enhanced navigation** with dual drawers
- **Sobriety badge** showing days sober
- **Book reader** with bookmarks and font size control
- **Multiple deployment targets**: PWA, Mobile App (TWA), Electron
- **Service worker toggle** for easier development

---

## Key Features

### 1. Navigation System
- **Left Drawer** (hamburger):
  - Tab 1: Site Navigation (all 7 pages)
  - Tab 2: Site Tools (theme, font size, sobriety date)
- **Right Drawer** (hamburger):
  - Tab 1: Page Navigation (section links)
  - Tab 2: Page Tools (varies by page)
- **Sobriety Badge**: Fixed below header, shows days sober

### 2. Pages (7 Total)

| Page | Key Features |
|------|-------------|
| **Index** | Swiper carousels, Zoom meetings, contact info |
| **Informacije** | Tabs, expandable Q&A, video |
| **Literatura** | Calendar, book reader, bookmarks, font size |
| **O Nama** | Sobriety calculator, news, links |
| **Privatnost** | Privacy policy |
| **Reset** | Service worker cache reset |
| **Help** | Help & FAQ |

### 3. Literatura Page (Most Complex)
- **Dnevna razmatranja** (Daily Reflections)
  - Calendar (desktop only)
  - Dropdown selector (mobile)
  - Daily text display
- **Čitaonica** (Library)
  - 4 book cards with covers
  - Book reader with:
    - Bookmarks (save/load)
    - Font size adjustment (3 sizes)
    - Navigation between entries
    - Source attribution

### 4. User Preferences
- **Theme**: Light/Dark mode (toggle in left drawer)
- **Font Size**: Small/Normal/Large (slider in left drawer)
- **Sobriety Date**: Input in left drawer
- **Bookmarks**: Per-book bookmarks (localStorage)
- All preferences persist in localStorage

### 5. Technical Features
- **PWA**: Installable on mobile, works offline
- **Service Worker**: Workbox with on/off toggle
- **Responsive**: Mobile-first design
- **TypeScript**: Full type safety
- **Pinia**: State management
- **SCSS**: Styling with variables

---

## Implementation Plan

### 7 Phases (10-15 days estimated)

**Phase 1-2: Foundation & Layout** (2-3 days)
- Quasar setup, theme system, drawers, components

**Phase 3: Core Pages** (2-3 days)
- Index, Informacije, O Nama, additional pages

**Phase 4: Literatura Page** (3-4 days) ⭐ **PRIORITY**
- Unify book JSON format
- Calendar, book reader, bookmarks

**Phase 5: PWA & Service Worker** (2-3 days)
- Offline support, manifest, testing

**Phase 6: Mobile & Electron** (2-3 days)
- TWA wrapper, Electron build

**Phase 7: PDF Generator** (1-2 days)
- Update to use unified book format

---

## Work.sh Integration

New commands for development:

```bash
w q                    # Dev without service worker (default)
w q -d                 # Dev without service worker (explicit)
w q -ds                # Dev with service worker
w q build              # Production build
w q build pwa          # PWA build
w q build electron     # Electron build
```

---

## Data Unification

### Current Issue
- Dnevna razmatranja JSON: Calendar-based format
- Books JSON: Chapter-based format
- PDF generator: 2 separate generators

### Solution
Unified JSON format for all books:
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

Benefits:
- Single book reader component
- Single PDF generator
- Easier maintenance
- Simpler pdf_config_ui.py

---

## Success Criteria

✅ All 7 pages functional and styled  
✅ PWA installable and works offline  
✅ Dark/light mode toggle working  
✅ Sobriety calculator functional  
✅ Book reader with bookmarks working  
✅ Service worker toggle in work.sh  
✅ Mobile app (TWA) buildable  
✅ Electron app buildable  
✅ Unified book JSON format  
✅ PDF generator updated  

---

## Styling & Design

- **Primary Color**: #093959 (AA blue)
- **Design**: Maintain visual consistency with old site
- **Responsive**: Mobile-first approach
- **Dark Mode**: Automatic color inversion
- **Fonts**: Roboto (Quasar default)
- **Icons**: Material Icons

---

## Deployment Targets

1. **PWA**: Deploy to Netlify (same as current)
2. **Mobile App (TWA)**: Android app wrapper
3. **Electron**: Desktop application
4. **Service Worker**: Workbox for offline support

---

## Next Steps

1. ✅ **Review this plan** - Discuss any modifications
2. **Approve approach** - Confirm phases and timeline
3. **Begin Phase 1** - Foundation & setup
4. **Iterate** - Build and test each phase

---

## Questions to Discuss

1. **Timeline**: Is 10-15 days realistic for your schedule?
2. **Priorities**: Should we focus on Literatura page first?
3. **Mobile**: Do you want TWA or Capacitor for mobile?
4. **Deployment**: Same Netlify setup or different?
5. **Content**: Should we copy all content from old site as-is?
6. **Testing**: Do you want automated tests?

---

## Files Created

- `WORKING_PLAN.md` - Detailed working plan
- `IMPLEMENTATION_ROADMAP.md` - Task-by-task breakdown
- `PLAN_SUMMARY.md` - This file

Ready to proceed? 🚀

