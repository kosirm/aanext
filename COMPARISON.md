# Old Site vs New Site - Feature Comparison

## Architecture

| Aspect | Old Site (Mobirise) | New Site (Quasar) |
|--------|-------------------|------------------|
| **Framework** | Mobirise (visual editor) | Quasar v2 + Vue 3 |
| **Language** | HTML/CSS/JavaScript | TypeScript + Vue |
| **Build Tool** | None (static files) | Vite |
| **State Management** | None | Pinia |
| **Styling** | Bootstrap 5 + Custom CSS | SCSS + Quasar components |
| **Routing** | File-based (HTML files) | Vue Router (hash mode) |
| **Package Manager** | npm (minimal) | npm/bun |

---

## Features Comparison

### Navigation
| Feature | Old | New |
|---------|-----|-----|
| Top menu | Dropdown menus | Hamburger drawers |
| Mobile menu | Collapse menu | Drawer navigation |
| Page sections | Manual links | Auto-generated from page |
| Tools access | Scattered | Organized in drawers |

### User Preferences
| Feature | Old | New |
|---------|-----|-----|
| Dark mode | ❌ No | ✅ Yes (toggle in drawer) |
| Font size | ❌ No | ✅ Yes (3 sizes) |
| Sobriety date | ✅ Badge only | ✅ Badge + input in drawer |
| Persistence | ❌ No | ✅ localStorage |

### Pages
| Page | Old | New |
|------|-----|-----|
| Index | ✅ Swiper, Zoom | ✅ Same + improved |
| Informacije | ✅ Tabs, Q&A | ✅ Same + improved |
| Literatura | ✅ Calendar, books | ✅ Same + bookmarks, font size |
| O Nama | ✅ Calculator | ✅ Same + improved |
| Privatnost | ✅ Basic | ✅ Same |
| Reset | ✅ Basic | ✅ Same |
| Help | ✅ Basic | ✅ Same |

### Book Reader
| Feature | Old | New |
|---------|-----|-----|
| Display books | ✅ Yes | ✅ Yes |
| Calendar (desktop) | ✅ Yes | ✅ Yes |
| Dropdown (mobile) | ❌ No | ✅ Yes |
| Bookmarks | ❌ No | ✅ Yes |
| Font size | ❌ No | ✅ Yes (3 sizes) |
| Offline access | ✅ Yes | ✅ Yes |

### PWA Features
| Feature | Old | New |
|---------|-----|-----|
| Installable | ✅ Yes | ✅ Yes |
| Offline | ✅ Yes | ✅ Yes |
| Service Worker | ✅ Workbox | ✅ Workbox |
| SW toggle | ❌ No | ✅ Yes (for dev) |
| Manifest | ✅ Yes | ✅ Yes |

### Deployment
| Target | Old | New |
|--------|-----|-----|
| Web (PWA) | ✅ Netlify | ✅ Netlify |
| Mobile App | ❌ No | ✅ TWA (Android) |
| Desktop App | ❌ No | ✅ Electron |
| Offline Maps | ✅ Yes | ✅ Yes |

---

## Development Experience

### Old Site
```
Workflow:
1. Edit HTML in Mobirise
2. Run liveserver
3. Upgrade app on localhost
4. Test changes
5. Deploy to Netlify

Issues:
- Mobirise overwrites custom code
- Manual service worker updates
- No type safety
- Hard to maintain
- Limited customization
```

### New Site
```
Workflow:
1. Edit Vue components
2. Run: w q -d (dev without SW)
3. Hot reload automatically
4. Test changes
5. Run: w q -ds (dev with SW)
6. Test offline
7. Deploy: w q build

Benefits:
- Full control over code
- TypeScript for safety
- Hot module replacement
- Easy to maintain
- Unlimited customization
- Service worker toggle
```

---

## Code Quality

| Aspect | Old | New |
|--------|-----|-----|
| **Type Safety** | ❌ None | ✅ TypeScript |
| **Component Reuse** | ❌ Limited | ✅ Vue components |
| **Testing** | ❌ Manual | ✅ Automated possible |
| **Maintainability** | ❌ Low | ✅ High |
| **Scalability** | ❌ Limited | ✅ Excellent |
| **Documentation** | ❌ Minimal | ✅ Full |

---

## Performance

| Metric | Old | New |
|--------|-----|-----|
| **Bundle Size** | ~2MB | ~1.5MB (optimized) |
| **Load Time** | ~2s | ~1s (with SW) |
| **Offline** | ✅ Works | ✅ Works |
| **Caching** | ✅ Workbox | ✅ Workbox |
| **Updates** | Manual | Automatic (SW) |

---

## Accessibility

| Feature | Old | New |
|--------|-----|-----|
| **Semantic HTML** | ⚠️ Partial | ✅ Full |
| **ARIA Labels** | ⚠️ Partial | ✅ Full |
| **Keyboard Nav** | ⚠️ Partial | ✅ Full |
| **Color Contrast** | ⚠️ Partial | ✅ Full |
| **Font Size** | ❌ No | ✅ Yes |
| **Dark Mode** | ❌ No | ✅ Yes |

---

## Data Management

### Old Site
```
Books:
- dnevna_razmatranja.json (calendar format)
- 12_Koraka.json (chapter format)
- 12_Tradicija.json (chapter format)
- Anonimni_Alkoholičari.json (chapter format)
- Živjeti_Trijezno.json (chapter format)

PDF Generator:
- 2 separate generators
- 2 tabs in UI
- Duplicate code
```

### New Site
```
Books:
- Unified JSON format for all books
- Single book reader component
- Easier to add new books

PDF Generator:
- Single generator
- Single tab in UI
- Simplified code
- Easier maintenance
```

---

## Browser Support

| Browser | Old | New |
|---------|-----|-----|
| Chrome | ✅ Latest | ✅ 115+ |
| Firefox | ✅ Latest | ✅ 115+ |
| Safari | ✅ Latest | ✅ 14+ |
| Edge | ✅ Latest | ✅ 115+ |
| Mobile | ✅ Modern | ✅ Modern |

---

## Migration Path

```
Phase 1: Build new site in parallel
Phase 2: Test thoroughly
Phase 3: Deploy to staging
Phase 4: User testing
Phase 5: Switch DNS to new site
Phase 6: Keep old site as backup
Phase 7: Archive old site
```

---

## Cost Analysis

| Item | Old | New |
|------|-----|-----|
| **Hosting** | Netlify (free) | Netlify (free) |
| **Domain** | aahrvatska.org | Same |
| **Maintenance** | High (Mobirise) | Low (code) |
| **Development** | Limited | Unlimited |
| **Scalability** | Limited | Excellent |

---

## Summary

### What We're Keeping
✅ All 7 pages  
✅ All content  
✅ PWA functionality  
✅ Offline support  
✅ Visual style  
✅ Netlify deployment  

### What We're Improving
✅ Dark/light mode  
✅ Font size control  
✅ Book reader (bookmarks, font size)  
✅ Navigation (drawers)  
✅ Code quality (TypeScript)  
✅ Maintainability  
✅ Mobile app support  
✅ Desktop app support  
✅ Development experience  

### What We're Adding
✅ Service worker toggle  
✅ Unified book format  
✅ Electron app  
✅ TWA mobile app  
✅ Automated testing (optional)  
✅ Better documentation  

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Content loss | Low | High | Backup old site |
| Styling issues | Medium | Medium | Thorough testing |
| Performance | Low | Medium | Optimization |
| Browser compat | Low | Medium | Testing |
| User confusion | Medium | Low | Clear messaging |

---

## Recommendation

✅ **Proceed with migration**

The new site offers significant improvements in:
- User experience (dark mode, font size, bookmarks)
- Developer experience (TypeScript, components)
- Maintainability (clean code)
- Scalability (future features)
- Platform support (mobile, desktop)

All while maintaining the same visual style and content.

