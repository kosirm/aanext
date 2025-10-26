# Quick Start Guide - AA Hrvatska Quasar App

## 🚀 Getting Started

### Start Development Server
```bash
cd next/aahrvatska
w q              # Start dev server (no service worker)
```

Then open: **http://localhost:9000/**

### Build for Production
```bash
w q build        # Creates dist/spa folder
```

## 📱 Features

### Navigation
- **Swipe left/right** on main pages to navigate (circular: index → informacije → literatura → o-nama → index)
- **Hamburger menu** (top-left) for site navigation and settings
- **Right menu** (top-right) for page-specific navigation and tools

### Settings (Left Drawer - Tools Tab)
- 🌙 **Theme**: Auto/Light/Dark mode
- 📝 **Font Size**: Small/Normal/Large
- 📅 **Sobriety Date**: Track your sobriety journey

### Pages
1. **Index** - Home page with shortcuts and contact info
2. **Informacije** - Information about AA
3. **Literatura** - Books and daily reflections
4. **O nama** - About us, sobriety calculator, news
5. **Privatnost** - Privacy policy
6. **Reset** - Clear cache and reset app
7. **Pomoć** - Help and FAQ

## 🛠️ Development Commands

### Using work.sh alias (w)
```bash
w q                    # Dev server (no service worker)
w q -d                 # Dev server (explicit, no service worker)
w q -ds                # Dev server WITH service worker
w q build              # Production build
w q build-pwa          # PWA build
w q build-electron     # Electron app build
```

### Direct npm commands
```bash
npm run dev            # Dev server
npm run build          # Production build
npm run lint           # Lint code
npm run format         # Format code
```

## 📁 Project Structure

```
next/aahrvatska/
├── src/
│   ├── boot/           # App initialization
│   │   └── theme.ts    # Theme setup
│   ├── components/     # Reusable components
│   │   ├── AppHeader.vue
│   │   ├── AppFooter.vue
│   │   ├── LeftDrawer.vue
│   │   ├── RightDrawer.vue
│   │   └── SobrietyBadge.vue
│   ├── pages/          # Page components
│   │   ├── IndexPage.vue
│   │   ├── InformacijePage.vue
│   │   ├── LiteraturaPage.vue
│   │   ├── ONamaPage.vue
│   │   ├── PrivatnostPage.vue
│   │   ├── ResetPage.vue
│   │   └── HelpPage.vue
│   ├── stores/         # Pinia stores (state management)
│   │   ├── userPreferences.ts
│   │   ├── navigation.ts
│   │   ├── books.ts
│   │   └── ui.ts
│   ├── css/
│   │   └── app.scss    # Global styles and CSS variables
│   ├── layouts/
│   │   └── MainLayout.vue
│   └── router/
│       └── routes.ts
├── public/             # Static files
├── dist/               # Build output (after npm run build)
├── quasar.config.ts    # Quasar configuration
├── tsconfig.json       # TypeScript configuration
├── package.json        # Dependencies
└── work.sh             # Workflow script
```

## 🎨 Customization

### Colors
Edit `src/css/app.scss` to change colors:
```scss
--color-primary: #093959;
--color-secondary: #1a5f7a;
```

### Fonts
Modify font settings in `src/css/app.scss`:
```scss
--font-family-base: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
```

### Theme Variables
All theme variables are in `src/css/app.scss`:
- Colors (primary, secondary, success, warning, negative, info)
- Spacing (sm, md, lg, xl, 2xl)
- Font sizes (sm, base, lg, xl, 2xl, 3xl, 4xl)
- Border radius (sm, md, lg)
- Shadows

## 📚 Using Quasar Components

The app uses only Quasar components (no external libraries):
- **QCarousel** - For carousels (marked with `data-carousel` attribute)
- **QVideo** - For video playback
- **QDate** - For date selection
- **QTabs** - For tabbed content
- **QExpansionItem** - For expandable sections
- **QDialog** - For modals
- **QDrawer** - For side drawers
- **QBtn** - For buttons
- **QInput** - For form inputs

## 🔄 Swipe Navigation

### Main Pages (Circular)
- **Swipe left** → Next page
- **Swipe right** → Previous page
- Pages loop: index → informacije → literatura → o-nama → index

### Carousels
- Carousels have their own swipe handling
- Marked with `data-carousel` attribute to prevent page navigation

## 💾 Data Persistence

### localStorage Keys
- `userPreferences` - Theme, font size, sobriety date
- `bookmarks` - Bookmarked entries in books
- `currentBook` - Last viewed book
- `currentEntry` - Last viewed entry

## 🐛 Troubleshooting

### App not loading?
```bash
w q              # Restart dev server
```

### Cache issues?
Go to **Reset** page and click "Obriši cache" or "Resetiraj aplikaciju"

### Build errors?
```bash
npm install      # Reinstall dependencies
npm run build    # Try building again
```

## 📖 Documentation

- **PHASE_1_COMPLETE.md** - Detailed Phase 1 completion report
- **WORKING_PLAN.md** - Original project plan
- **IMPLEMENTATION_ROADMAP.md** - Task breakdown

## 🎯 Next Steps

1. ✅ Phase 1 Complete - Foundation & Setup
2. ⏳ Phase 2 - Content Migration from old site
3. ⏳ Phase 3 - Testing & Refinement
4. ⏳ Phase 4 - Deployment

---

**Happy coding! 🚀**

